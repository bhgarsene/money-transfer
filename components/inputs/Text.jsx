import React from 'react'

export default function Text({label , type , placeholder , value , onChange  }) {
    return (
        <div className="mb-6">
                <label className="text-gray-700 text-sm font-bold mb-2">
                    {label}
                </label>
            <input className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" onChange={onChange} value={value} type={type} placeholder={placeholder} />
        </div>
    )
}
