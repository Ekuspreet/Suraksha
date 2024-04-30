import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
const Login = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    const sendOTP = async (e) => {
        e.preventDefault()
        try {
            // Send a request to the backend to generate and send OTP
            await axios.post('/api/generate-otp', { phoneNumber });
            console.log('OTP sent successfully');
           
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            // Send a request to the backend to login with phone number and OTP
            console.log(phoneNumber,otp)
            const response = await axios.post('/api/login', { phoneNumber, otp });
            console.log('Login successful:', response.data);
            Cookie.set('token',response.data.token);
            navigate("/dashboard")
            // You can handle the response here, such as storing the token in local storage or redirecting to another page
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='text-primary px-4 py-4 bg-opacity-20 bg-primary rounded-xl my-3 max-w-[30em] m-auto mt-5 '>
            <form action="" className='flex flex-col gap-2 mb-5'>
                <label className='text-3xl font-bold text-center'>Login</label>
                <div className="divider">Enter Details</div>
                <label className="input input-bordered flex items-center gap-2">
                    Phone
                    <input 
                        required 
                        type="text" 
                        className="grow" 
                        placeholder="8887776665" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                </label>
                <button 
                    className='btn btn-neutral text-neutral-content mt-2' 
                    onClick={sendOTP}
                >
                    Send OTP
                </button>
                
                <div className="divider">Enter OTP</div>
                
                <label className="input input-bordered flex items-center gap-2">
                    OTP
                    <input 
                        required 
                        type="text" 
                        className="grow" 
                        placeholder="123456" 
                        min={0} 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                    />
                </label>

                <button 
                    className='btn btn-neutral text-neutral-content mt-2' 
                    onClick={loginUser}
                >
                    Log In
                </button>

                <a 
                    href="/" 
                    onClick={(e)=>{
                        e.preventDefault();
                        navigate("/register");
                    }} 
                    className='text-center link link-primary'
                >
                    First Time? Register Here.
                </a>
            </form>
        </div>
    );
};

export default Login;
