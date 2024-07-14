import React, { useState } from 'react';
import axios from 'axios';
import background from '../Images/Presentations.jpg';
import CriteriaForm from './CriteriaForm'; // Import the CriteriaForm component
import { useNavigate } from 'react-router-dom';

export default function Insert() {
    const [AssignmentData, setAssignmentData] = useState({
        assID: '',
        title: '',
        description: '',
        weightage: '',
        pdf: null, // Initialize pdf state as null
        showCriteriaForm: false
    });

    const { assID, title, description, weightage, pdf, showCriteriaForm } = AssignmentData;

    const handleUpload = (e) => {
        const file = e.target.files[0];
        setAssignmentData({ ...AssignmentData, pdf: file }); // Update pdf state with the selected file
    };

    const navigate = useNavigate();

    const handleback = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pdf) {
            alert('Please select a file');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('assID', assID);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('weightage', weightage);
            formData.append('pdf', pdf);

            const response = await axios.post('http://localhost:8081/insertAss', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setAssignmentData({ ...AssignmentData, showCriteriaForm: true });
            alert('Assignment inserted successfully');
        } catch (error) {
            console.error('Error inserting assignment:', error);
            alert(error.response.data.message);
        }
    };

    const handleChange = (e) => {
        setAssignmentData({ ...AssignmentData, [e.target.name]: e.target.value });
    };

    return (
        <div className='justify-center items-center h-screen' style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }}>
            <div>
                <h1 className='text-center text-3xl text-white' >Insert Assignment</h1>

                <div className='flex justify-end'>
          {/* <div>
          <button className='w-[150px] bg-black h-[50px] mr-3 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#4c4d4c] before:to-[rgb(199,247,220)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]' onClick={handleback}>Back</button>

          </div> */}
          </div>
                <div className="flex justify-center items-center">

                <div className=" flex justify-center bg-white p-8 mt-8 rounded-lg shadow-md w-fit backdrop-blur-md backdrop-filter bg-opacity-20 text-center">

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
                    <div className="grid grid-cols-2 gap-4">
                        <label className=" flex flex-col justify-center text-lg font-bold">Assignment ID:</label>
                        <input
                            type="text"
                            name="assID"
                            value={assID}
                            onChange={handleChange}
                            placeholder="Assignment ID"
                            className="border-2 border-gray-400 p-2 rounded-md"
                        />

                        <label className=" flex flex-col justify-center text-lg font-bold">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="border-2 border-gray-400 p-2 rounded-md"
                        />

                        <label className=" flex flex-col justify-center text-lg font-bold">Description:</label>
                        <textarea
                            type="text"
                            name="description"
                            value={description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border-2 border-gray-400 p-2 rounded-md w-64 h-20"
                        />

                        <label className=" flex flex-col justify-center text-lg font-bold">Marks:</label>
                        <input
                            type="number"
                            name="weightage"
                            value={weightage}
                            onChange={handleChange}
                            placeholder="Marks"
                            className="border-2 border-gray-400 p-2 rounded-md"
                        />

                        <input
                            type="file"
                            name="pdf"
                            onChange={handleUpload}
                            className="border-2 border-gray-400 p-2 col-span-2"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 p-2 rounded-lg mt-4 block mx-auto">
                        Insert Assignment
                    </button>
                </form>
                </div>
                </div>
                {showCriteriaForm && <CriteriaForm assID={assID} />}
            </div>
        </div>
    );
}
