import React from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
const Contact = ({ phone  }) => {
  const handleDelete = async () => {
    try {
      const token = Cookie.get('token'); // Assuming token is stored in localStorage
      await axios.post('/api/delete-contact', { token, phoneNumber: phone });
      location.reload() // Notify parent component to remove the deleted contact from the list
    } catch (error) {
      console.error('Error deleting contact:', error);
      // Handle error
    }
  };

  return (
    <div className="contact bg-white text-neutral p-2 m-2 rounded-xl">
      <span className='font-bold text-2xl'>{phone}</span>
      <button className="btn btn-sm float-end btn-neutral text-white" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Contact;
