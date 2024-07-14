import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../Images/Presentations.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Insertass() {
  const [assup, setAssup] = React.useState([]);
  const [assID, setAssID] = React.useState('');
  const [criteria, setCriteria] = React.useState([]);
  const [showDetails, setShowDetails] = React.useState(false);
  const [Email, setEmail] = React.useState('');
  const [assignments, setAssignments] = React.useState([]);
    const [role,setrole] = React.useState('');

    const navigate = useNavigate();

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/all');
        const data = await response.json();
        setAssup(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data immediately on component mount

    const intervalId = setInterval(fetchData, 1000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
}, []);


const handleDelete = (assID) => {
   
  axios.delete(`http://localhost:8081/delete/${assID}`)
    .then((res) => {
      // Assuming 'assignments' is the state variable holding the list
      const updatedAssignments = assignments.filter(assignment => assignment.id !== assID);
      setAssignments(updatedAssignments); // Update the state to reflect the deletion

      // Notify the user
      alert('Assignment deleted successfully');
    })
    .catch((err) => {
      // Handle any errors that occur during the deletion
      console.error("Error deleting the assignment:", err);
      alert('Failed to delete the assignment');
    });
};


    const handleback = () => {
      navigate (-1);
    }

    const totalWeightage = assup.reduce((acc, curr) => acc + curr.weightage, 0);


  return (
    <>
    <div className='justify-center items-center h-screen' style={{
                    backgroundImage: `linear-gradient(rgba(25, 25, 0, 0.11), rgba(25, 25, 0, 0.11)), url(${background})`,
                    backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>

        <br/>
      <h1 className='text-center text-3xl text-white'>Assignments</h1>

      <div className='flex justify-end'>
         
          <div>
          {role !== 'user' && (
            <a href='AssInsert'>
            <button className={`w-[150px] bg-black h-[50px] my-3 mr-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff] ${totalWeightage === 100 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={totalWeightage === 100}>
                Add Assignment
            </button>
        </a>
          )}
          </div>

          {/* <div>
          <button className='w-[150px] bg-black h-[50px] mr-3 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#4c4d4c] before:to-[rgb(199,247,220)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]' onClick={handleback}>Back</button>

          </div> */}
        </div>

        {role !== 'user' && (
      <div className='flex justify-end mr-10 mt-2 text-orange-500'>
        Total Marks: {assup.reduce((acc, curr) => acc + curr.weightage, 0)}
      </div>
        )}

    <div className='flex justify-center mt-4'>
      <div className=" flex justify-center bg-none p-2 rounded-lg shadow-md  backdrop-blur-md backdrop-filter bg-opacity-20 text-center">
      <table className="border-collapse border-2 border-gray-500 mt-3 mb-3 text-gray-200 w-full">
  <thead className="bg-gray-900 opacity-40 text-white">
    <tr>
      <th className="border-2 p-3 border-gray-400 ">Assignment ID</th>
      <th className="border-2 p-3 border-gray-400">Title</th>
      <th className="border-2 p-3 border-gray-400">Description</th>
      <th className="border-2 p-3 border-gray-400">Total marks out of 100</th>
      <th className="border-2 p-3 border-gray-400"></th>
      <th className="border-2 p-3 border-gray-400"></th>
    </tr>
  </thead>
  <tbody className=' opacity-80'>
    {assup.map((ass) => (
      <tr key={ass._id} className="bg-gray-700 hover:bg-gray-600">
        <td className="border-2 p-3 border-gray-400">{ass.assID}</td>
        <td className="border-2 p-3 border-gray-400 w-72">{ass.title}</td>
        <td className="border-2 p-3 border-gray-400 w-72">{ass.description}</td>
        <td className="border-2 p-3 border-gray-400 w-72">{ass.weightage}</td>
        <td className="border-2 p-3 border-gray-400">
          <a href={`http://localhost:8081/${ass.pdf}`} target="_blank" rel="noopener noreferrer">
            <button className='bg-gray-500 hover:bg-gray-700 p-2 rounded-lg text-sm'> Download PDF</button>
          </a>
        </td>
        <td className="border-2 p-3 border-gray-400">
          <a href={`/assdetails/${ass.assID}`}>
            <button className='bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-sm'>
              View Details
            </button>
          </a>
          {role !== 'user' && (
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-1'
            onClick={() => handleDelete(ass.assID)} // Assuming 'assID' is available in your component
          >
            Delete
          </button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
        </div>
      </div>
      
    </>
  );
}
