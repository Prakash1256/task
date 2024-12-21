import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [deviceLocations, setDeviceLocations] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    
    const fetchData = async () => {
      const response = await fetch('https://backend-task-iwp6.onrender.com/devices');
      const result = await response.json();
      setData(result);
    };
    fetchData();

    
    
    const fetchDeviceLocations = async () => {
      const response = await fetch('https://backend-task-iwp6.onrender.com/device-locations');
      const result = await response.json();
      setDeviceLocations(result);
    };
    fetchDeviceLocations();


    const interval = setInterval(() => {
      fetchDeviceLocations();
    }, 5000);  

    return () => clearInterval(interval);
  }, []);

  
  const center = [40.7128, -74.0060];

  return (
    <div className="min-h-screen bg-cyan-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
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
      <MapContainer
        center={center}
        zoom={10}
        style={{ width: '100%', height: '400px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        {deviceLocations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={new L.Icon.Default()}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

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
