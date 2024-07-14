import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../Images/background3.jpg';


const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage after login
        if (!token) {
          throw new Error('Access Denied');
        }

        const response = await axios.get('http://localhost:8081/viewUserprofile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserProfile(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (

    <>

<div 
        className='justify-center items-center h-screen'
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.9,
        }}
    >
    <div>

    <h2 className='text-4xl ml-10 text-white font-bold text-center' style={{ textShadow: '1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000' }}>
        User Profile
      </h2>

      <div className='flex justify-center items-center mt-14'> 

        <div
    className="bg-white p-10 rounded-lg shadow-md  backdrop-blur-md backdrop-filter bg-opacity-20"
    style={{
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    }}
  >
    
    <div className="p-4">
    {error && <p className="text-red-500">{error}</p>}
    {userProfile && (
      <div className="">
 
        <p className='text-xl'><span className="font-bold ">Username:</span> &emsp;{userProfile.username}</p>
        <p className='text-xl'><span className="font-bold">Email:</span> &emsp;&emsp;&emsp;{userProfile.email}</p>
        <p className='text-xl'><span className="font-bold ">Role:</span> &emsp;&emsp;&emsp;&nbsp;&nbsp;{userProfile.role}</p>
       <table className="table-auto mt-5 text-xl">
            <thead>
                <tr>
                <th className="px-4 py-2">Pannel</th>
                <th className="px-4 py-2">Project Group</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td className="border px-4 py-2">{userProfile.pannel.map((item,index)=><div key={index}>{item}</div>)}</td>
                <td className="border px-4 py-2">{userProfile.projectgroup.map((item,index)=><div key={index}>{item}</div>)}</td>
                </tr>
            </tbody>
        </table>
        <p><span className="font-bold">Password Reset Status:</span> {userProfile.passwordResetstatus ? 'Yes' : 'No'}</p>
      </div>
    )}
  </div>
  </div>
  </div>
  </div>
  </div>
  </>
);
}

export default UserProfile;
