import React, { useState } from 'react'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Header from '../components/Header'
import InputText from '../components/inputs/Text'
import InputSelect from '../components/inputs/SelectCurrency'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client';
import SelectReceiver from '../components/inputs/SelectReceiver'
import axios from 'axios';
import Link from 'next/link'

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    console.log(session)
    const [availableUsers, balances] = await Promise.all([
        await prisma.user.findMany({
            where: {
                NOT: {
                    id: session.user.id
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        }),
        await prisma.account.findMany({
            where: {
                userId: session.user.id

            },
            select: {
                amount: true,
                currency: true,
            }
        }),
    ])
    return {
        props: { availableUsers, balances }
    }
}


export default function Send({ availableUsers }) {


    const [receiver, setReceiver] = useState('')
    const [amount, setAmount] = useState('')
    const [currencyFrom, setcurrencyFrom] = useState('')
    const [currencyTo, setcurrencyTo] = useState('')
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [session] = useSession()
    const currencies = ['USD', 'EUR', 'NGN']
    const router = useRouter()
    const name = session?.user.name
    const onSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation();
        setIsLoading(true)
        setHasError(false)
        if (receiver.trim() === "" || amount.trim() === "" || currencyFrom.trim() === "" || currencyTo.trim() === "") {
            setHasError(true)
            setErrorMessage("Please provide all fields..");
            return;
        }
        // if()
        try {
            const response = await axios.post('/api/create', {
                receiverId: receiver,
                amount: amount,
                currencyFrom: currencyFrom,
                currencyTo: currencyTo,
                authenticatedUser: session.user
            })
            if (response.data.status == 200) {
                window.location.replace(`${window.location.origin}/transaction`);
                console.log('successful')
            }
        } catch (error) {
            if (error.response.status !== 200) {
                let errorMessage = error.response.data.message
                setIsLoading(false)
                setHasError(true)
                setErrorMessage(errorMessage)
            }
        }
    }


    return (

        <div>
            <Head>
                <title>Send Money</title>
            </Head>
            <Header name={name} />
            <div className="px-80 py-20">
                <div className="flex justify-center">
                    <div className="flex flex-col gap-12">
                        <p className="text-3xl font-semibold">Complete the form to send money</p>
                        <div>
                            <SelectReceiver
                                label="Receiver"
                                options={availableUsers}
                                onChange={e => setReceiver(e.target.value)}
                            />
                            <InputText
                                label="Amount"
                                type="number"
                                placeholder="Enter the amount"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                            <InputSelect
                                label="Currency you want to send the money from"
                                options={currencies}
                                value={currencyFrom}
                                onChange={e => setcurrencyFrom(e.target.value)}
                            />
                            <InputSelect
                                label="Currency you want to send the money to"
                                options={currencies}
                                value={currencyTo}
                                onChange={e => setcurrencyTo(e.target.value)}
                            />

                            <button className="shadow border rounded w-full py-2 px-3 text-gray-700 hover:text-black hover:font-semibold my-4" onClick={onSubmit}>
                                {
                                    isLoading ?
                                        'Loading...' : 'Send'

                                }
                            </button>
                            <div className="mt-12 pointer">
                                <Link href="transaction"><p>Back to Transactions</p></Link>
                            </div>
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
        </div>
    )
}
