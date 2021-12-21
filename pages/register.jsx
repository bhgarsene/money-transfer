import React, { useState } from 'react'
import Head from 'next/head'
import InputText from '../components/inputs/Text'
import axios from "axios"
import { signIn } from "next-auth/client"
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function Component() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const onSubmit = async (e) => {
        setIsLoading(true)
        setErrorMessage(false)
        e.preventDefault();
        if (email.trim() === "" || name.trim() === "" || password.trim() === "") {
            setHasError(true)
            setIsLoading(false)
            setErrorMessage("Please provide all fields..");
            return;
        }

        try {
            const response = await axios.post('/api/users/signup', {
                name,
                email,
                password,
            })
            if (response.data.status == 200) {
                console.log("Successful")
                signIn("credentials", {
                    email,
                    password,
                    callbackUrl: `${window.location.origin}/transaction`,
                    redirect: false
                }).then(function (result) {
                    if (result.error !== null) {
                        console.log('erros')
                        console.log(result)
                        if (result.status === 400) {
                            console.log("Error")
                            setIsLoading(false)
                            setHasError(true)
                            setErrorMessage("User already exists");
                        }
                        else {
                            setIsLoading(false)
                            setHasError(true)
                            setErrorMessage(result.error);
                        }
                    }
                    else {
                        router.push(result.url);
                    }
                })
            }
        } catch (error) {
            setIsLoading(false)
            setHasError(true)
            setErrorMessage("User already exists");
        }
    }
    return (
        <div className="h-screen">
            <Head>
                <title>Register</title>
            </Head>
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="flex shadow-xl bg-white items-center w-2/3">
                    <div className="w-3/5">
                        <p className="text-8xl font-bold text-center px-12 text-gray-700">Money Transfer App</p>
                    </div>
                    <div className="w-2/5 border-l border-black px-12 py-12 flex flex-col justify-between">
                        <p className="text-4xl text-center text-gray-700 mb-6">Register</p>
                        <InputText
                            label="Full Name"
                            type="text"
                            placeholder="Enter your Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
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
                                    'Loading...' : 'Register'

                            }
                        </button>
                        <Link href='/'><p className="text-center my-4 pointer">All ready have an account? Login</p></Link>
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
