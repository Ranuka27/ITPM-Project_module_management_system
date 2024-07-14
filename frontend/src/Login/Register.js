import React, { useState } from 'react';
import { register } from '../UserFunction/Login';
import background from '../Images/User.jpg';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [xfile, setXFile] = useState([]); 
  const navigate = useNavigate();


  const autogenpassword = () => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { raw: false });
      const formattedData = json.map((item) => ({
        ...item,
        //auto generate
        password: autogenpassword(),
        
    }));
      setXFile(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const res = await register({ username, email, password, role });

      if (res) {
        alert(res.data.message);
        window.location.reload();
      } else {
        alert('Register failed');
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('An error occurred during register');
    }
  };

const handleSubmitExcel = async (e) => {
  e.preventDefault();

  let isErrorOccurred = false;

    for (let user of xfile) {
      try {
        const registerResponse = await register(user);

        if (registerResponse) {
          // alert(registerResponse.data.message);
        } else {
          alert('Register failed');
          isErrorOccurred = true;
        }
      } catch (error) {
        console.error('Register error:', error);
        alert('An error occurred during register');
        isErrorOccurred = true;
      }

      if (!isErrorOccurred) {
        try {
          const emailResponse = await axios.post('http://localhost:8081/sendEmail', { email: user.email, password: user.password });
          console.log(emailResponse);
          // alert(emailResponse.data.message);
        } catch (error) {
          console.error('Email sending error:', error);
          alert('An error occurred during email sending');
          isErrorOccurred = true;
        }
      }
    }

    if (!isErrorOccurred) {
      alert('All users processed successfully');
      navigate('/home');
    }

  console.log(xfile);
};
 
  return (
    <>
      <div 
        className='justify-center items-center h-screen'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
        }}
      ><br/>
        <div>
          <h2 className=' flex justify-center text-4xl ml-10 text-white font-bold' style={{ textShadow: '1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000' }}>
            User Registration
          </h2>

          <div className='flex items-center justify-center mt-10'>
            <div className='bg-white p-10 rounded-lg shadow-md w-96 backdrop-blur-md backdrop-filter bg-opacity-20'>
              <form onSubmit={handleRegister} >
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-bold mb-2">Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-bold mb-2">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-bold mb-2">Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-bold mb-2">Role:</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a role</option>
                    <option value="Admin">Admin</option>
                    <option value="Project Coordinator">Project Coordinator</option>
                    <option value="Examiner">Examiner</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Supervisor">Co-Supervisor</option>
                  </select>
                </div>
                <div className='flex items-center justify-center'>
                  <button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitExcel} className=''> 
          <div className="flex items-center justify-center mt-5">
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Select a file
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          </div>    

          <div className='flex items-center justify-center mt-2 mb-4'>
            <button type="submit" 
              className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>

          {xfile?.length > 0 && (
            <table className='text-sm text-gray-400 w-full bg-[rgba(255,255,255,0.1)] border border-gray-300 backdrop-blur-md'>
              <thead>
                <tr>
                  {Object.keys(xfile[0]).map((key) => key !== 'password' ? <th key={key} className='border border-gray-300 px-4 py-2'>{key}</th> : null)}
                </tr>
              </thead>
              <tbody>
                {xfile.map((item, index) => (
                  <tr key={index}>
                    {Object.keys(item).map((key) => key !== 'password' ? <td key={key} className='border border-gray-300 px-4 py-2'>{item[key]}</td> : null)}
                  </tr>
                ))}
              </tbody>
            </table>
)}
        </form>
      </div>
    </>
  );
}
