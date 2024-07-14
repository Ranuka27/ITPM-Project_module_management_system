import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CriteriaForm({ assID }) {
    const [criteria, setCriteria] = useState([{ criteria: '', marks: '' }]);

    const navigate = useNavigate();

    const handleAddCriteria = () => {
        setCriteria([...criteria, { criteria: '', marks: '' }]);
    };

    const handleCriteriaChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCriteria = [...criteria];
        updatedCriteria[index][name] = value;
        setCriteria(updatedCriteria);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Extracting only criteria and marks from the state
            const criteriaToSend = criteria.map(item => item.criteria);
            const marksToSend = criteria.map(item => parseInt(item.marks)); // Convert marks to integers
              
            // Send data to the server
            await axios.post('http://localhost:8081/insertCriteria', { assID, criteria: criteriaToSend, marks: marksToSend }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Criteria inserted successfully');
            navigate('/insertAss');
            // Optionally, you can reset the criteria state after successful submission
            setCriteria([{ criteria: '', marks: '' }]);
        } catch (error) {
             alert(error.response.data.message)
        }
    };
    

    return (
        <>
        <div className='flex items-center justify-center'>
        <div className='justify-center bg-white px-10  rounded-lg shadow-md  backdrop-blur-md backdrop-filter bg-opacity-20 text-center mt-3'>
            <form onSubmit={handleSubmit}>
             <label className='text-white text-xl'>Assignment ID:</label> &emsp;
                <input
                    type='text'
                    name='assID'
                    value={assID}
                    className='border-2 border-gray-400 p-2 m-2'
                />
                {/* Display criteria fields */}
                {criteria.map((criterion, index) => (
                    <div key={index}>
                        <input
                            type='text'
                            name='criteria'
                            value={criterion.criteria}
                            onChange={(e) => handleCriteriaChange(index, e)}
                            placeholder='Criteria'
                            className='border-2 border-gray-400 p-2 m-2'
                        />
                        <input
                            type='number'
                            name='marks'
                            value={criterion.marks}
                            onChange={(e) => handleCriteriaChange(index, e)}
                            placeholder='Marks'
                            className='border-2 border-gray-400 p-2 m-2'
                        />
                    </div>
                ))}

                

            <button type="button" onClick={handleAddCriteria} className='bg-blue-500 hover:bg-blue-700 p-2 rounded-lg m-2'>
                Add Criteria
            </button>
                 
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 p-2 rounded-lg m-2'>
                    Submit Criteria
                </button>
            </form>

            <label className='text-white text-xl mb-3'>* You can add multiple criteria by clicking the "Add Criteria" button <br></br>
            <span className='text-red-800'>* The total marks should be 100</span></label>
            
           
            
        </div>
        </div>
        </>
    );
}
