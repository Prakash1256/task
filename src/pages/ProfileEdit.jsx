import React, { useState } from 'react';

const ProfileEdit = () => {
  const [organization, setOrganization] = useState('My Organization');
  const [location, setLocation] = useState('New York, USA');

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-cyan-100 flex items-center justify-center">
      <form className="p-6 bg-white rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Organization Name</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-cyan-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-cyan-500"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
