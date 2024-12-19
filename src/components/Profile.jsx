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

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <main className="profile-page">
      <header className="profile-header">
        <h1>Welcome, {userData.firstName}</h1>
        <p>{new Date().toLocaleDateString()}</p>
      </header>
      <section className="profile-details">
        <img
          src={userData.profilePictureUrl || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-avatar"
        />
        <h2>{userData.firstName} {userData.lastName}</h2>
        <p>{userData.email}</p>
      </section>
      <section className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" value={userData.firstName} readOnly />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={userData.lastName} readOnly />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={userData.email} readOnly />
          </div>
        </div>
      </section>
      <div className="button-row">
        <button className="edit-button" onClick={handleEditProfile}>
          Edit Profile
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </main>
  );
};

export default Profile;
