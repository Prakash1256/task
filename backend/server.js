import express from 'express';
import cors from 'cors';

const app = express();
const port =  5000;


app.use(cors({
  origin: "*"
}));


const devices = [
  { name: 'Device A', deviceId: '12345', output: 'Active', type: 'Type 1', updated: '2024-12-21' },
  { name: 'Device B', deviceId: '67890', output: 'Inactive', type: 'Type 2', updated: '2024-12-20' },
];


const deviceLocations = [
  { deviceId: '12345', lat: 26.8467, lng: 80.9462, name: 'Device A' }, 
  { deviceId: '67890', lat: 28.4595, lng: 77.0266, name: 'Device B' }, 
];


app.get('/devices', (req, res) => {
  res.json(devices);
});

app.get('/device-locations', (req, res) => {
  res.json(deviceLocations);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});