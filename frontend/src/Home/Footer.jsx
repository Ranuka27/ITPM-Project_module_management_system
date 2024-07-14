import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <div className='footer-container'>
      <div className='h-10 bg-gray-800'>
        <div className='flex justify-center items-center h-full'>
          <p className='text-white text-sm cursor-default'>&copy; 2024 All rights reserved</p>
          <p className='text-white text-sm ml-2 cursor-pointer'>Developed by Group <span className='text-green-500'>JUN_WE_46</span></p>
        </div>
      </div>
    </div>
  );
}
