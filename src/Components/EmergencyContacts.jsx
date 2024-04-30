import React, { useState, useEffect } from 'react';
import Contact from './Contact';
import axios from 'axios';
import Cookies from 'js-cookie';

const EmergencyContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [newContactPhone, setNewContactPhone] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmergencyContacts();
    }, []);

    const fetchEmergencyContacts = async () => {
        try {
            const token = Cookies.get('token'); // Fetch token from cookies
            const response = await axios.post('/api/dashboard', { token });
            const user = response.data.user;
            const emergencyContacts = user ? user.EmergencyNumbers || [] : [];
            console.log(response.data.user)
            setContacts(emergencyContacts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching emergency contacts:', error);
            setLoading(false);
        }
    };

    const handleAddContact = async () => {
        try {
            const token = Cookies.get('token'); // Fetch token from cookies
            const response = await axios.post('/api/add-contact', { token, contact: { phone: newContactPhone } });
            const { contactId } = response.data;
            setContacts([...contacts, { id: contactId, phone: newContactPhone }]);
            setNewContactPhone('');
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    return (
        <div className=" bg-accent text-white  rounded-xl h-[35em] overflow-y-auto mb-10">
            <div className="heading text-center text-2xl font-bold bg-accent sticky top-0 py-2 rounded-xl">
                Emergency Contacts
            </div>

            {contacts.map(contact => (
                <Contact
                    phone={contact}
                />
            ))}

            <div className="bottom bg-accent sticky bottom-0 py-1 mb-3">
                <div className="divider">Add A Contact</div>
                <div className="action flex justify-center  gap-2">
                    <label className="input input-bordered text-primary flex items-center ">
                        Phone
                        <input
                            required
                            type="text"
                            className="grow"
                            placeholder=" 8887776665"
                            value={newContactPhone}
                            onChange={e => setNewContactPhone(e.target.value)}
                        />
                    </label>

                    <button
                        className="btn btn-neutral font-semibold text-lg"
                        onClick={handleAddContact}
                    >
                        Add Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmergencyContacts;
