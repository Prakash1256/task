import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaPen } from 'react-icons/fa';  // Importing pen icon for editing

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [deviceLocations, setDeviceLocations] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const response = await fetch('https://backend-task-iwp6.onrender.com/devices');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch devices.');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching device data:', err);
        setError(err.message);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

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
    fetchDeviceLocations();
    const interval = setInterval(fetchDeviceLocations, 60000); 
    return () => clearInterval(interval); 
  }, []);

  const center = [40.7128, -74.0060]; 

  const dummyData = [
    {
      name: 'Device A',
      deviceId: 'A123',
      output: 'Online',
      type: 'Sensor',
      updated: '2024-12-22T12:00:00Z',
    },
    {
      name: 'Device B',
      deviceId: 'B456',
      output: 'Offline',
      type: 'Actuator',
      updated: '2024-12-21T10:45:00Z',
    },
    {
      name: 'Device C',
      deviceId: 'C789',
      output: 'Online',
      type: 'Controller',
      updated: '2024-12-20T16:30:00Z',
    },
  ];

  const handleEdit = async (deviceId) => {
    try {
      // Mock PUT request to edit device
      const response = await fetch(`https://backend-task-iwp6.onrender.com/devices/${deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `Updated Device ${deviceId}`,
          output: 'Updated',
        }),
      });
      navigate("/profile-edit");
      if (!response.ok) throw new Error('Failed to update device');
      const updatedDevice = await response.json();
      setSuccessMessage(`Device ${updatedDevice.deviceId} updated successfully.`);
    } catch (err) {
      console.error('Error editing device:', err);
      setError('Failed to update device.');
    }
  };

  return (
    <div className="min-h-screen bg-cyan-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {loadingData && loadingLocations ? (
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
              <button
                onClick={() => handleEdit(item.deviceId)}
                className="text-blue-500 hover:text-blue-700 mt-2 flex items-center"
              >
                <FaPen className="mr-2" /> Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Table with Dummy Data */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Device Table</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Device ID</th>
              <th className="border border-gray-200 px-4 py-2">Main Output</th>
              <th className="border border-gray-200 px-4 py-2">Hardware Type</th>
              <th className="border border-gray-200 px-4 py-2">Last Updated</th>
              <th className="border border-gray-200 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-200 px-4 py-2">{item.name}</td>
                <td className="border border-gray-200 px-4 py-2">{item.deviceId}</td>
                <td className="border border-gray-200 px-4 py-2">{item.output}</td>
                <td className="border border-gray-200 px-4 py-2">{item.type}</td>
                <td className="border border-gray-200 px-4 py-2">{item.updated}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleEdit(item.deviceId)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaPen />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Device Locations</h2>
        <MapContainer center={center} zoom={10} style={{ width: '100%', height: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
      </div>
    </div>
  );
};

export default Dashboard;
