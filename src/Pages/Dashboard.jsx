import React, { useEffect, useState } from 'react';
import NavbarProfile from '../Components/NavbarProfile';
import SOS from '../Components/SOS';
import EmergencyContacts from '../Components/EmergencyContacts';
import UserModal from '../Components/UserModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // State variable to store user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          navigate('/');
          return;
        }

        const response = await axios.post('/api/dashboard', { token });
        console.log(response.data.user);
        setUserData(response.data.user); // Update user data in state
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, such as redirecting to login page
        navigate('/');
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <main className='px-2'>
        {userData && <NavbarProfile Name={userData.Name} />}
        {/* Render UserModal only if userData is available */}
        {userData && (
          <UserModal
            Name={userData.Name}
            PhoneNumber={userData.PhoneNumber}
            Message={userData.SOSMessage}
          />
        )}
        <SOS />
        <div className="divider divider-neutral"></div>
        <EmergencyContacts />
      </main>
    </>
  );
};

export default Dashboard;
