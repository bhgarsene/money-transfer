import React, { Component } from 'react'
import Head from 'next/head'
import InputText from '../components/inputs/Text'
import axios from "axios"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }
    onSubmit = async (e) => {
        console.log("sent....")
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/signup', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            console.log('ksmsd')
            if (response.data.status == 200) {
                console.log("Successful")
                // signIn("credentials", {
                //     email,
                //     password,
                //     callbackUrl: `${window.location.origin}/transactions`,
                //     redirect: false
                // }).then(function (result) {
                //     router.push(result.url);
                // })
            }
        } catch (error) {
            console.log(error)
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
                            <p className="text-center my-4">All ready have an account? Login</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;