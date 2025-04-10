import React, { useEffect, useState } from 'react'

function Layout() {
    const [user, setUser] = useState("")
    const [wish, setWish] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("name")
        setUser(user)

        const hour = new Date().getHours();
        if (hour < 12) {
            setWish("Good morning");
        } else if (hour < 18) {
            setWish("Good afternoon");
        } else {
            setWish("Good evening");
        }
    }, [])

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold text-cyan-700 underline mb-4'>
                Heyy, {user || "User"}
            </h1>
            <p className='text-lg text-gray-600'>{wish} 🤍</p>
        </div>
    )
}

export default Layout