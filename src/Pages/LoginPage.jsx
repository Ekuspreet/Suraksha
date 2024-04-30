import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Login from '../Components/Login'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
            if (Cookies.get('token')) {
                navigate("/dashboard")
            }
    
},[])

return (
    <>

        <main className="p-2">
            <Navbar />
            <Login />
        </main>
    </>

)
}

export default LoginPage