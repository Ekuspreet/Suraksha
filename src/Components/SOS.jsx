import React, { useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

const SOS = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSOSClick = async () => {
    try {
      setLoading(true);
      
      // Retrieve JWT token from cookie
      const token = Cookie.get('token'); // Corrected syntax
      
      // Get latitude and longitude from browser's geolocation
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        // Send SOS request
        sendSOS(token, latitude, longitude);
      }, error => {
        setLoading(false);
        setError('Failed to retrieve location: ' + error.message);
      });
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error || 'An error occurred while sending SOS');
      console.error('Error sending SOS:', error);
    }
  };

  const sendSOS = async (token, latitude, longitude) => {
    try {
      const response = await axios.post('/sos', {
        latitude,
        longitude
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach JWT token to the request
        }
      });

      // SOS request successful
      setLoading(false);
      setError(null);
      alert('SOS message sent to emergency contacts');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error || 'An error occurred while sending SOS');
      console.error('Error sending SOS:', error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button 
        className="btn mt-3 w-full h-60 btn-primary text-white text-9xl rounded-xl"
        onClick={handleSOSClick}
        disabled={loading}
      >
        SOS
      </button>
    </div>
  );
};

export default SOS;
