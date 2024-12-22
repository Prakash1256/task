import './App.css'
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfileEdit from './pages/ProfileEdit';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
