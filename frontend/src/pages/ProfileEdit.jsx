import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const [organization, setOrganization] = useState('My Organization');
  const [location, setLocation] = useState('New York, USA');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      // Mocked PUT request
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

      // Show toast for success
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/dashboard'); // Navigate to dashboard after success
      }, 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cyan-100 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="p-6 bg-white rounded shadow-md w-full max-w-lg"
      >
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
          type="submit"
          className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition"
        >
          Save
        </button>
      </form>
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-green-500 text-white rounded shadow-lg">
          <p className="text-sm font-medium">Profile updated successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
