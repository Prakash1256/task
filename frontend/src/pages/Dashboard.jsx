import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [deviceLocations, setDeviceLocations] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const response = await fetch('https://backend-task-iwp6.onrender.com/devices');
        if (!response.ok) throw new Error('Failed to fetch devices.');
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching device data:', err);
        setError('Error fetching device data.');
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

<<<<<<< HEAD
  // Fetch device locations
=======

>>>>>>> b7be5c6c368f3cc8e7703689e769ab46fcf2c08d
  const fetchDeviceLocations = async () => {
    try {
      setLoadingLocations(true);
      const response = await fetch('https://backend-task-iwp6.onrender.com/device-locations');
      if (!response.ok) throw new Error('Failed to fetch device locations.');
      const result = await response.json();
      setDeviceLocations(result);
    } catch (err) {
      console.error('Error fetching device locations:', err);
      setError('Error fetching device locations.');
    } finally {
      setLoadingLocations(false);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    fetchDeviceLocations();
=======
    
    fetchDeviceLocations();

    
>>>>>>> b7be5c6c368f3cc8e7703689e769ab46fcf2c08d
    const interval = setInterval(() => {
      fetchDeviceLocations();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

<<<<<<< HEAD
  const center = [40.7128, -74.0060]; // New York City coordinates

  // Custom Icon using Leaflet's built-in icon style
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Default Leaflet icon
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point of the icon
    popupAnchor: [0, -41], // Position of the popup relative to the icon
  });
=======
  const center = [40.7128, -74.0060]; 
>>>>>>> b7be5c6c368f3cc8e7703689e769ab46fcf2c08d

  return (
    <div className="min-h-screen bg-cyan-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loadingData ? (
        <p>Loading device data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>Device ID: {item.deviceId}</p>
              <p>Status: {item.output}</p>
              <p>Type: {item.type}</p>
              <p>Last Updated: {item.updated}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Device Locations</h2>

        <MapContainer center={center} zoom={10} style={{ width: '100%', height: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {deviceLocations.map((location, index) => (
            <Marker key={index} position={[location.lat, location.lng]} icon={customIcon}>
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <button
        onClick={() => navigate('/profile-edit')}
        className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Dashboard;
