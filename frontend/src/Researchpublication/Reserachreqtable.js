import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../Images/background4.jpg';
import { CSVLink } from 'react-csv';

const ResearchRequest = () => {
  const [researchRequests, setResearchRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchResearchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8081/researchreq');
        setResearchRequests(response.data);
      } catch (error) {
        console.error('Error fetching research requests:', error);
      }
    };

    fetchResearchRequests();
  }, []);

  const filteredResearchRequests = researchRequests.filter(request => {
    const searchFields = [
      request.title,
     
      request.cosupervisor,
      request.supervisor
     
    ];
    return searchFields.some(field =>
      field && field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleStatusChange = async (e, requestId) => {
    const newStatus = e.target.value;
    try {
      await axios.put(`http://localhost:8081/researchreq/${requestId}`, { status: newStatus });
      // Update the local state
      setResearchRequests(prevState =>
        prevState.map(request =>
          request._id === requestId ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Define CSV data
  const csvData = filteredResearchRequests.map(request => ({
    Title: request.title,
    'Student 1': request.student1,
    'Student 2': request.student2,
    'Student 3': request.student3,
    'Student 4': request.student4,
    Supervisor: request.supervisor,
    'Co-Supervisor': request.cosupervisor,
    'Conference Name': request.conferencename,
    ISSN: request.issn,
    'Google Scholar Link': request.googlescholarlink,
    'Scopus Link': request.scopuslink,
    Payment: request.payment,
    'Registration PDF': request.registrationpdf,
    Status: request.status
  }));

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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}></div>
      <h1 className='text-4xl font-bold text-white text-center mb-8'>Research Publication Requests</h1>
      <div className='mt-3'>
        <input
          type="text"
          placeholder="Search by title, students, supervisor, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-5/12 p-2 ml-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className='mt-3 flex justify-center'>
        <table className="divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student 1</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student 2</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student 3</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student 4</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Co-Supervisor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conference Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISSN</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Google Scholar Link</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scopus Link</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration PDF</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResearchRequests.map(request => (
              <tr key={request._id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.student1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.student2}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.student3}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.student4}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.supervisor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.cosupervisor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.conferencename}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.issn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.googlescholarlink}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.scopuslink}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.payment}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.registrationpdf}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(e, request._id)}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <CSVLink
          data={csvData}
          filename={"research_requests.csv"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export to CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default ResearchRequest;
