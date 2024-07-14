import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import background from '../Images/stlogin.jpg';
 

export default function Stlogin() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));  // Initialize otp as an array of 6 empty strings
  const [showModal, setShowModal] = useState(false);

   

  const handleback = () => {
    window.location.replace('/home');
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the server to generate OTP
      const res = await axios.post('http://localhost:8081/sendOTP', { email });

      sessionStorage.setItem('email', email);

      // Handle response from the server
      alert(res.data.message);

      // If OTP is successfully sent, open the modal
      setShowModal(true);
    } catch (err) {
      console.error('Error:', err);
      alert(err.response.data.message)
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const otpInputRefs = Array(6).fill(0).map(() => React.createRef());

const handleOtpChange = (e, i) => {
  const newOtp = [...otp];  // Copy the current otp array
  newOtp[i] = e.target.value;  // Update the digit at the changed index
  setOtp(newOtp);  // Update the otp state

  // If a digit is entered and there's a next input field, focus it
  if (e.target.value && otpInputRefs[i + 1]) {
    otpInputRefs[i + 1].current.focus();
  }
};

  const handleOtpSubmit = (event) => {
    event.preventDefault();

    const email = sessionStorage.getItem('email');

    // Send a POST request to the server to verify OTP
    axios.post('http://localhost:8081/verifyOTP', { email, otp: otp.join('') })
      .then((res) => {
        // Handle response from the server
         
        localStorage.setItem('token', res.data.token);

        window.location.replace('/home');

        // Close the modal
        setShowModal(false);

         
      })
      .catch((err) => {
        console.error('Error:', err);
        // Handle error response from the server
        alert('Failed to verify OTP. Please try again.');
      });

    // Close the modal
    setShowModal(false);

    // Clear OTP field
    setOtp('');
  };

  return (
    <div>
      
      <div 
        className='justify-center items-center h-screen'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
         
        }}
    > <br/>

      <div className='text-center text-white text-4xl font-bold'>
        Login as a Student
      </div>

      {/* <div className='w-full flex justify-end'>
      <button className="bg-gray-500 mr-2 text-white w-24 px-4 py-2 rounded-md hover:bg-gray-600 justify-end"
          onClick={handleback}>
            Back
          </button>
      </div> */}

<div className='w-full h-96 mt-16 flex items-center justify-center'>
  <div
    className="bg-white p-10 rounded-lg shadow-md w-3/12 backdrop-blur-md backdrop-filter bg-opacity-20 flex items-center justify-center"
    style={{
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    }}
  >
        <form onSubmit={handleLogin} className="flex flex-col items-center justify-center">
          <label className='text-xl text-gray-300 mb-4'>Enter your SLIIT email</label>
          <div className="mb-4 w-full max-w-md">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e-mail"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-24 hover:bg-blue-600">
            Login
          </button>

          
          

        </form>
      </div>

      {/* Modal for OTP */}
      {showModal && (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-center">Enter OTP</h2>
      <form onSubmit={handleOtpSubmit}>
        <div className="justify-between">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            ref={otpInputRefs[i]}  // Add the ref to the input field
            className="w-12 h-12 border-gray-700 bg-gray-500  text-white rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-center m-2 text-xl"
            onChange={(e) => handleOtpChange(e, i)}
          />
        ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 ml-32">
          Submit OTP
        </button>
      </form>
    </div>
  </div>
)}

    </div>
    </div>
    </div>
    
  );
}
