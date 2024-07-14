import React, { useState } from 'react';
import { register } from '../UserFunction/Login';
import background from '../Images/bgnew.jpg';
import { useNavigate } from 'react-router-dom';

const Registerst = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const role = "user"; // Role set to "user" and cannot be edited
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await register({ username, email, password, role });

      if (res) {
        alert(res.data.message);
        navigate('/');
        window.location.reload();
      } else {
        alert('Register failed');
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('An error occurred during register');
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md" style={{ width: '400px' }}>
        <form onSubmit={handleRegister} className="space-y-4">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Student Registration</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:border-blue-700 w-full"
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <p className="text-white text-sm">Already have an Account?</p>
            <button
              className="text-blue-400 hover:underline focus:outline-none"
              onClick={() => navigate('/')}
            >
              Student Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerst;
