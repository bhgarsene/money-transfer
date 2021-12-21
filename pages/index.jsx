import React, { Component } from 'react'
import Head from 'next/head'
import InputText from '../components/inputs/Text'
import { signIn } from "next-auth/client"
import { useRouter } from 'next/router'
import Link from 'next/link'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }
    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.email.trim() === "" || this.state.password.trim() === "") {
            this.setState({ error: "Please fill all the fields" })
            return;
        }
        try {
            signIn("credentials", {
                email: this.state.email,
                password: this.state.password,
                callbackUrl: `${window.location.origin}/transaction`,
                redirect: false
            }).then(function (result) {
                if (result.error !== null) {
                    if (result.status === 401) {
                        console.log(this)
                    }
                    else {
                        console.log('error' + result.error)
                    }
                }
                else {
                    console.log('success')
                    window.location.replace(`${window.location.origin}/transaction`);
                }
            })
        } catch (error) {
            this.setState({ error: error });
        }
    }
    render() {
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
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            <InputText
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                            <button className="shadow border rounded w-full py-2 px-3 text-gray-700 hover:text-black hover:font-semibold my-4" onClick={e => this.onSubmit(e)}>Login</button>
                            <Link href='/register'><p className="text-center my-4 pointer">New User? Register</p></Link>
                            <div>
                                {
                                    this.state.error ?
                                        <p className="text-center text-red-600">{this.state.error}</p>
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;