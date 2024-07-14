import React, { useEffect, useState } from 'react';
import axios from 'axios';
import background from '../Images/enmarks.jpg';

const Marksheet = () => {
  const [criteria, setCriteria] = useState(null);
  const [AssID, setAssID] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [existingMarks, setExistingMarks] = useState([]);
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
    ]
  });

  useEffect(() => {
    const fetchExistingMarks = async () => {
        try {
            // Fetch existing marks for the selected assignment
            if (formData.assID) {
                const response = await axios.get(`http://localhost:8081/reportMarksheet/getMarks/${formData.assID}`);
                setExistingMarks(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchExistingMarks();
}, [formData.assID]);

  const getCriteriaAssID = async (assID) => {
    try {
      const response = await axios.get(`http://localhost:8081/getC/${assID}`);
      console.log(response.data);
      setCriteria(response.data); // Set criteria from the response
    } catch (error) {
      console.error(error);
    }
  };

  const getAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:8081/all');
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
      const response = await axios.post('http://localhost:8081/insertMarksheet', formData);
      alert('Successfuly insert the data');
      setFormData({
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
    ]
      });

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

        <br/>
        <div className='text-center text-4xl mb-3 font-bold text-gray-200'>Enter Marks for Presentations</div>
        <br/>
        <div className='flex justify-center'>
          <div className='px-11 py-10 w-9/12 rounded-lg bg-gray-800 p-8 mt-8 shadow-md w-fit text-white'>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className='flex items-center space-x-2'>
                <label className='text-xl w-40 text-white'>Assignment ID</label>
                <select
                  name="assID"
                  value={formData.assID}
                  onChange={(e) => {
                    const selectedAssID = e.target.value;
                    setFormData({ ...formData, assID: selectedAssID });
                    getCriteriaAssID(selectedAssID);
                  }}
                  required
                  className="flex-grow border-2 border-gray-300 p-2 rounded-md text-gray-800"
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
                <label className='text-xl w-40'>Group Number</label>
                <select
                  name="GroupName"
                  value={formData.GroupName}
                  onChange={(e) => {
                    const selectedGroupName = e.target.value;
                    setFormData({ ...formData, GroupName: selectedGroupName });
                    handleGroupChange(selectedGroupName);
                  }}
                  required
                  className="flex-grow border-2 border-gray-300 p-2 rounded-md text-gray-800"
                >
                  <option value=''>Select Group</option>
                  {allGroups.map((group) => (
                            <option 
                            key={group._id} 
                            value={group.GroupName} 
                            disabled={existingMarks.some(mark => mark.GroupName === group.GroupName)}
                        >
                            {group.GroupName}
                        </option>
                  ))}
                </select>
              </div>

              <table className="w-full border-collapse border-gray-800">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">IT Number</th>
          {criteria && criteria[0].criteria.map((criterion, index) => (
            <th key={index} className="border border-gray-300 px-4 py-2">{criterion}</th>
          ))}
          <th className="border border-gray-300 px-4 py-2">Feedback</th>
        </tr>
      </thead>
      <tbody>
  {formData.Student.map((student, studentIndex) => (
    <tr key={studentIndex}>
      <td className="border border-gray-300 text-gray-700 px-4 py-2">
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
        <td key={index} className="border border-gray-300 text-gray-700 px-4 py-2">
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
      {/* Render text input field for Feedback criteria */}
      <td className="border border-gray-300 text-gray-700 px-4 py-2">
        <input
          type='text'
          value={student.Feedback || ''}
          onChange={(e) => {
            const newStudentData = [...formData.Student];
            newStudentData[studentIndex].Feedback = e.target.value;
            setFormData({ ...formData, Student: newStudentData });
          }}
          placeholder='Feedback'
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </td>
    </tr>
  ))}
</tbody>

    </table>

              <div className='flex items-center justify-center'>
                <button type='submit' className="bg-cyan-400 hover:bg-cyan-500 px-10 py-2 text-white font-bold rounded-md">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marksheet;
