import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/viewAllUsers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      setUserData(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);  

  const handleEditRole = (userId, newRole) => {
    axios.patch(`http://localhost:8081/updateRole/${userId}`, { role: newRole }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      setUserData(userData.map(user => user._id === userId ? { ...user, role: newRole } : user));
      alert(`User role updated successfully`);
    }).catch((err) => {
      console.error('Error updating user role:', err);
      alert('Failed to update user role. Please try again.');
    });
  };

  const deleteUser = (Id) => {
    axios.delete(`http://localhost:8081/removeUser/${Id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
        setUserData(userData.filter(user => user._id !== Id));
        alert(`User deleted successfully`);
    }).catch((err) => {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again.');
    });
  }

  return (
    <div className="container mx-auto px-4 py-5">
      {userData && userData.map((user) => (
        user.role !== 'admin' && (
          <div key={user._id} className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
            <div className="flex justify-between px-4 py-5 sm:px-6">
              <button
                onClick={() => deleteUser(user._id)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete User
              </button>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{user.username}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <p className="text-sm font-semibold text-gray-500">Current Role: {user.role}</p>
              <div className="mt-2">
                <label className="block text-sm font-semibold mb-1">New Role:</label>
                <select 
                  defaultValue={user.role} 
                  onChange={(e) => handleEditRole(user._id, e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="user">User</option>
                  {/* <option value="admin">Admin</option> */}
                  <option value="Project Coordinator">Project Coordinator</option>
                  <option value="Project Member">Project Member</option>
                  <option value="Examiner">Examiner</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Co-Supervisor">Co-Supervisor</option>
                </select>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
  
}
