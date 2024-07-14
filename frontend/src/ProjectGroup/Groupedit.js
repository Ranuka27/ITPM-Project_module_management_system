import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../Images/Group.jpg';

export default function Groupedit() {
    const [groups, setGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/GroupReg/getGroupreg')
            .then((res) => {
                setGroups(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const navigate = useNavigate();

    const handleEdit = (groupId) => {
        navigate(`/groupedit2/${groupId}`);
    };


    const handleDelete = (groupId) => {
    axios.delete(`http://localhost:8081/GroupReg/deleteGroupreg/${groupId}`)
        .then(() => {
            // Filter out the deleted group from the groups state
            const updatedGroups = groups.filter(group => group._id !== groupId);
            setGroups(updatedGroups);

            // Optionally, show a success message to the user
            alert("Group successfully deleted.");
        })
        .catch((err) => {
            // Handle errors here, such as displaying a message to the user
            console.error("Failed to delete the group:", err);
            alert("Failed to delete the group.");
        });
};

    const filteredGroups = groups.filter((group) => {
        const searchFields = [
            group.GroupName,
            group.Leader,
            group.Member1,
            group.Member2,
            group.Member3
        ];
        return searchFields.some(field =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
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
                <div className='text-4xl text-white text-center mt-3'>Student Groups</div>

                <div className='mt-3'>
                    <input
                        type="text"
                        placeholder="Search by GroupName, Leader, Member1, Member2, or Member3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-5/12 p-2 ml-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className='mt-3 flex justify-left'>
                <div className='mt-3'>
                <div className='mt-3 flex justify-center'>
                    <table className="divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GroupName</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leader</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member1</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member2</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member3</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Co-Supervisor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredGroups.map((group) => (
                                <tr key={group._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{group.GroupName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{group.batch}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{group.specialization}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{group.Leader}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{group.Member1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{group.Member2}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{group.Member3}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{group.supervisor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{group.cosupervisor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleEdit(group._id)}
                                        >
                                            Edit
                                        </button>

                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-1"
                                            onClick={() => handleDelete(group._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
</div>

</div>

            </div>
        </>
    );
}
