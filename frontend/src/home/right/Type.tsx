import React from 'react'
import { BsSend } from "react-icons/bs";

const Type = () => {
    return (
        <>
            <div className='flex space-x-4 max-h-[8vh] text-center'>
                <div className='w-[70%] mx-5'>
                    <input type="text" placeholder="Type here" className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center w-full py-3 px-3 " />
                </div>
                <button className='button button-primary'>
                    <BsSend />
                </button>
            </div>
        </>
    )
}

export default Type