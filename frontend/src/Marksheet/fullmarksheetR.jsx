import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../Images/background4.jpg';


export default function FullmarksheetR() {
  const [details, setDetails] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:8081/reportMarksheet/sum');
      console.log(response.data);
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='justify-center items-center h-screen' style={{
      position: 'relative', // Make the container position relative
   
    }}>
      <div style={{
        position: 'fixed', // Fix the background
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Send it to the back
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}></div>
    <div className=''>
        <h1 className='text-center text-3xl font-semibold text-white'>Full Marksheet for Reports</h1>
        {Object.entries(details).map(([key, value], index) => (
  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-2">
    <p className="text-lg font-semibold">ITNumber: <span className="font-normal">{key}</span>, TotalMarks: <span className="font-normal">{value}</span></p>
  </div>
))}
    </div>
    </div>
  );
}