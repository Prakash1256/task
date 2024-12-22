import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false); 
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    localStorage.setItem('user', JSON.stringify({ email, password }));
    setError('');
    setShowToast(true); 
    setTimeout(() => {
      setShowToast(false); 
      navigate('/'); 
    }, 1000);
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-2xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-cyan-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-cyan-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition"
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="text-cyan-500 underline hover:text-cyan-600"
            >
              Login
            </button>
          </p>
        </div>
      </form>
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-green-500 text-white rounded shadow-lg">
          <p className="text-sm font-medium">Sign-up successful! Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default SignUp;
