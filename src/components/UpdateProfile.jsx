import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5200/api/ApplicationUser/GetUserDetailsByUserId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { firstName, lastName, email, profilePictureUrl } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setProfilePictureUrl(profilePictureUrl);
      } catch (err) {
        setError('Failed to load profile data.');
      }
    };

    fetchProfile();
  }, [userId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.put(
        `http://localhost:5200/api/ApplicationUser/UpdateProfileInformation/${userId}`,
        {
          firstName,
          lastName,
          email,
          profilePictureUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('Profile information updated successfully!');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      setError('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
        />
        <button type="submit" className="primary-button">Save Changes</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="back-button" onClick={() => navigate('/profile')}>
        Back
      </button>
    </div>
  );
};

export default UpdateProfile;
