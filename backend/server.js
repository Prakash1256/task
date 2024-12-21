import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// Mock device data
const devices = [
  { name: 'Device A', deviceId: '12345', output: 'Active', type: 'Type 1', updated: '2024-12-21' },
  { name: 'Device B', deviceId: '67890', output: 'Inactive', type: 'Type 2', updated: '2024-12-20' },
];

// Mock device location data
const deviceLocations = [
  { deviceId: '12345', lat: 40.7128, lng: -74.0060, name: 'Device A' },
  { deviceId: '67890', lat: 40.730610, lng: -73.935242, name: 'Device B' },
];

// API endpoint to fetch devices
app.get('/devices', (req, res) => {
  res.json(devices);
});

// API endpoint to fetch device locations
app.get('/device-locations', (req, res) => {
  res.json(deviceLocations);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});