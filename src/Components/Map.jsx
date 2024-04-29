import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SimpleMap = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      error => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  return (
    <>
      <div className=' h-[30em] w-full overflow-hidden mt-2'>
        <div className="title text-center font-bold text-2xl text-white bg-neutral p-3 rounded-xl">Current Location</div>
        <MapContainer center={[30.908031452221756, 75.85923281461105]} zoom={15} style={{ height: '100%', width: '100%', backgroundColor: "white", borderRadius : "30px", marginTop : "1em"  }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && (
            <Marker position={userLocation}>
              <Tooltip>
                Your current location: {userLocation[0]}, {userLocation[1]}
              </Tooltip>
            </Marker>
          )}
        </MapContainer>
      </div>
    </>
  );
};

export default SimpleMap;
