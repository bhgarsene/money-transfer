import React, { Component } from 'react'
import Head from 'next/head'
import InputText from '../components/inputs/Text'
import axios from "axios"
import { signIn } from "next-auth/client"
import { useRouter } from 'next/router'
import Link from 'next/link'


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        }
    }
    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.email.trim() === "" || this.state.password.trim() === "" || this.state.password.trim() === "") {
            this.setState({ error: "Please fill all the fields" })
            return;
        }
        
        try {
            const response = await axios.post('/api/users/signup', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            if (response.data.status == 200) {
                console.log("Successful")
                signIn("credentials", {
                    email: this.state.email,
                    password: this.state.password,
                    callbackUrl: `${window.location.origin}/transaction`,
                    redirect: false
                }).then(function(){
                    if (response.data.status == 400){
                        console.log('response.data');
                    }
                    console.log('success')
                    window.location.replace(`${window.location.origin}/transaction`);
                })
            } 
        } catch (error) {
            console.log('error ' + error.message)
        }
    }
    render() {
        return (
            <div className="h-screen">
                <Head>
                    <title>Register</title>
                </Head>
                <div className="h-screen flex items-center justify-center bg-gray-100">
                    <div className="flex shadow-xl bg-white items-center w-2/3">
                        <div className="w-3/5">
                        </div>
                        <div className="w-2/5 border-l border-black px-12 py-20 flex flex-col justify-between">
                            <InputText
                                label="Full Name"
                                type="text"
                                placeholder="Enter your Full Name"
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
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

                            <button className="shadow border rounded w-full py-2 px-3 text-gray-700 hover:text-black hover:font-semibold my-4" onClick={e => this.onSubmit(e)}>Register</button>
                            <Link href='/'><p className="text-center my-4 pointer">All ready have an account? Login</p></Link>
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

export default Register;