import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import background from '../Images/Reports.jpg';

export default function ReportDetails() {
    const { id } = useParams(); 
    const [report, setReport] = React.useState([]); // Initialize as null or {}
    const [reportCriteria, setReportCriteria] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/reportass/all/${id}`);
                const data = await response.json();
                setReport(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    React.useEffect(() => {
        const fetchReportCriteria = async () => {
            try {
                const response = await fetch(`http://localhost:8081/reportCriteria/getC/${id}`);
                const data = await response.json();
                setReportCriteria(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchReportCriteria();
    }, [id]);

    const navigate = useNavigate();

    const handleback = () => {
        navigate(-1);
    };

    return (
        <>
        <div className='justify-center items-center min-h-screen' style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div>
            {/* Check if report is not null before accessing its properties */}
            <h1 className='text-center text-4xl text-white'>Details of the {report ? report.title : 'Loading...'}</h1>
        </div>

        <div className='flex justify-end'>
        <button className=' border 1px w-[150px] bg-black h-[50px] mr-3 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#4c4d4c] before:to-[rgb(199,247,220)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]' onClick={handleback}>Back</button>

        </div>

        {report && ( // Only render this section if report is not null
        <div className='flex flex-row text-white'>
            <div className=' w-72 ml-3'>
                <div className=' grid grid-cols-2'>
                    <p>report ID </p>
                    <p>:{report.assID}</p> 
                </div>
                <div className=' grid grid-cols-2'>
                    <p>report Title </p>
                    <p>:{report.title}</p>
                </div>
                <div className='grid grid-cols-2'>
                    <p>report PDF</p>
                    <a href={`http://localhost:8081/${report.pdf}`} target="_blank" rel="noopener noreferrer">
                        <button className=' text-blue-500 hover:text-blue-800 underline'>:Download PDF</button>
                    </a>
                </div>
            </div>
 
        </div>
        )}

        <div className='text-center text-3xl mt-3 text-white'>
            Criterias
        </div>

        <div className='flex justify-center mt-4'>
      <div className=" flex justify-center bg-white px-10 py-5 w-fit rounded-lg shadow-md  backdrop-blur-md backdrop-filter bg-opacity-20 text-center">
        
        <table className='border-2 border-gray-400  mx-auto'>
            <thead>
                <tr>
                    <th className='border-2 p-3 border-gray-400'>Criteria</th>
                    <th className='border-2 p-3 border-gray-400'>Marks</th>
                </tr>
            </thead>

           <tbody>
  {reportCriteria.map((criteria) => (
    criteria.criteria.map((criterion, index) => (
      <tr key={`${criteria._id}-${index}`}>
        <td className='border-2 p-3 border-gray-400'>{criterion}</td>
        <td className='border-2 p-3 border-gray-400'>{criteria.marks[index]}</td>
      </tr>
    ))
  ))}
</tbody>

        </table>
        </div>
        </div>
        </div>
        </>
    );
}