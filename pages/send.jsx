import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import InputText from '../components/inputs/Text'
import InputSelect from '../components/inputs/Select'

export default function Send() {
    return (
        <div>
            <Head>
                <title>Send Money</title>
                <Header />
                <div className="px-80 py-20">
                    <div className="flex justify-center">
                        <div>
                            <InputText
                                label="Reciever"
                                type="text"
                                placeholder="Enter the Reciever's Name"
                            />
                            <InputText
                                label="Amount"
                                type="number"
                                placeholder="Enter the amount"
                            />
                            <InputSelect
                                label="Currency you want to send the money from"
                            />
                            <InputSelect
                                label="Currency you want to send the money to"
                            />

                            <button className="shadow border rounded w-full py-2 px-3 text-gray-700 hover:text-black hover:font-semibold my-4">Send</button>
                        </div>
                    </div>
                </div>
            </Head>
        </div>
    )
}