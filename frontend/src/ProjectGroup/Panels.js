import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../Images/Home.jpg';

export default function Panels() {
    const [panels , setPanels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/Pannel/getPannel')
            .then((res) => {
                setPanels(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const navigate = useNavigate();

    const handleEdit = (panelId) => {
        navigate(`/panneledit/${panelId}`);
    };

    const handleDelete = (pannelName) => {
        axios.delete(`http://localhost:8081/Pannel/deletePannel/${pannelName}`) 
            .then((res) => {
                setPanels((prevPanels) => prevPanels.filter((panel) => panel.pannelName !== pannelName));
            })
            .catch((err) => {
                console.error(err);
            });
    }

  return (
    <>
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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}></div>

            <br/>
            <div className='text-3xl text-white text-center mt-3'>Examin Panels</div>

            <div className='flex flex-wrap justify-center mt-3'>

            {panels.map((panel) => (
                <div key={panel._id} className='m-3 p-3 bg-white rounded-lg shadow-lg'>
                <div className='text-xl'>Name :- &emsp;&nbsp;{panel.pannelName}</div>
                <div className='text-lg'>Members: &emsp;{panel.pannelMember1}, {panel.pannelMember2}, {panel.pannelMember3}</div>
                <div className='text-lg'>Date: &emsp;&emsp;&emsp;{panel.date}</div>
                <div className='text-lg'>Start Time: &nbsp;&nbsp;{panel.startTime}</div>
                <div className='text-lg'>End Time: &emsp;{panel.endTime}</div>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => handleEdit(panel._id)}
                >
                    Edit
                </button>

                <button
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-7'
                    onClick={() => handleDelete(panel.pannelName)}
                >
                    Delete
                </button>
                </div>
            ))}
            </div>
        </div>
    </>
  )
}
