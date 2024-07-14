import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReportCriteriaform from './ReportCriteriaform';
import background from '../Images/Reports.jpg';


export default function InsertReport() {
    const [ReportData, setReportData] = useState({
        assID: '',
        title: '',
        description: '',
        weightage: '',
        pdf: '',
        showCriteriaForm: false
    });

    const { assID, title, description, weightage, pdf, showCriteriaForm } = ReportData;

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdf) {
        alert('Please insert a PDF');
        return;
    }

    const formData = new FormData();
    formData.append('assID', assID);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('weightage', weightage);
    
    if(pdf) {
        formData.append('pdf', pdf);
    }

    try {
        const response = await axios.post('http://localhost:8081/reportass/insertAss', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setReportData({ ...ReportData, showCriteriaForm: true });
        alert('Report inserted successfully');
    } catch (error) {
        console.error('Error inserting report:', error);
        alert(error.response.data.message);
    }
};

    const handleChange = (e) => {
        if (e.target.name === 'pdf') {
            setReportData({ ...ReportData, [e.target.name]: e.target.files[0] });
        } else {
            setReportData({ ...ReportData, [e.target.name]: e.target.value });
        }
    };
    

    const navigate = useNavigate();

    const handleback = () => {
        navigate(-1);
    }

  return (
    <>
        <div className='justify-center items-center min-h-screen' style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>

        <div className='text-white text-4xl text-center'>Insert Report</div>

        <div className='flex justify-end'>
        <button className=' border 1px w-[150px] bg-black h-[50px] mr-3 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#4c4d4c] before:to-[rgb(199,247,220)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]' onClick={handleback}>Back</button>

        </div>



    <div className='flex items-center justify-center'>
    <div className='justify-center bg-white p-5 w-6/12 rounded-lg shadow-md  backdrop-blur-md backdrop-filter bg-opacity-20 text-center mt-3'>
        <form onSubmit={handleSubmit} className="space-y-4">
  <div className="flex items-center">
    <label className='text-white text-xl flex-1'>Assignment ID:</label>
    <input
      type='text'
      name='assID'
      value={assID}
      onChange={handleChange}
      className='border-2 border-gray-400 p-2 flex-1'
    />
  </div>

  <div className="flex items-center">
    <label className='text-white text-xl flex-1'>Title:</label>
    <input
      type='text'
      name='title'
      value={title}
      onChange={handleChange}
      className='border-2 border-gray-400 p-2 flex-1'
    />
  </div>

  <div className="flex items-center">
    <label className='text-white text-xl flex-1'>Description:</label>
    <input
      type='text'
      name='description'
      value={description}
      onChange={handleChange}
      className='border-2 border-gray-400 p-2 flex-1'
    />
  </div>

  <div className="flex items-center">
    <label className='text-white text-xl flex-1'>Weightage:</label>
    <input
      type='text'
      name='weightage'
      value={weightage}
      onChange={handleChange}
      className='border-2 border-gray-400 p-2 flex-1'
    />
  </div>

  <div className="flex items-center">
    <label className='text-white text-xl flex-1'>PDF:</label>
    <input
      type='file'
      name='pdf'
      onChange={handleChange}
      className='border-2 border-gray-400 p-2 flex-1'
    />
  </div>

  <div className="flex justify-center">
    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Insert Report
    </button>
  </div>
</form>
        {showCriteriaForm && <ReportCriteriaform assID={assID} />}
        
    </div>
    </div>
    </div>
    </>
  )
}
