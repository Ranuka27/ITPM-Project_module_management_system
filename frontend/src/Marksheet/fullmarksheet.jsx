import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../Images/background4.jpg';

 
export default function Fullmarksheet() {
  const [details, setDetails] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:8081/sum');
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
    <div className='flex flex-col items-center'>
        <h1 className='text-center text-white text-3xl font-semibold mb-6'>Full Marksheet For Presentations</h1>
       <div className='flex justify-end'>
  <a href='/fullmarksheetR' className='ml-auto'>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Full Marksheet for Reports
    </button>
  </a>
</div>
        <div className='w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            {Object.entries(details).map(([key, value], index) => (
                <div key={index} className='mb-4'>
                    <span className='block text-gray-700 text-sm font-bold mb-2'>ITNumber: {key}</span>
                    <span className='block text-gray-700 text-sm font-bold mb-2'>TotalMarks: {value}</span>
                    <hr className='mt-2 mb-2'/>
                </div>
            ))}
        </div>
    </div>
    </div>

  );
}