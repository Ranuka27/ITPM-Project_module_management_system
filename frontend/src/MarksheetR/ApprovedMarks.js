import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewMarksheet.css'; // Import CSS for styling
import background from '../Images/background4.jpg'; 

export default function ViewMarksheet() {
  const [details, setDetails] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDetails, setFilteredDetails] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/reportMarksheet/alldetails');
        const data = await response.json();
        console.log(data);
        setDetails(data);
        setFilteredDetails(data); // Initialize filtered details with all details
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:8081/reportMarksheet/all');
        console.log(response.data);
        setAllAssignments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignments();
  }, []);

  // Function to filter details based on search query
  
const filterDetails = () => {
  if (!searchQuery.trim()) {
    // If search query is empty, display all details
    setFilteredDetails(details);
  } else {
    // Filter details based on search query
    const filtered = details.filter(detail =>
      (detail.GroupName && detail.GroupName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (allAssignments.find(assignment => assignment.assID === detail.assID)?.title && allAssignments.find(assignment => assignment.assID === detail.assID)?.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredDetails(filtered);
  }
};

// handleback to previous page
const navigate = useNavigate();
const handleBack = () => {
    navigate(-1);
}

    


  // Update filtered details when search query changes
  useEffect(() => {
    filterDetails();
  }, [searchQuery, details, allAssignments]);

  // Event handler for search bar input change
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:8081/reportMarksheet/marksheetApprovel/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Approved');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className='justify-center items-center min-h-screen' style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>

        <div className=' text-white w-full mb-3' >
          <h1 className='text-3xl text-center'>Approved Marksheet</h1>
        </div>

        <div className='flex flex-row'>
        <div className='w-full'>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Group ID or Assignment Title"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="ml-3 mb-3 p-2 w-1/5 text-center rounded-lg bg-gray-300 placeholder-gray-500"
          />
        </div>

        <div className='ml-auto w-24 '>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-1' onClick={handleBack}>
            Back
          </button>
        </div>
        </div>
        

        <div className="view-marksheet-container">
          {filteredDetails.map((detail, index) => (
            detail.status === '1' && (
              <div key={index} className="detail-container">
                <div className="detail-header">
                  <h2> Group ID: {detail.GroupName}</h2>
                  <h3> Assignment Title: {allAssignments.find(assignment => assignment.assID === detail.assID)?.title}</h3>
                  <button
                    className={`approve-button ${detail.status === '1' ? 'approved' : 'not-approved'}`}
                    onClick={() => handleApprove(detail._id)}
                    disabled={detail.status === '1'}
                  >
                    Approve
                  </button>
                </div>
                <table className="marks-table border-collapse border-2 border-gray-500">
                  <thead>
                    <tr>
                      <th className="border-2 border-gray-500">ITNumber</th>
                      <th className="border-2 border-gray-500">Criteria</th>
                      <th className="border-2 border-gray-500">AddMarks</th>
                      <th className="border-2 border-gray-500">RealMarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.Student.map((student, i) => (
                      <tr key={i}>
                        <td className="border-2 border-gray-500">{student.ITNumber}</td>
                        <td className="border-2 border-gray-500">{student.criteria.map((item, index) => <div key={index}>{item}</div>)}</td>
                        <td className="border-2 border-gray-500">{student.AddMarks.map((item, index) => <div key={index}>{item}</div>)}</td>
                        <td className="border-2 border-gray-500">{student.RealMarks.map((item, index) => <div key={index}>{item}</div>)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )))}
        </div>
      </div>
    </>
  );
}
