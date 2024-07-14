import React from 'react'
import background from '../Images/Home2.jpg'
import Modal from 'react-modal';
import { useState } from 'react';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';

export default function Home() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updatePasswordstatus, setupdatePasswordstatus] = useState('');
    const [Email, setEmail] = React.useState('');
    const [role, setrole] = React.useState('');

    React.useEffect(() => {
        const Token = localStorage.getItem('token');

        if (Token) {
            const payloadPart = Token.split('.')[1];
            const payload = JSON.parse(atob(payloadPart));
            const username = payload.email;
            const role = payload.role;

            console.log(username);
            setEmail(username);
            setrole(role);

        }
    }, []);

    //get status of password update
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8081/findUserPasswordResetStatus',
                    {
                        email: Email // replace with the actual email
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                setupdatePasswordstatus(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (Email) {
            fetchData();
        }

    }, [Email]);


    const handlePasswordReset = async () => {
        try {
            await axios.patch('http://localhost:8081/resetPassword', {
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Password reset successfully');
            setModalIsOpen(false);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };
    return (
        <>

            <div
                className='fixed inset-0 h-screen'
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 255, 25, 0.1), rgba(0, 255, 25, 0.11)), url(${background})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',

                    zIndex: -1,
                }}
            >
                <br />
                <h1 className='text-center text-4xl text-white mt-20 font-bold'>Project Module Management System</h1>

                <div className='flex justify-center items-center h-full mt-[-96px]'>

                    {/* 
                   <div className='bg-gray-800 shadow-md w-96 px-4 py-4 backdrop-blur-md backdrop-filter bg-opacity-50 flex items-center justify-center h-full'>
  <h1 className='text-4xl font-bold text-white mt-10 text-center leading-relaxed'>Welcome to <br /> Project Module Management <br /> System</h1>
</div> */}

                    <div className=''>

                        {role === 'user' && (
                            <a href='/registration'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Group Registration
                                    </button>
                                </div>
                            </a>
                        )}

                        <a href='/insertAss'>
                            <div>
                                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                    <span className="mr-4">
                                        <PlusOutlined />
                                    </span>
                                    Assignments
                                </button>
                            </div>
                        </a>

                        {role === 'user' && (
                            <a href='/Reserachreq'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Research
                                    </button>
                                </div>
                            </a>
                        )}

                        {/* <a href='/report'>
                            <div>
                                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
  <span className="mr-4">
    <PlusOutlined />
  </span>
                                    Reports
                                </button>
                            </div>
                        </a> */}


                        {role !== 'user' && (

                            <a href='/marksheet'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Assignment Marking
                                    </button>
                                </div>
                            </a>
                        )}

                        {role !== 'user' && role !== 'Examiner' && (

                            <a href='/Reserachreqtable'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Research Requests
                                    </button>
                                </div>
                            </a>                        )}
                        {/* {role !== 'user' && (

                            <a href='/marksheetreport'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
  <span className="mr-4">
    <PlusOutlined />
  </span>
                                        Report Marking
                                    </button>
                                </div>
                            </a>
                        )} */}


                        {/* {role !== 'user' && (
                            <a href='/viewmarksheet'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
  <span className="mr-4">
    <PlusOutlined />
  </span>
                                        Student Marks
                                    </button>
                                </div>
                            </a>
                        )} */}

                        {role !== 'user' && (
                            <a href='/marksheetapproval'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Student Marks
                                    </button>
                                </div>
                            </a>
                        )}
                        {role !== 'user' && (
                            <a href='/groupedit'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Student Groups
                                    </button>
                                </div>
                            </a>
                        )}
                    </div>

                    <div className=' ml-32'>
                        {role !== 'user' && role !== 'Supervisor' && role !== 'Co-Supervisor' && role !== 'Examiner' && (
                            <a href='/pannelcreate'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Add Examination Panels
                                    </button>
                                </div>
                            </a>
                        )}
                        {role !== 'user' && (
                            <a href='/panels'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Examination Panels
                                    </button>
                                </div>
                            </a>
                        )}
                        {role !== 'user' && role !== 'Supervisor' && role !== 'Co-Supervisor' && role !== 'Examiner' && (
                            <a href='/register'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Add Staff Members
                                    </button>
                                </div>
                            </a>
                        )}

                        {role !== 'user' && role !== 'Supervisor' && role !== 'Co-Supervisor' && role !== 'Examiner' && (
                            <a href='/admin'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
                                        <span className="mr-4">
                                            <PlusOutlined />
                                        </span>
                                        Staff Members
                                    </button>
                                </div>
                            </a>
                        )}

                    </div>


                    {/* <div>
                        {role === 'user' && (
                            <a href='/registration'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
  <span className="mr-4">
    <PlusOutlined />
  </span>
                                        Group Registration
                                    </button>
                                </div>
                            </a>
                        )}

                        {role === 'user' && (
                            <a href='/Reserachreq'>
                                <div>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 px-2 py-5 dark:focus:ring-cyan-800 mb-4" style={{ width: '250px' }}>
  <span className="mr-4">
    <PlusOutlined />
  </span>
                                        Reserch 
                                    </button>
                                </div>
                            </a>
                        )}

                    </div> */}

                </div>
            </div>

        </>
    )
}
