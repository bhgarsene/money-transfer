import React from 'react'
import Head from 'next/head'
import InputText from '../components/inputs/Text'
import { signIn } from "next-auth/client"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        if (email.trim() === "" || password.trim() === "") {
            setHasError(true)
            setErrorMessage("Please provide all fields..");
            return;
        }
        try {
            signIn("credentials", {
                email,
                password,
                callbackUrl: `${window.location.origin}/transaction`,
                redirect: false
            }).then(function (result) {
                if (result.error !== null) {
                    if (result.status === 401) {
                        setIsLoading(false)
                        setHasError(true)
                        setErrorMessage("Invalid Credentials..");
                    }
                    else {
                        setIsLoading(false)
                        setHasError(true)
                        setErrorMessage(result.error);
                    }
                }
                else {
                    setIsLoading(true)
                    router.push(result.url);
                }
            })
        } catch (error) {
            this.setState({ error: error });
        }
    }
    return (
        <div className="h-screen">
            <Head>
                <title>Register</title>
            </Head>
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="flex shadow-xl bg-white items-center xl:w-2/3 md:w-3/4">
                    <div className="w-3/5">
                        <p className="xl:text-8xl lg:text-6xl md:text-3xl font-bold text-center px-12 text-gray-700">Money Transfer App</p>
                    </div>
                    <div className="w-2/5 border-l border-black px-12 py-12 flex flex-col justify-between">
                        <p className="text-4xl text-center text-gray-700 mb-6">Log In</p>
                        <InputText
                            label="Email"
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <InputText
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className="shadow border rounded w-full py-2 px-3 text-gray-700 hover:text-black hover:font-semibold my-4" onClick={onSubmit}>
                            {
                                isLoading ?
                                    'Loading...' : 'Login'

                            }
                        </button>
                        <Link href='/register'><p className="text-center my-4 pointer">New User? Register</p></Link>
                        <div>
                            {
                                hasError ?
                                    <p className="text-center text-red-600">{errorMessage}</p>
                                    : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


