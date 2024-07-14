import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import background from '../Images/Presentations.jpg';
import { useNavigate } from 'react-router-dom';

const EditAssignment = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState({ title: '', description: '', weightage: '', pdf: '', assID: '', showCriteriaForm: false});
    

  useEffect(() => {
    console.log(id); // Check if id is being received
    const fetchAssignment = async () => {
      const response = await axios.get(`http://localhost:8081/all/${id}`);
      setAssignment(response.data);
    };

    fetchAssignment();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'pdf') {
      // If the target name is 'pdf', update the pdf state with the selected file
      setAssignment({ ...assignment, pdf: e.target.files[0] });
    } else {
      // Otherwise, update other assignment details
      setAssignment({ ...assignment, [e.target.name]: e.target.value });
    }
  };

  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await axios.patch(`http://localhost:8081/assignments/${id}`, assignment);
    // // Redirect or do something after successful edit
    // alert('Assignment updated successfully');
    // navigate('/insertAss');

      // Create FormData object to handle file upload
  const formData = new FormData();
  // Append other assignment data to FormData
  formData.append('assID', assignment.assID);
  formData.append('title', assignment.title);
  formData.append('description', assignment.description);
  formData.append('weightage', assignment.weightage);
  formData.append('pdf', assignment.pdf); // Append the existing PDF file
  
  try {
    // Use axios to send a PATCH request with FormData
    const response = await axios.patch(`http://localhost:8081/assignments/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure proper content type for FormData
      }
    });
    
    // Redirect or do something after successful edit
    alert('Assignment updated successfully');
    navigate('/insertAss');
  } catch (error) {
    console.error('Error updating assignment:', error);
    // Handle error if necessary
  }


  };

  return (
    <>
    <div className='justify-center items-center min-h-screen' style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${background})`,
                backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }}>
      <br/>
    <div className='text-center text-white text-4xl'>
      Edit Details of the {assignment.title}
    </div>

    {/* <div className='flex flex-row justify-end'>
      <button onClick={handleback} className='w-[150px] border-white border 1px bg-black h-[50px] mr-3 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#4c4d4c] before:to-[rgb(199,247,220)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>
        Back
      </button>
    </div> */}
    
<div className='flex items-center justify-center mt-4'>
    <div className=" flex justify-center bg-white w-fit p-2 rounded-lg shadow-md  backdrop-blur-md backdrop-filter bg-opacity-20 text-center">

      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 m-2'>
  <label className='font-bold'>Assignment ID:</label>
  <input
    type='text'
    name='assID'
    value={assignment.assID}
    onChange={handleChange}
    placeholder='Assignment ID'
    className='border-2 border-gray-400 p-2 rounded-md'
  />
  <label className='font-bold'>Title:</label>
  <input
    type='text'
    name='title'
    value={assignment.title}
    onChange={handleChange}
    placeholder='Title'
    className='border-2 border-gray-400 p-2 rounded-md'
  />
  <label className='font-bold'>Description:</label>
  <input
    type='text'
    name='description'
    value={assignment.description}
    onChange={handleChange}
    placeholder='Description'
    className='border-2 border-gray-400 p-2 rounded-md'
  />
  <label className='font-bold'>Weightage:</label>
  <input
    type='number'
    name='weightage'
    value={assignment.weightage}
    onChange={handleChange}
    placeholder='Weightage'
    className='border-2 border-gray-400 p-2 rounded-md'
  />
  <div className='col-span-2 text-red-600 font-semibold text-lg'> Please upload the new file only if need to change the current file. </div>
  <label className='font-bold mt-3'>PDF:</label>
  <input
    type='file'
    name='pdf'
    onChange={handleChange}
    placeholder='PDF'
    className='border-2 border-gray-400 p-2'
  />
  <div className='col-span-2'>
    <button type='submit' className='bg-blue-500 hover:bg-blue-700 p-2 rounded-lg m-2'>
      Update Assignment
    </button>
  </div>
</form>
      </div>
      </div>

    </div>
    </>
      
  );
};

export default EditAssignment;