import axios from 'axios';
import { API_DOMAIN } from '../constants/constants';
import { useEffect, useState } from 'react';

const Submitted = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_DOMAIN}/api/form/submitted`);
        setUsers(response.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="bg-gray-100 min-h-[100vh] p-8">
      <h2 className="text-2xl font-bold mb-4">Form Data</h2>
      {users.map((data, index) => (
        <div key={index} className="bg-white rounded-md shadow-md p-4 mb-4">
          <div className="flex items-center mb-2">
            <span className="font-bold mr-2">Name:</span>
            <span>{data.name}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold mr-2">Email:</span>
            <span>{data.email}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold mr-2">Phone:</span>
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold mr-2">DOB:</span>
            <span>{new Date(data.dob).toLocaleDateString('en-GB')}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold mr-2">Address:</span>
            <span>{data.address}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Submitted;
