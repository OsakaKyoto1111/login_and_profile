import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

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

  if (loading) return <div className="profile-container">Loading profile...</div>;
  if (error) return <div className="profile-container">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-left">
          <img
            src={userData.profilePictureUrl || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="profile-image"
          />
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
        <div className="profile-right">
          <h2 className="profile-name">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="profile-username">@{userData.email.split('@')[0]}</p>
          <div className="profile-info">
            <div className="profile-item">
              <span className="profile-icon">📧</span>
              <span className="profile-label">Email:</span>
              <span className="profile-value">{userData.email}</span>
            </div>
            <div className="profile-item">
              <span className="profile-icon">👤</span>
              <span className="profile-label">Full Name:</span>
              <span className="profile-value">
                {userData.firstName} {userData.lastName}
              </span>
            </div>
          </div>
          <button className="logout-button logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
