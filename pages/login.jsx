import React from 'react'
import Head from 'next/head'
import InputText from '../components/inputs/Text'

export default function Login() {
    return (
        <div className="h-screen">
            <Head>
                <title>Register</title>
            </Head>
            <div className="h-screen flex items-center justify-center px-80 bg-gray-100">
                <div className="flex shadow-xl w-full bg-white items-center">
                    <div className="w-3/5">
                    </div>
                    <div className="w-2/5 border-l border-black px-12 py-36 flex flex-col justify-between">
                        <InputText
                            label="Email"
                            type="email"
                            placeholder="Enter your Email"
                        />
                        <InputText
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                        />
                        <button className="shadow border rounded w-full py-2 px-3 text-gray-700 hover:text-black hover:font-semibold my-4">Login</button>
                        <p className="text-center my-4">New User? Register</p>
                    </div>
                </div>
            </div>
        </div>
    )
}