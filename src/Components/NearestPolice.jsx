import React,{useState, useEffect} from 'react'
import Station from './Station';

const policeStations = [
  {
    id: 1,
    name: 'Police Station PS Haibowal',
    latitude: 30.923941,
    longitude: 75.806293,
    phoneNumber: '9592914733',
    address: 'Near Pani di tanki, Corporation Park'
  },
  {
    id: 2,
    name: 'Police Station PS Daresi',
    latitude: 30.923534,
    longitude: 75.866953,
    phoneNumber: '0161-2750078',
    address: 'Daresi Road, Near Daresi Ground'
  },
  {
    id: 3,
    name: 'Police Station PS Division No. 1 (Kotwali)',
    latitude: 30.917107,
    longitude: 75.850326,
    phoneNumber: '0161-2555703',
    address: 'Chaura Bazar, Near Clock Tower'
  },
  {
    id: 4,
    name: 'Police Station PS N.R.I.',
    latitude: 30.902629,
    longitude: 75.892462,
    phoneNumber: '01612413888',
    address: 'CPRC Building, CP Complex'
  },
  {
    id: 5,
    name: 'Police Station Division No. 2',
    latitude: 30.908495,
    longitude: 75.858659,
    phoneNumber: '0161-2555704',
    address: 'Near Civil Hospital, Old Jail Road'
  },
  {
    id: 6,
    name: 'Police Station PS Division No. 3',
    latitude: 31.326661,
    longitude: 75.581957,
    phoneNumber: '0161-2555705',
    address: 'Near Vashno Devi Chowk'
  },
  {
    id: 7,
    name: 'Police Station PS Division No. 4',
    latitude: 31.326885,
    longitude: 75.575103,
    phoneNumber: '9592914725',
    address: 'Near Durga Mata Mandir'
  },
  {
    id: 8,
    name: 'Police Station PS Division No. 6 (Dholewal)',
    latitude: 30.893818,
    longitude: 75.871204,
    phoneNumber: '0161-2555299',
    address: 'Near Dholewal Chowk'
  },
  {
    id: 9,
    name: 'Police Station PS Ladhowal',
    latitude: 30.978987,
    longitude: 75.792956,
    phoneNumber: '9592914739',
    address: 'G.T. Road, Ladhowal Chowk'
  },
  {
    id: 10,
    name: 'Police Station PS Division No. 7 (Vardhman)',
    latitude: 31.287561,
    longitude: 75.596223,
    phoneNumber: '0161-2555697',
    address: 'Near Vardhman Mill'
  },
  {
    id: 11,
    name: 'Police Station PS Koom Kalan',
    latitude: 30.916439,
    longitude: 76.066396,
    phoneNumber: '0161-2832273',
    address: 'Near Gurdwara, Koom Kalan, Ludhiana -141126'
  },
  {
    id: 12,
    name: 'Police Station PS Division No. 8',
    latitude: 30.914539,
    longitude: 75.843673,
    phoneNumber: '0161-2414944',
    address: 'Near Iqbal Nursing, Sadar Quarter'
  },
  {
    id: 13,
    name: 'Police Station PS DUGRI',
    latitude: 30.868306,
    longitude: 75.843005,
    phoneNumber: '9592914776',
    address: 'Near MD School, MIG Flats'
  },
  {
    id: 14,
    name: 'Police Station PS Sadar Ludhiana',
    latitude: 30.902602,
    longitude: 75.835226,
    phoneNumber: '0172-2260042',
    address: 'Nearby Address: Police station sadar, 302, NH5, Civil Lines, Ludhiana, Punjab 141001'
  },
  {
    id: 15,
    name: 'Police Station PS Shimla puri',
    latitude: 30.888667,
    longitude: 75.861571,
    phoneNumber: '7837018910',
    address: '12, Gabria Office Rd, Industrial Area-B, Ludhiana, Punjab 141003'
  },
  {
    id: 16,
    name: 'Police Station PS Model Town',
    latitude: 30.888465,
    longitude: 75.840437,
    phoneNumber: '011 2745 6072',
    address: 'Nearby Address: VRQR+95F SHREE, Model Town Main Market Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002'
  },
  {
    id: 17,
    name: 'Police Station PS Basti Jodhewal',
    latitude: 30.932723,
    longitude: 75.865812,
    phoneNumber: '7837018916',
    address: 'Nearby Address: Police station sunder nagar, St/2, near Police Chowki, Basti Jodhewal, Sunder Nagar, Ludhiana, Punjab 141007'
  },
  {
    id: 18,
    name: 'Police Station PS Sahnewal',
    latitude: 30.835934,
    longitude: 75.973516,
    phoneNumber: '7837018617',
    address: 'RXPF+9CC, Sahnewal, Punjab 141120'
  }
];


const NearestPolice = () => {
  const [userLocation, setUserLocation] = useState(null); // Initialize to null instead of []
  const [nearestStations, setNearestStations] = useState([]);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3; // Earth radius in meters
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;
      return (distance / 1000).toFixed(3);
 // Distance in meters
    };

    // Calculate distances to all police stations
    const stationsWithDistance = policeStations.map(station => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        station.latitude,
        station.longitude
      );
      return { ...station, distance };
    });

    // Sort police stations by distance
    stationsWithDistance.sort((a, b) => a.distance - b.distance);

    // Set the 6 nearest police stations
    setNearestStations(stationsWithDistance.slice(0, 6));
  }, [userLocation]);

  return (
    <>
      <div className=" bg-accent text-white  rounded-xl h-[35em] overflow-y-auto mb-10">
        <div className="heading text-center text-2xl font-bold bg-accent sticky top-0 py-2 rounded-xl">
          Nearest Police Stations
        </div>

        {nearestStations.map(station => (
          <Station
            key={station.id}
            name={station.name}
            phone={station.phoneNumber}
            address={station.address}
            distance={station.distance}
            lat = {station.latitude}
            long = {station.longitude}
          />
        ))}
      </div>
    </>
  );
};

export default NearestPolice;