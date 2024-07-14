import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../Images/background4.jpg';

const ResearchRequest = () => {
  const [formData, setFormData] = useState({
    title: '',
    student1: '',
    student2: '',
    student3: '',
    student4: '',
    cosupervisor: '',
    supervisor: '',
    conferencename: '',
    issn: '',
    googlescholarlink: '',
    scopuslink: '',
    payment: '',
    registrationpdf: ''
  });
  const [supervisors, setSupervisors] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch supervisors from the backend
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('http://localhost:8081/supervisors');
        setSupervisors(response.data); // Assuming the data is an array of supervisor names
      } catch (error) {
        console.error('Error fetching supervisors:', error);
      }
    };

    fetchSupervisors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8081/researchreq', formData);
        alert(response.data.message);
        // Optionally, you can reset the form after successful submission
        setFormData({
          title: '',
          student1: '',
          student2: '',
          student3: '',
          student4: '',
          cosupervisor: '',
          supervisor: '',
          conferencename: '',
          issn: '',
          googlescholarlink: '',
          scopuslink: '',
          payment: '',
          registrationpdf: ''
        });
        // Reload the page
        window.location.reload();
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validation logic for each field
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
      valid = false;
    }
    if (!formData.student1.trim()) {
      errors.student1 = 'Leader Name is required';
      valid = false;
    }
    if (!formData.supervisor.trim()) {
      errors.supervisor = 'Supervisor Name is required';
      valid = false;
    }
    // Add validation for other fields similarly

    setErrors(errors);
    return valid;
  };

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
      <h1 className='text-4xl font-bold text-white text-center mb-8'>Research Publication Request</h1>
      <div className='flex flex-col justify-center items-center mt-10'>
        <div className='flex justify-center items-center w-full'>
         
            
                  
            
              
            </div>
           : (
            <div className='bg-white px-11 py-10 w-8/12 rounded-lg shadow-md backdrop-blur-md backdrop-filter bg-opacity-20'>
              <h2 className='text-lg font-bold text-red-700 ml-5'>
        * Only leaders can Submit.
      </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="groupnumber" className="text-lg font-bold text-gray-800 lg:w-32">GroupName</label>
                  <input
                    type="text"
                    id="groupnumber"
                    name="groupnumber"
                    placeholder="Group Name"
                    value={formData.groupnumber}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {errors.groupnumber && <span className="text-red-500">{errors.groupnumber}</span>}
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="title" className="text-lg font-bold text-gray-800 lg:w-32">Project Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {errors.title && <span className="text-red-500">{errors.title}</span>}
                </div>
              </div>
          
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="student1" className="text-lg font-bold text-gray-800 lg:w-32">Leader Name</label>
                  <input
                    id="student1"
                    name="student1"
                    placeholder="Leader Name"
                    value={formData.student1}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                 />
                  {errors.student1 && <span className="text-red-500">{errors.student1}</span>}
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="supervisor" className="text-lg font-bold text-gray-800 lg:w-32">Supervisor</label>
                  <input
                    id="supervisor"
                    name="supervisor"
                    placeholder="Supervisor Name"
                    value={formData.supervisor}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  
                  
                  />
                  {errors.supervisor && <span className="text-red-500">{errors.supervisor}</span>}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className=" items-center lg:w-1/2">
                <label htmlFor="student2" className="text-lg font-bold text-gray-800 lg:w-32">Group Member2</label>
                <input
                  id="student2"
                  name="student2"
                  placeholder="Group Member2"
                  value={formData.student2}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                
                
                  
                />
                {errors.student2 && <span className="text-red-500">{errors.student2}</span>}
              </div>

              <div className=" items-center lg:w-1/2">
                <label htmlFor="cosupervisor" className="text-lg font-bold text-gray-800 lg:w-32">Co-Supervisor:</label>
                <input
                  id="cosupervisor"
                  name="cosupervisor"
                  placeholder="Cosupervisor"
                  value={formData.cosupervisor}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                 
                  {errors.cosupervisor && <span className="text-red-500">{errors.cosupervisor}</span>}
               
              </div>
            </div>

              
          
            <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="student3" className="text-lg font-bold text-gray-800 lg:w-32">Group Member3</label>
                  <input
                    id="student3"
                    name="student3"
                    placeholder="GroupMember3"
                    value={formData.student3}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                 />
                  {errors.student3 && <span className="text-red-500">{errors.student3}</span>}
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="conferencename" className="text-lg font-bold text-gray-800 lg:w-32">  Conference name / Magazin name</label>
                  <input
                    type="text"
                    id="conferencename"
                    name="conferencename"
                    value={formData.conferencename}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {errors.conferencename && <span className="text-red-500">{errors.conferencename}</span>}
                </div>
              </div>
          
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="student4" className="text-lg font-bold text-gray-800 lg:w-32">Group Member4</label>
                  <input
                    id="student4"
                    name="student4"
                    placeholder="GroupMember4"
                    value={formData.student4}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                 />
                  {errors.student4 && <span className="text-red-500">{errors.student4}</span>}
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="issn" className="text-lg font-bold text-gray-800 lg:w-32">Issn Number</label>
                  <input
                    type="text"
                    id="issn"
                    name="issn"
                   
                    value={formData.issn}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {errors.issn && <span className="text-red-500">{errors.issn}</span>}
                </div>
              </div>
          
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="googlescholarlink" className="text-lg font-bold text-gray-800 lg:w-32">Googlescholar Link</label>
                  <input
                    type="text"
                    id="googlescholarlink"
                    name="googlescholarlink"
                    value={formData.googlescholarlink}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {errors.googlescholarlink && <span className="text-red-500">{errors.googlescholarlink}</span>}
                </div>
          
                <div className=" items-center lg:w-1/2">
                  <label htmlFor=" scopuslink" className="text-lg font-bold text-gray-800 lg:w-32"> Scopus Link</label>
                  <input
                    type="text"
                    id="scopuslink"
                    name="scopuslink"
                   
                    value={formData.scopuslink}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {errors.scopuslink && <span className="text-red-500">{errors.scopuslink}</span>}
                </div>
              </div>
          
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
                  <label htmlFor="payment" className="text-lg font-bold text-gray-800 lg:w-32">Total Payment</label>
                  <input
                    type="text"
                    id="payment"
                    name="payment"
                    placeholder="LKR"
                    value={formData.payment}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {errors.payment && <span className="text-red-500">{errors.payment}</span>}
                </div>
                
                
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <div className=" items-center lg:w-1/2">
              <label htmlFor="payment" className="text-lg font-bold text-gray-800 lg:w-32">Confirmation pdf</label>
              <input
      type="file"
      name="registrationpdf"
      placeholder="Confirmation pdf"
      onChange={handleChange}
      className="border-2 border-gray-400 p-2 col-span-2"
    />
      </div>
</div>
          
<button type="submit" className="w-52 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 mx-auto block">Submit</button>            </form>
          </div>
          
          )
        </div>
      </div>

      

  );
};

export default ResearchRequest;
