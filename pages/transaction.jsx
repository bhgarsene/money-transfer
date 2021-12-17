import React from 'react'
import Header from '../components/Header'
import Head from 'next/head'

export default function Transaction() {
    return (
        <div>
            <Head>
                <title>Transaction</title>
            </Head>
            <Header />
            <div className="px-80 py-20">
                <div className="flex justify-between items-center">
                    <p className="text-3xl font-semibold">Transaction</p>
                    <button className="px-12 py-3 text-gray-500 border border-black hover:text-black">Send Money</button>
                </div>
                <div className="w-full pt-20">
                    <table className="table-auto w-full">
                        <thead className="table-header-group">
                            <tr className="border-b">
                                <th className="text-left py-4 font-medium">Id</th>
                                <th className="text-left py-4 font-medium">From</th>
                                <th className="text-left py-4 font-medium">To</th>
                                <th className="text-left py-4 font-medium">Value</th>
                                <th className="text-left py-4 font-medium">Currency</th>
                                <th className="text-left py-4 font-medium">Created At</th>
                                <th className="text-left py-4 font-medium">Updated At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2">
                            <tr>
                                <td className="py-3">1</td>
                                <td>James LeBorn</td>
                                <td>me</td>
                                <td>254</td>
                                <td>USD</td>
                                <td>April 12. 2021 16:30</td>
                                <td>April 12. 2021 16:30</td>
                            </tr>
                            <tr>
                                <td  className="py-3">1</td>
                                <td>James LeBorn</td>
                                <td>me</td>
                                <td>254</td>
                                <td>USD</td>
                                <td>April 12. 2021 16:30</td>
                                <td>April 12. 2021 16:30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}