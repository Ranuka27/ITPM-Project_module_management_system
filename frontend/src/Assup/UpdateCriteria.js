import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import background from '../Images/Presentations.jpg';


const UpdateCriteria = () => {
    const { assID } = useParams();
    const [criteria, setCriteria] = useState([]);
    const navigate = useNavigate();

    const handleback = () => {
        navigate(-1);
    };

    // useEffect(() => {
    //     const fetchCriteria = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8081/getC/${assID}`);
    //             setCriteria(response.data);
    //         } catch (error) {
    //             console.error('Error fetching criteria:', error);
    //         }
    //     };
    //     fetchCriteria();
    // }, [assID]);

    const handleAddCriteria = () => {
        setCriteria([...criteria, { criteria: '', marks: '' }]);
    };

    const handleUpdateCriteria = async (e) => {
        e.preventDefault();
        try {
            const criteriaToSend = criteria.map(item => item.criteria);
            const marksToSend = criteria.map(item => parseInt(item.marks));

            await axios.patch('http://localhost:8081/updateCriteria', { assID, criteria: criteriaToSend, marks: marksToSend });
            alert('Criteria updated successfully');
            navigate('/insertAss');
        } catch (error) {
            console.error('Error updating criteria:', error);
            alert(error.response.data.message)
        }
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCriteria = [...criteria];
        updatedCriteria[index][name] = value;
        setCriteria(updatedCriteria);
    };

    return (
        <>
    <div className='justify-center items-center min-h-screen' style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${background})`,
                backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }}>

    <br/>
        <div>
            <div className='text-4xl text-white text-center'>
                Update Criteria
            </div> <br/>
            {/* <div className='flex justify-end'>
            <button onClick={handleback} className='w-[150px] border-white border 1px bg-black h-[50px] mr-3 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#4c4d4c] before:to-[rgb(199,247,220)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>
        Back
      </button>  
            </div> */}

            <div className='flex justify-center items-center'>
           <form onSubmit={handleUpdateCriteria} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 items-center justify-center">
  <table className="table-auto w-5/6">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Criteria</th>
        <th className="py-3 px-6 text-left">Marks</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {criteria.length > 0 && criteria.map((criterion, index) => (
        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">
            <input
              type='text'
              name='criteria'
              value={criterion.criteria}
              onChange={(e) => handleChange(index, e)}
              className="px-2 py-1 rounded-lg border-2 border-gray-300"
            />
          </td>
          <td className="py-3 px-6 text-left">
            <input
              type='number'
              name='marks'
              value={criterion.marks}
              onChange={(e) => handleChange(index, e)}
              className="px-2 py-1 rounded-lg border-2 border-gray-300"
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="flex items-center justify-center mt-6">
    <button type="button" onClick={handleAddCriteria} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Add Criteria
    </button>
    <button type="submit" className='bg-blue-500 hover:bg-blue-700 ml-5 text-white font-bold py-2 px-4 rounded'>
      Update Criteria
    </button>

  </div>
</form>
</div>
        </div>
        </div>
        </>
    );
};

export default UpdateCriteria;
