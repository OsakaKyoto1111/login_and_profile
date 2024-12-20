import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5200/api/Auth/Register', {
        email,
        password,
        firstName,
        lastName,
        profilePictureUrl,
      });

      const token = response.data;
      const decodedPayload = jwtDecode(token);
      const userId = decodedPayload.nameid;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      navigate(`/profile?userId=${userId}`);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred. Please check your input data.');
    }
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <p>Create your account</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="custom-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="custom-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="First Name"
          className="custom-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="custom-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          className="custom-input"
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
        />
        <button type="submit" className="custom-button">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="separator">
        <span>OR</span>
      </div>
      <div className="link-container">
        <a href="#" className="link" onClick={() => navigate('/login')}>
          Already have an account? Login
        </a>
      </div>
      <button className="custom-button-back" onClick={() => navigate('/login')}>
        Back
      </button>
    </div>
  );
};

export default Register;
