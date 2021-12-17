import React from 'react'

export default function Text({ label }) {
    return (
        <div className="mb-6">
            <label className="text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <select name="" id="" className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none">
                <option value="USD" className="py-2 px-3 text-gray-700 focus:outline-none">USD</option>
                <option value="EUR" className="py-2 px-3 text-gray-700 focus:outline-none">EUR</option>
                <option value="NGN" className="py-2 px-3 text-gray-700 focus:outline-none">NGN</option>
            </select>
        </div>
    )
}
