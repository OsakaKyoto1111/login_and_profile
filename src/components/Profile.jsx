import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5200/api/ApplicationUser/GetUserDetailsByUserId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData(response.data);
      } catch (err) {
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, token]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEditProfile = () => {
    navigate('/update-profile');
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500 text-xl">{error}</div>;

  return (
    <div className="text-gray-800 bg-gray-100 min-h-screen flex flex-col items-center pt-8">
      <h1 className="text-4xl font-bold mb-5">Welcome, {userData.firstName}</h1>
      <p className="text-lg text-gray-600 mb-6">{new Date().toLocaleDateString()}</p>

      <img
        src={userData.profilePictureUrl || 'https://via.placeholder.com/150'}
        alt="Profile"
        className="w-36 h-36 rounded-full border-4 border-gray-200 shadow-lg object-cover mb-5"
      />
      <h2 className="text-2xl font-semibold mb-2">{userData.firstName} {userData.lastName}</h2>
      <p className="text-lg text-gray-500 mb-6">{userData.email}</p>

      <div className="space-y-5 w-full max-w-lg px-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-base text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              value={userData.firstName}
              readOnly
              className="w-full p-3 text-base border rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-base text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              value={userData.lastName}
              readOnly
              className="w-full p-3 text-base border rounded-md bg-gray-50"
            />
          </div>
        </div>
        <div>
          <label className="block text-base text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={userData.email}
            readOnly
            className="w-full p-3 text-base border rounded-md bg-gray-50"
          />
        </div>
      </div>

      <div className="flex gap-6 mt-8">
        <button
          onClick={handleEditProfile}
          className="px-6 py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-3 text-lg bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
