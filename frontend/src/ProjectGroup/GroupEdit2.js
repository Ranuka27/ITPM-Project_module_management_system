import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from '../Images/Group.jpg';
import { useNavigate } from 'react-router-dom';


export default function GroupEdit2() {
    const [groupDetails, setGroupDetails] = useState({});
    const { id } = useParams(); // Destructure id from useParams

    useEffect(() => {
        axios.get(`http://localhost:8081/GroupReg/getGroupregById/${id}`)
            .then((res) => {
                setGroupDetails(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]); // Add id as a dependency to the useEffect hook

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8081/GroupReg/updateGroupreg/${id}`, groupDetails);
            console.log("Group details updated successfully!");
            toast.success("Group details updated successfully!");
        } catch (error) {
            console.error("Error updating group details:", error);
            toast.error("Error updating group details. Please try again.");
        }
    };

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroupDetails({ ...groupDetails, [name]: value });
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}></div>
        <ToastContainer />
            <div className='text-2xl text-white text-center'>Edit Group Details</div>
            <div className='w-full flex justify-end items-end'>
    <button className="w-[150px] bg-black border 1px mr-3 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
    onClick={handleBack}
    >    
        Back
    </button>
</div>
            <div className='flex mt-4 items-center justify-center'>
            <div className="bg-white px-11 py-10 w-6/12 rounded-lg shadow-md backdrop-blur-md backdrop-filter bg-opacity-20">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col lg:flex-row lg:gap-4">
                        <div className=" items-center lg:w-1/2">
                            <label htmlFor="GroupName" className="text-lg font-bold text-gray-800 lg:w-32">Group Name:</label>
                            <input
                                type="text"
                                id="GroupName"
                                name="GroupName"
                                value={groupDetails.GroupName || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className=' items-center lg:w-1/2'>
                            <label htmlFor = "researcharea" className="text-lg font-bold text-gray-800 lg:w-32">Research Area:</label>
                            <input
                                type="text"
                                id="researcharea"
                                name="researcharea"
                                value={groupDetails.researcharea || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                            </div>
                        </div>
                    <div className="flex flex-col lg:flex-row lg:gap-4">
                        <div className=" items-center lg:w-1/2">
                            <label htmlFor="Leader" className="text-lg font-bold text-gray-800 lg:w-32">Leader:</label>
                            <input
                                type="text"
                                id="Leader"
                                name="Leader"
                                value={groupDetails.Leader || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className=" items-center lg:w-1/2">
                            <label htmlFor="Contact" className="text-lg font-bold text-gray-800 lg:w-32">Contact:</label>
                            <input
                                type="text"
                                id="Contact"
                                name="Contact"
                                value={groupDetails.Contact || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-4">
                        <div className=" items-center lg:w-1/2">
                            <label htmlFor="Member1" className="text-lg font-bold text-gray-800 lg:w-32">Member 1:</label>
                            <input
                                type="text"
                                id="Member1"
                                name="Member1"
                                value={groupDetails.Member1 || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className=" items-center lg:w-1/2">
                            <label htmlFor="Member2" className="text-lg font-bold text-gray-800 lg:w-32">Member 2:</label>
                            <input
                                type="text"
                                id="Member2"
                                name="Member2"
                                value={groupDetails.Member2 || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-4">
                        <div className=" items-center lg:w-1/2">
                            <label htmlFor="Member3" className="text-lg font-bold text-gray-800 lg:w-32">Member 3:</label>
                            <input
                                type="text"
                                id="Member3"
                                name="Member3"
                                value={groupDetails.Member3 || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className=" items-center lg:w-1/2">
                            <label htmlFor="supervisor" className="text-lg font-bold text-gray-800 lg:w-32">Supervisor:</label>
                            <input
                                type="text"
                                id="supervisor"
                                name="supervisor"
                                value={groupDetails.supervisor || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-4">
                        <div className=" items-center lg:w-1/2">
                            <label htmlFor="cosupervisor" className="text-lg font-bold text-gray-800 lg:w-32">Co-Supervisor:</label>
                            <input
                                type="text"
                                id="cosupervisor"
                                name="cosupervisor"
                                value={groupDetails.cosupervisor || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className=" items-center lg:w-1/2">
                            <label htmlFor="batch" className="text-lg font-bold text-gray-800 lg:w-32">Batch:</label>
                            <input
                                type="text"
                                id="batch"
                                name="batch"
                                value={groupDetails.batch || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    

                    <div className='flex items-center justify-center'>
                    <button type="submit" className="bg-blue-500 w-52 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </>
    );
}
