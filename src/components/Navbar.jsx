import React from 'react'

const Navbar = () => {
    const handleLogin = () => {
        window.open("https://github.com/","_blank");
    }
    return (
        <>
            <div className="w-full h-16 bg-black shadow-md">
                <div className="flex items-center flex-row justify-around p-4">
                    <div className="text-white font-sans cursor-pointer text-lg font-bold">
                        <span className="text-blue-500">&lt;</span>
                        Pass
                        <span className="text-blue-500">OP&gt;</span>
                    </div>
                    <button onClick={handleLogin} className="text-white text-md ring-white ring-1 cursor-pointer rounded-md">
                        <img className="h-10 bg-green-500 hover:bg-green-300 px-4 border-black rounded-md" src="/icons/githubicon.webp" alt="github" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar
