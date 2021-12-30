import React from 'react'
import Header from '../components/Header'
import Head from 'next/head'
import Link from 'next/link'
import { getSession, useSession } from 'next-auth/client';

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
    const [balances, transactions] = await Promise.all([
        await prisma.account.findMany({
            where: {
                userId: session.user.id

            },
            select: {
                amount: true,
                currency: true,
            }
        }),
        await prisma.transaction.findMany({
            where: {
                to: session.user.id
            },
            select: {
                id: true,
                amount: true,
                from: true,
                currencyTo: true,
                currencyFrom: true,
                // createdAt: true,
            }
        })

    ])
    return {
        props: { balances, transactions }
    }
}



export default function Transaction(balances, transactions) {
    const [session] = useSession()
    const name = session?.user.name
    return (
        <div>
            <Head>
                <title>Transaction</title>
            </Head>
            <Header name={name} />
            <div className="flex justify-center">
                <div className="w-2/3">
                    <div className="pt-16 grid grid-cols-3 gap-20">
                        {
                            balances.balances.map(balance => {
                                return (
                                    <div key={balance.currency} className="mr-4 bg-gray-100 py-8 flex flex-col gap-2 items-center rounded-xl shadow-md">
                                        <p className="text-xl font-semibold">{balance.currency}</p>
                                        <span className="text-2xl font-bold">{balance.amount}</span>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="py-12">
                        <div className="flex justify-end items-center">
                            <Link href="/send">
                                <button className="px-12 py-3 text-gray-500 border border-black hover:text-black">Send Money</button>
                            </Link>
                        </div>
                        <div className="w-full pt-12">
                            {
                                balances.transactions != [] ?
                                    <div>
                                        <p  className="text-2xl font-semibold text-center mb-8">List of Money Received</p>
                                        <table className="table-auto w-full">
                                            <thead className="table-header-group">
                                                <tr className="border-b">
                                                    <th className="text-left py-4 font-medium">Id</th>
                                                    <th className="text-left py-4 font-medium">From</th>
                                                    <th className="text-left py-4 font-medium">Amount</th>
                                                    <th className="text-left py-4 font-medium">Currency</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y-2">
                                                {
                                                    balances.transactions.map((transaction) => {
                                                        return (
                                                            <tr key={transaction.id}>
                                                                <td className="py-3">{transaction.id}</td>
                                                                <td className="py-3">{transaction.from}</td>
                                                                <td className="py-3">{transaction.amount}</td>
                                                                <td className="py-3">{transaction.currencyTo}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <div className="w-full text-center">
                                        <p>No transaction received made yet</p>
                                    </div>
                            }
                            {
                                console.log(balances.transactions)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


