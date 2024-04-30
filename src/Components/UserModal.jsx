import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const UserModal = ({ Name, PhoneNumber }) => {
    const [message, setMessage] = useState('');
    const [userMessage, setUserMessage] = useState('');

    useEffect(() => {
        fetchUserMessage();
    }, []);

    const fetchUserMessage = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            const response = await axios.post('/api/dashboard', { token });
            const user = response.data.user;
            setUserMessage(user.SOSMessage || '');
        } catch (error) {
            console.error('Error fetching user message:', error);
        }
    };

    const saveMessage = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            const response = await axios.post('/api/update-sos-message', {
                token: token,
                content: message
            });

            console.log('Message saved successfully:', response.data);
            setUserMessage(message);
            setMessage('');
        } catch (error) {
            console.error('Error saving message:', error);
        }
    };

    return (
        <dialog id="user_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div className="p-4">
                    <h3 className="font-bold text-lg">Hello! {Name}</h3>
                    <p className="py-2">Phone : {PhoneNumber}</p>

                    <div >
                        <p className="font-semibold">User Message: {userMessage}</p>
                        
                    </div>


                    <div className="divider">Add New Message</div>

<form onSubmit={saveMessage} className="space-y-4">
    <div className="flex flex-col space-y-1">
        <label htmlFor="message" className="font-semibold">Message</label>
        <input
            id="message"
            type="text"
            className="input input-primary w-full"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
    </div>
    <div className="actions flex gap-5 justify-center">
    <button type="submit" className="btn btn-md btn-primary">Save</button>
    <button className="btn btn-neutral" onClick={() => { Cookies.remove('token'); location.reload() }}>Log Out</button>
    </div>
</form>


                   
                </div>
            </div>
        </dialog>
    );
};

export default UserModal;
