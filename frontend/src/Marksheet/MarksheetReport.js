import React, { useEffect, useState } from 'react';
import axios from 'axios';
import background from '../Images/enmarks.jpg';

const MarksheetReport = () => {
  const [criteria, setCriteria] = useState(null);
  const [AssID, setAssID] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [formData, setFormData] = useState({
    assID: '',
    GroupName: '',
    Student: [
      {
        ITNumber: '',
        criteria: [],
        AddMarks: []
      },
      {
        ITNumber: '',
        criteria: [],
        AddMarks: []
      },
      {
        ITNumber: '',
        criteria: [],
        AddMarks: []
      },
      {
        ITNumber: '',
        criteria: [],
        AddMarks: []
      }
    ],
    feedback: ''
  });

  const getCriteriaAssID = async (assID) => {
    try {
      const response = await axios.get(`http://localhost:8081/reportCriteria/getC/${assID}`);
      console.log(response.data);
      setCriteria(response.data); // Set criteria from the response
    } catch (error) {
      console.error(error);
    }
  };

  const getAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:8081/reportass/all');
      console.log(response.data);
      setAssID(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAssignments();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/reportMarksheet/insertMarksheet', formData);
      alert('Successfuly insert the data');
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const handleGroupChange = async (groupName) => {
    try {
      const response = await axios.get(`http://localhost:8081/GroupReg/getGroupregByName/${groupName}`);
      const groupData = response.data;
      console.log(groupData);
       
      const ITNumbers = [groupData.Leader, groupData.Member1, groupData.Member2, groupData.Member3];
      const students = ITNumbers.map((ITNumber) => ({
        ITNumber,
        criteria: criteria && criteria[0].criteria,
        AddMarks: criteria && criteria[0].criteria.map(() => '')
      }));

      setFormData({ ...formData, Student: students , GroupName: groupName});
     
    } catch (error) {
      console.error(error);
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
        <div className='text-center text-4xl mb-3 text-white'>Enter Marks for Reports</div>

        <div className='flex justify-center'>
          <div className='bg-white px-11 py-10 w-9/12 rounded-lg shadow-md backdrop-blur-md backdrop-filter bg-opacity-20'>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className='flex items-center space-x-2'>
                <label className='text-xl w-40'>Assignment ID</label>
                <select
                  name="assID"
                  value={formData.assID}
                  onChange={(e) => {
                    const selectedAssID = e.target.value;
                    setFormData({ ...formData, assID: selectedAssID });
                    getCriteriaAssID(selectedAssID);
                  }}
                  required
                  className="flex-grow border-2 border-gray-300 p-2 rounded-md"
                >
                  <option value=''>Select Assignment</option>
                  {AssID.map((assignment) => (
                    <option key={assignment.assID} value={assignment.assID}>
                      {assignment.title} {assignment.assID}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex items-center space-x-2'>
                <label className='text-xl w-40'>Group Name</label>
                <select
                  name="GroupName"
                  value={formData.GroupName}
                  onChange={(e) => {
                    const selectedGroupName = e.target.value;
                    setFormData({ ...formData, GroupName: selectedGroupName });
                    handleGroupChange(selectedGroupName);
                  }}
                  required
                  className="flex-grow border-2 border-gray-300 p-2 rounded-md"
                >
                  <option value=''>Select Group</option>
                  {allGroups.map((group) => (
                    <option key={group._id} value={group.GroupName}>
                      {group.GroupName}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex items-center space-x-2 mt-4'>
                <label className='text-xl w-40'>Feedback</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  required
                  className="flex-grow border-2 border-gray-300 p-2 rounded-md"
                  
                ></textarea>
              </div>

              <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">IT Number</th>
          {criteria && criteria[0].criteria.map((criterion, index) => (
            <th key={index} className="border border-gray-300 px-4 py-2">{criterion}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {formData.Student.map((student, studentIndex) => (
          <tr key={studentIndex}>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type='text'
                value={student.ITNumber}
                onChange={(e) => {
                  const newStudentData = [...formData.Student];
                  newStudentData[studentIndex].ITNumber = e.target.value;
                  setFormData({ ...formData, Student: newStudentData });
                }}
                placeholder='IT Number'
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </td>
            {criteria && criteria[0].criteria.map((_, index) => (
              <td key={index} className="border border-gray-300 px-4 py-2">
                <input
                  type='number'
                  value={student.AddMarks[index] || ''}
                  onChange={(e) => {
                    const newStudentData = [...formData.Student];
                    newStudentData[studentIndex].AddMarks[index] = e.target.value;
                    setFormData({ ...formData, Student: newStudentData });
                  }}
                  placeholder={`Marks for ${criteria[0].criteria[index]}`}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

              <div className='flex items-center justify-center'>
                <button type='submit' className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarksheetReport;
