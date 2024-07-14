import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../Images/Reports.jpg';

export default function Reports() {
    const [report, setReport] = React.useState([]);
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');

    const navigate = useNavigate();

    const handleback = () => {
        navigate(-1);
    };

    React.useEffect(() => {
        const Token = localStorage.getItem('token');

        if (Token) {
            const payloadPart = Token.split('.')[1];
            const payload = JSON.parse(atob(payloadPart));
            const username = payload.email;
            const role = payload.role;

            console.log(username);
            setEmail(username);
            setRole(role);
        }
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8081/reportass/all');
                const data = await response.json();
                setReport(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Fetch data immediately on component mount

        const intervalId = setInterval(fetchData, 1000); // Fetch data every 5 seconds

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

  return (
    <>
    <div className='justify-center items-center h-screen' style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
    <div>
        
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header text-center text-white text-3xl">
                <h4>Reports</h4>
              </div>

              <div className='flex justify-end'>
                <div>
                {role !== 'user' && (
              <a href='/insertReport'>
            <button className=' border 1px w-[150px] bg-black h-[50px] my-3 mr-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>
              Add Report</button>
            </a>
                )}
                </div>
                <div>
          <button className=' border 1px w-[150px] bg-black h-[50px] mr-3 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#4c4d4c] before:to-[rgb(199,247,220)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]' onClick={handleback}>Back</button>

          </div>
              </div>
              <div className='flex justify-center mt-4'>
      <div className=" flex justify-center bg-white px-10  rounded-lg shadow-md  backdrop-blur-md backdrop-filter bg-opacity-20 text-center">
        <table className="border-collapse border-2 border-gray-500 mt-3 mb-3 text-gray-200">
          <thead>
                    <tr>
                      <th className="border-2 p-3 border-gray-400">Assessment ID</th>
                      <th className="border-2 p-3 border-gray-400">Title</th>
                      <th className="border-2 p-3 border-gray-400">Description</th>
                      <th className="border-2 p-3 border-gray-400">Weightage</th>
                      <th className="border-2 p-3 border-gray-400"></th>
                      <th className="border-2 p-3 border-gray-400"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.map((report) => (
                      <tr key={report._id} className="border-2 p-3 border-gray-400">
                        <td className="border-2 p-3 border-gray-400">{report.assID}</td>
                        <td className="border-2 p-3 border-gray-400">{report.title}</td>
                        <td className="border-2 p-3 border-gray-400">{report.description}</td>
                        <td className="border-2 p-3 border-gray-400">{report.weightage}</td>
                        <td className="border-2 p-3 border-gray-400">
                          <a href= {`http://localhost:8081/${report.pdf}`} target="_blank" rel="noopener noreferrer">
                          <button className='bg-gray-500 hover:bg-gray-700 p-3 rounded-lg'> Download PDF</button>
                          </a>
                        </td>
                        <td className="border-2 p-3 border-gray-400">
                          <a href = {`/reportDetails/${report.assID}`}>
                          <button className=' bg-blue-500 hover:bg-blue-700 p-3 rounded-lg'>View Details</button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</>

  );
}
