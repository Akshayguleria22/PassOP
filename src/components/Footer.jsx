import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="w-full h-16 bg-black shadow-md fixed bottom-0">
                <div className="flex items-center flex-row justify-evenly p-4">
                    <div className="text-white font-sans cursor-pointer text-lg font-bold">
                        <span className="text-blue-500">&lt;</span>
                        Pass
                        <span className="text-blue-500">OP&gt;</span>
                    </div>
                    <div className="text-white text-md">
                        Created With ❤️ by Akshay Guleria
                    </div>
                    <div className="text-white text-md">
                        &copy; 2025 Akshay Guleria. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
