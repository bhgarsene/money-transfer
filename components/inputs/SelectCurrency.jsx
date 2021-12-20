import React from 'react'

export default function Select({ label, options, onChange }) {
    return (
        <div className="mb-6">
            <label className="text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <select name="" id="" onChange={onChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none">
                <option value="" defaultValue>Select Currency..</option>
                {
                    options.map(option => {
                        return (
                            <option key={option} value={option}  className="py-2 px-3 text-gray-700 focus:outline-none">{option}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}
