import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import background from '../Images/Presentations.jpg';
import { Link } from 'react-router-dom';


export default function AssDetails() {
    const { id } = useParams();
    const [criteria, setCriteria] = React.useState([]);
    const [assignment, setAssignment] = React.useState([]);
    const [role,setrole] = React.useState('');
    const [Email, setEmail] = React.useState('');

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
                const response = await fetch(`http://localhost:8081/getC/${id}`);
                const data = await response.json();
                setCriteria(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    React.useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await fetch(`http://localhost:8081/all/${id}`);
                const data = await response.json();
                setAssignment(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAssignment();
    }
    , [id]);

    const navigate = useNavigate();

    const handleback = () => {  
        navigate(-1);
    }

   
    return (
        <>
        <div className='justify-center items-center min-h-screen' style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${background})`,
                    backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        
        <br/>
            <h1 className='text-center text-4xl  text-white'>Details of the assignment</h1>

        <div className='flex flex-row justify-end'>

            
            {/* <button className='w-[150px] border-white border 1px bg-black h-[50px] mr-3 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#4c4d4c] before:to-[rgb(199,247,220)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'
            onClick={handleback}
            >Back</button> */}

            {role !== 'user' && (
            <a href ={`/editAss/${assignment.assID}`}>
            <button className='w-[150px] bg-black h-[50px] mr-3 border-white border 1px my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#7c7c7c] before:to-[rgb(69,80,240)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'
            >Update Assignmet</button>
            </a>
            )}

            {role !== 'user' && (
            <Link to={`/updateCriteria/${assignment.assID}`}>
                <button className='w-[150px] bg-black h-[50px] border-white border 1px mr-3 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#4c4d4c] before:to-[rgb(45,54,182)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>Update Criterias</button>
                </Link>
            )}
       

        </div>

        <div className='flex flex-row text-white text-lg'>
        <div className=' w-72 ml-3'>
        <div className=' grid grid-cols-2'>
            <p>Assignment ID </p>
            <p>:{assignment.assID}</p> 
        </div>
        <div className=' grid grid-cols-2'>
            <p>Assignment Title </p>
            <p>:{assignment.title}</p>
        </div>
        <div className='grid grid-cols-2'>
            <p>Assignment PDF</p>
            <a href={`http://localhost:8081/${assignment.pdf}`} target="_blank" rel="noopener noreferrer">
                <button className=' text-blue-500 hover:text-blue-800 underline'>:Download PDF</button>
            </a>
            </div>
        </div>

       
            
        </div>

        <div className='text-center text-3xl mt-3 text-white'>
            Criteria Details
        </div>

        <div className='flex justify-center mt-4'>
         
      <table className='border-2 border-gray-400 w-1/2 mx-auto opacity-80'>
    <thead className="bg-gray-800 text-gray-200">
        <tr>
            <th className='border-2 p-3 border-gray-400'>Criteria</th>
            <th className='border-2 p-3 border-gray-400'>Marks</th>
        </tr>
    </thead>
    <tbody className="bg-gray-700 text-gray-200">
        {criteria.length > 0 && criteria[0].criteria.map((criterion, index) => (
            <tr key={index} className="hover:bg-gray-600">
                <td className='border-2 p-3 border-gray-400'>{criterion}</td>
                <td className='border-2 p-3 border-gray-400'>{criteria[0].marks[index]}</td>
            </tr>
        ))}
    </tbody>
</table>

         </div>
        </div>
        </>

    );
}