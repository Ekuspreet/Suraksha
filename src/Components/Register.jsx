import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');

    const generateOTP = async (e) => {
        e.preventDefault();
        try {
            // Send data to backend for OTP generation
            const response = await axios.post('/api/generate-otp', {
                name: name,
                phoneNumber: phone
            });

            console.log('Response:', response.data);
            console.log('OTP generated successfully');
        } catch (error) {
            console.error('Error generating OTP:', error);
        }
    };

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            // Send data to backend for user registration
            const response = await axios.post('/api/validate-otp', {
                name: name,
                phoneNumber: phone,
                otp: otp
            });

            console.log('Response:', response.data);
            Cookies.set('token', response.data.token, { expires: 10 });

            console.log('User registered successfully');
            navigate("/dashboard");
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className='text-primary px-4 py-4 bg-opacity-20 bg-primary rounded-xl my-3 max-w-[30em] m-auto mt-5 '>
            <form className='flex flex-col gap-2 mb-5'>
                <label className='text-3xl font-bold text-center'>Register</label>
                <div className="divider">Enter Details</div>
                <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input 
                        required 
                        type="text" 
                        className="grow" 
                        placeholder="John Smith" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Phone
                    <input 
                        required 
                        type="text" 
                        className="grow" 
                        placeholder="8887776665" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                    />
                </label>
                
                <button onClick={generateOTP} type="button" className='btn btn-neutral text-neutral-content mt-2'>Send OTP</button>
                
                <>
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
                    <button onClick={registerUser} type="button" className='btn btn-neutral text-neutral-content mt-2'>Register</button>
                </>
                
                <a href="/" className='text-center link link-primary'>Already Registered? Log In.</a>
            </form>
        </div>
    );
};

export default Register;
