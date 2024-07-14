import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from '../Images/background3.jpg';

export default function PanelEdit() {
    const [panelDetails, setPanelDetails] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/Pannel/getPannel/${id}`)
            .then((res) => {
                setPanelDetails(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPanelDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updatePanel = () => {
        axios.patch(`http://localhost:8081/Pannel/editPannel/${panelDetails.pannelName}`, panelDetails)
            .then((res) => {
                toast.success('Panel updated successfully');
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    return (
        <div className='mt-56'>
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
                <div className='text-3xl text-white text-center mt-3'>Edit Panel</div>
                <div className='flex flex-wrap justify-center mt-3'>
                    <div className='m-3 p-3 bg-white rounded-lg shadow-lg'>
                        <div className='text-xl'>Name: </div>
                        <input
                            type="text"
                            name="pannelName"
                            value={panelDetails.pannelName || ''}
                            onChange={handleChange}
                            placeholder="Panel Name"
                        />
                        <div className='text-lg'>Members: </div>
                        <input
                            type="text"
                            name="pannelMember1"
                            value={panelDetails.pannelMember1 || ''}
                            onChange={handleChange}
                            placeholder="Panel Member 1"
                        />
                        <input
                            type="text"
                            name="pannelMember2"
                            value={panelDetails.pannelMember2 || ''}
                            onChange={handleChange}
                            placeholder="Panel Member 2"
                        />
                        <input
                            type="text"
                            name="pannelMember3"
                            value={panelDetails.pannelMember3 || ''}
                            onChange={handleChange}
                            placeholder="Panel Member 3"
                        />
                        <div className='text-lg'>Date: </div>
                        <input
                            type="text"
                            name="date"
                            value={panelDetails.date || ''}
                            onChange={handleChange}
                            placeholder="Date"
                        />
                        <div className='text-lg'>Start Time: </div>
                        <input
                            type="text"
                            name="startTime"
                            value={panelDetails.startTime || ''}
                            onChange={handleChange}
                            placeholder="Start Time"
                        />
                        <div className='text-lg'>End Time: </div>
                        <input
                            type="text"
                            name="endTime"
                            value={panelDetails.endTime || ''}
                            onChange={handleChange}
                            placeholder="End Time"
                        />
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            onClick={updatePanel}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
