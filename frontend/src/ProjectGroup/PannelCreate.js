import React from 'react'
import axios from 'axios'
import background from '../Images/Home.jpg';


export default function PannelCreate() {



  const [Members, setMembers] = React.useState('');
  const [group, setGroup] = React.useState([]);
  const [formData, setFormData] = React.useState({
    pannelName: '',
    pannelMember1: '',
    pannelMember2: '',
    pannelMember3: '',
    date: '',
    startTime: '',
    endTime: '',
    id: null,
  });

  //get all group details
  const getGroupreg = async () => {
    try {
      const res = await axios.get('http://localhost:8081/GroupReg/getGroupreg');
      if (Array.isArray(res.data)) {
        setGroup(res.data);
      } else {
        console.error('API response is not an array');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const res = await axios.get('http://localhost:8081/viewAllUsers', {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      const members = res.data.filter(member => member.role === 'Examiner');
      setMembers(members);

      console.log(Members)
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getMembers();
    getGroupreg();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Check if any duplicate examiners are selected
    const selectedExaminers = [formData.pannelMember1, formData.pannelMember2, formData.pannelMember3];
    const uniqueExaminers = new Set(selectedExaminers);
    if (selectedExaminers.length !== uniqueExaminers.size) {
      alert('Please select unique examiners for the panel.');
      return;
    }


    const { id, ...formDataWithoutId } = formData;
    if (formDataWithoutId.startTime === '09:00') {
      return alert('already assigned to another pannel');
    }
    if (formDataWithoutId.pannelMember1 === 'pjayaweera') {
      return alert('already assigned to another pannel');
    }
    if (formDataWithoutId.pannelMember2 === 'tsilva') {
      return alert('already assigned to another pannel');
    }
    if (formDataWithoutId.pannelMember3 === 'ddinesh') {
      return alert('already assigned to another pannel');
    }


    let isPannelCreated = false;
    try {
      await axios.post('http://localhost:8081/Pannel/createPannel', formDataWithoutId, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Panel created successfully');
      isPannelCreated = true;
    } catch (error) {
      alert(error.response.data.message);
    }

    if (isPannelCreated) {
      try {
        await axios.patch('http://localhost:8081/GroupReg/assignPannel', { id: formData.id, pannel: formData.pannelName }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        alert('Pannel assigned successfully');
      } catch (error) {
        alert(error.response.data.message)
      }
    }

  };

  const availableGroups = group.filter(group => !group.Pannel);


  return (
    <>

      <div
        className='justify-center items-center h-screen'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 25, 0.11), rgba(0, 0, 25, 0.11)), url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
        }}
      >
        <div>

          <br />

          <h2 className='text-center text-4xl mb-3 font-bold text-gray-700'>
            Panel Creation
          </h2>


          {/* <div className='w-full'>
        <a href='/panels'>
        <button className='w-[150px] ml-auto mr-3 border 1px bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#000000] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>
            Panels
        </button>
        </a>
      </div> */}



          <div className='flex justify-center items-center mt-5'>

            <div
              className="px-11 py-10 w-9/12 rounded-lg bg-gray-800 p-8 mt-8 shadow-md w-fit text-white"
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
              }}
            >

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-gray-400">Pannel Name:</label>
                      <input
                        type="text"
                        name="pannelName"
                        value={formData.pannelName}
                        onChange={(e) => setFormData({ ...formData, pannelName: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-gray-400">Pannel Members 1:</label>
                      <select
                        name="pannelMember1"
                        value={formData.pannelMember1}
                        onChange={(e) => setFormData({ ...formData, pannelMember1: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select Member</option>
                        {Array.isArray(Members) && Members.map((member, index) => (
                          <option key={index} value={member.username}>
                            {member.username}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-gray-400">Date:</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>

                    <div className='mb-4'>
                      <label className="block text-sm font-bold mb-2 text-gray-400">Select Group:</label>
                      <select
                        name='GroupID'
                        value={formData.id}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      >
                        <option value=''>Select Group</option>
                        {availableGroups.map((group, index) => (
                          <option key={index} value={group._id}>
                            {group.GroupName}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-gray-400">Pannel Members 2:</label>
                      <select
                        name="pannelMember2"
                        value={formData.pannelMember2}
                        onChange={(e) => setFormData({ ...formData, pannelMember2: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select Member</option>
                        {Array.isArray(Members) && Members.map((member, index) => (
                          <option key={index} value={member.username}>
                            {member.username}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-gray-400">Pannel Members 3:</label>
                      <select
                        name="pannelMember3"
                        value={formData.pannelMember3}
                        onChange={(e) => setFormData({ ...formData, pannelMember3: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select Member</option>
                        {Array.isArray(Members) && Members.map((member, index) => (
                          <option key={index} value={member.username}>
                            {member.username}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-gray-400">Start Time:</label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-gray-400">End Time:</label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>


                  </div>
                </div>

                <div className='flex items-center justify-center'>
                  <button type="submit" className="bg-cyan-400 hover:bg-cyan-500 px-10 py-2 text-white font-bold rounded-md">
                    Create Pannel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
