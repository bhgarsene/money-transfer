import React from 'react'
import Image from 'next/image'
import User from '../public/images/profile.PNG'

export default function Header({title }) {
    return (
        <div>
            <div className="py-4 px-48 border-b z-20 flex justify-end w-full shadow-md">
                <div className="flex gap-8 items-center">
                    <Image src={User} className="" width={35} height={35}/>
                    <p>Bihogo <span className="font-bold">Arsene</span></p>
                    <button className="border px-4 py-2 rounded-md">Sign out</button>
                </div>
            </div>
        </div>
    )
}