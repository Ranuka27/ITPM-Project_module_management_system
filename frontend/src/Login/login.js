import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../UserFunction/Login';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import background from '../Images/bgnew.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const res = await login({ email, password });

      if (res) {
        alert('Login successful');
        navigate('/home');
        window.location.reload();
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Invalid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
   <h2 className="text-5xl font-bold text-slate-50 mb-8" style={{}}>Project Module Management System</h2>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md" style={{ width: '400px' }}>
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
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
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-4 text-gray-500 focus:outline-none">
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </div>
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:border-blue-700 w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white text-sm">Don't have an account?</p>
          <button
            className="text-blue-400 hover:underline focus:outline-none"
            onClick={() => navigate('/registerst')}
          >
            Student Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
