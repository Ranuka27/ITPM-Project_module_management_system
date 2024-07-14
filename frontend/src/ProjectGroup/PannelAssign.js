import React from 'react'
import axios from 'axios'
import background from '../Images/background.jpg';

export default function PannelAssign() {
  
  const [pannels, setPannel] = React.useState('');
  const [formData ,setFormData] = React.useState({
    id: null,
    pannel: '',
  });
  const [group, setGroup] = React.useState([]);

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

    //get all pannel details
    const getPannel = async () => {
        try {
        const res = await axios.get('http://localhost:8081/Pannel/getPannel');
        setPannel(res.data); 
        } catch (error) {
        console.error(error);
        }
    };

    React.useEffect(() => {
        getGroupreg();
        getPannel();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        
        try {
            await axios.patch('http://localhost:8081/GroupReg/assignPannel', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Pannel assigned successfully');
        } catch (error) {
            alert(error.response.data.message)
        }
    };

    const availableGroups = group.filter(group => !group.Pannel);


  return (
    <>
     <div 
        className='justify-center items-center h-screen'
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.9,
        }}
    >
        
    <div>

    <h2 className='text-4xl ml-10 text-white font-bold text-center' style={{ textShadow: '1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000' }}>
        Panel Assign
      </h2>


      <div className='flex justify-center items-center mt-14'> 

        <div
    className="bg-white p-10 rounded-lg shadow-md backdrop-blur-md backdrop-filter bg-opacity-20"
    style={{
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    }}
  >

     <form onSubmit={handleSubmit}>

     <select
                  name='GroupID'
                  value={formData.id}
                  className='p-3 w-52'
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                >
                  <option value=''>Select Group</option>
                  {availableGroups.map((group, index) => (
                    <option key={index} value={group._id}>
                      {group.GroupName}
                    </option>
                  ))}
                </select>

        &emsp;&emsp;

        <select
           name='pannelName'
           value={formData.pannel}
           className='p-3 w-52'
           onChange={(e) => setFormData({ ...formData, pannel: e.target.value })}
        >
            <option value=''>Select Pannel</option>
            {Object.values(pannels).map((item, index) => (
                <option key={index} value={item.pannelName}>
                    {item.pannelName}
                </option>
            ))}

        </select>

        <div className="flex justify-center">
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6">
                Assign Pannel
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
