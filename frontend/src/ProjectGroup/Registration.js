import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../Images/Group.jpg';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [assID, setAssID] = useState('');
  const [username, setUsername] = useState('');
  const [allGroups, setAllGroups] = useState('');
  const [users, setUsers] = useState('');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    AssTitle: '',
    researcharea: '',
    batch: '',
    specialization: '',
    supervisor: '',
    cosupervisor: '',
    Leader: '',
    name: '',
    email: '',
    Contact: '',
    Member1: '',
    Member2: '',
    Member3: ''
  });

  useEffect(() => {
    const Token = localStorage.getItem('token');

    if (Token) {
      const payloadPart = Token.split('.')[1];
      const payload = JSON.parse(atob(payloadPart));
      const username = payload.email;
      const role = payload.role;

      const updateUserName = username.endsWith('@my.sliit.lk') ? username.split('@')[0] : username;

      setUsername(updateUserName);
      // Set Leader field to username
      setFormData(prevState => ({
        ...prevState,
        Leader: updateUserName,
        email: username
      }));
    }
  }, []);


  const fetchAllGroups = async () => {
  try {
    const responseGroups = await axios.get('http://localhost:8081/GroupReg/getGroupreg');

    setAllGroups(responseGroups.data);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchAllGroups();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/viewAllUsers');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);


  useEffect(() => {
    const fetchAssID = async () => {
      try {
        const response = await axios.get('http://localhost:8081/all');
        setAssID(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssID();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateContact = (contact) => {
    const regex = /^\d{10}$/;
    return regex.test(contact);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateContact(formData.Contact)) {
      alert('Contact number must be exactly 10 digits');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/GroupReg/insertGroupreg', formData);
      alert(response.data.message);
      // Optionally, you can reset the form after successful submission
      setFormData({
        AssTitle: '',
        researcharea: '',
        batch: '',
        specialization: '',
        supervisor: '',
        cosupervisor: '',
        Leader: username,
        name: '',
        email: '',
        Contact: '',
        Member1: '',
        Member2: '',
        Member3: ''
      });
      // Reload the page
      navigate('/home');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const isUserInGroup = allGroups && allGroups.some(group => (
    group.Leader === username || group.Member1 === username || group.Member2 === username || group.Member3 === username
  ));


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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}></div>
      
      <div className='flex flex-col justify-center items-center mt-10'>
        <div className='flex justify-center items-center w-full'>
          {isUserInGroup ? (
            <div className="bg-white px-11 py-10 w-6/12 rounded-lg shadow-md backdrop-blur-md backdrop-filter bg-opacity-40">
              <h2 className="text-3xl font-bold mb-2 text-center">Your Group Details</h2>
              <ul className='text-xl mt-8'>
                {allGroups && allGroups.map(group => (
                  (group.Leader === username || group.Member1 === username || group.Member2 === username || group.Member3 === username) && (
                    <li key={group._id}>
                      <div className=' w-full'>
                      <div className=' grid grid-cols-2'>
                          <p>Group Name: </p>
                          <p>:{group.GroupName}</p> 
                      </div>
                    <div className="border-t border-gray-700 w-full opacity-40"></div>
                      <div className=' grid grid-cols-2'>
                          <p>Project Title: </p>
                          <p>:{group.AssTitle}</p>
                      </div>
                      <hr className='border-t border-gray-700 w-full opacity-40' ></hr>
                      <div className='grid grid-cols-2'>
                          <p>Research Area</p>
                          <p>:{group.researcharea}</p>
                      </div>
                      <hr className='border-t border-gray-700 w-full opacity-40' ></hr>
                      <div className='grid grid-cols-2'>
                          <p>Batch</p>
                          <p>:{group.batch}</p>
                      </div>
                      <hr className='border-t border-gray-700 w-full opacity-40' ></hr>
                      <div className='grid grid-cols-2'>
                          <p>Specialization</p>
                          <p>:{group.specialization}</p>
                      </div>
                      <hr className='border-t border-gray-700 w-full opacity-40' ></hr>
                      <div className='grid grid-cols-2'>
                          <p>Supervisor</p>
                          <p>:{group.supervisor}</p>
                      </div>
                      <hr className='border-t border-gray-700 w-full opacity-40' ></hr>
                      <div className='grid grid-cols-2'>
                          <p>Co-Supervisor</p>
                          <p>:{group.cosupervisor}</p>
                      </div>
                      <hr className='border-t border-gray-700 w-full opacity-40' ></hr>
                      <div className='grid grid-cols-2'>
                          <p>Leader</p>
                          <p>:{group.Leader}</p>
                      </div>
                      <hr className='border-t border-gray-700 w-full opacity-40' ></hr>
                      <div className='grid grid-cols-2'>
                          <p>Member 1</p>
                          <p>:{group.Member1}</p>
                      </div>
                      <hr className='border-t border-gray-700 w-full opacity-40' ></hr>
                      <div className='grid grid-cols-2'>
                          <p>Member 2</p>
                          <p>:{group.Member2}</p>
                      </div>
                      <hr className='border-t border-gray-700 w-full opacity-40' ></hr>
                      <div className='grid grid-cols-2'>
                          <p>Member 3</p>
                          <p>:{group.Member3}</p>
                      </div>
                      </div>

                    </li>
                  )
                ))}
              </ul>
            </div>
          ) : (
            
            <div className='bg-white px-11 py-10 w-8/12 rounded-lg shadow-md backdrop-blur-md backdrop-filter bg-opacity-20'>
              <h1 className='text-4xl font-bold text-white text-center mb-8'>Group Registration</h1>
              <h2 className='text-lg font-bold text-red-700 ml-5'>
              * Only leaders can register their groups.
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="AssTitle" className="text-lg font-bold text-gray-800 lg:w-32">Project Title:</label>
                  <input
                    type="text"
                    id="AssTitle"
                    name="AssTitle"
                    placeholder="Project Title"
                    value={formData.AssTitle}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="researcharea" className="text-lg font-bold text-gray-800 lg:w-32">Research Area:</label>
                  <select
                    // type="text"
                    id="researcharea"
                    name="researcharea"
                    placeholder="Research Area"
                    value={formData.researcharea}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Area</option>
                    <option value="KIC">KIC</option>
                    <option value="ML">ML</option>
                    <option value="SIS">SIS</option>
                  </select>
                </div>
              </div>
          
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="batch" className="text-lg font-bold text-gray-800 lg:w-32">Batch:</label>
                  <select
                    id="batch"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Batch</option>
                    <option value="Regular">Regular</option>
                    <option value="June">June</option>
                  </select>
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="specialization" className="text-lg font-bold text-gray-800 lg:w-32">Specialization:</label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Specialization</option>
                    <option value="IT">IT</option>
                    <option value="DS">DS</option>
                    <option value="SE">SE</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className=" items-center lg:w-1/2">
                <label htmlFor="supervisor" className="text-lg font-bold text-gray-800 lg:w-32">Supervisor:</label>
                <select 
                  id="supervisor"
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Supervisor</option>
                  {users && users.map(user => (
                    user.role === 'Supervisor' && (
                      <option key={user._id} value={user.username}>{user.username}</option>
                    )
                  ))}
                </select>
              </div>

              <div className=" items-center lg:w-1/2">
                <label htmlFor="cosupervisor" className="text-lg font-bold text-gray-800 lg:w-32">Co-Supervisor:</label>
                <select
                  id="cosupervisor"
                  name="cosupervisor"
                  value={formData.cosupervisor}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Co-Supervisor</option>
                  {users && users.map(user => (
                    user.role === 'Co-Supervisor' && (
                      <option key={user._id} value={user.username}>{user.username}</option>
                    )
                  ))}
                </select>
              </div>
            </div>

              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="Leader" className="text-lg font-bold text-gray-800 lg:w-32">IT Number of the Leader:</label>
                  <input
                    type="text"
                    id="Leader"
                    name="Leader"
                    placeholder="Leader"
                    value={formData.Leader}
                    disabled // Make it disabled
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="name" className="text-lg font-bold text-gray-800 lg:w-32">Name of the Leader:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
          
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="email" className="text-lg font-bold text-gray-800 lg:w-32">Email of the Leader:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    disabled 
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="Contact" className="text-lg font-bold text-gray-800 lg:w-32">Contact number of the Leader:</label>
                  <input
                    type="text"
                    id="Contact"
                    name="Contact"
                    placeholder="07XXXXXXXX"
                    value={formData.Contact}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
          
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="Member1" className="text-lg font-bold text-gray-800 lg:w-32">Member 1 IT Number:</label>
                  <input
                    type="text"
                    id="Member1"
                    name="Member1"
                    placeholder="Member 1"
                    value={formData.Member1}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="Member2" className="text-lg font-bold text-gray-800 lg:w-32">Member 2 IT Number:</label>
                  <input
                    type="text"
                    id="Member2"
                    name="Member2"
                    placeholder="Member 2"
                    value={formData.Member2}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
          
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="Member3" className="text-lg font-bold text-gray-800 lg:w-32">Member 3 IT Number:</label>
                  <input
                    type="text"
                    id="Member3"
                    name="Member3"
                    placeholder="Member 3"
                    value={formData.Member3}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
          
<button type="submit" className="w-52 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 mx-auto block">Submit</button>            </form>
          </div>
          
          )}
        </div>
      </div>

      
    </div>
  );
};

export default Registration;
