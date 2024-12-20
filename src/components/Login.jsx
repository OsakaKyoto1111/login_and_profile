import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5200/api/Auth/Login', {
        email,
        password,
      });

      const token = response.data;

      if (!token || typeof token !== 'string') {
        throw new Error('Token is missing or invalid!');
      }

      const decodedPayload = jwtDecode(token);
      const userId = decodedPayload.nameid;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      setMessage('Login successful!');
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Invalid email or password.');
    }
  };

  return (
    <div className="container">
      <h2>Welcome to our shop</h2>
      <p>Sign in to continue</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your Email"
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
        <button type="submit" className="custom-button">Sign In</button>
      </form>
      <div className="separator">
        <span>OR</span>
      </div>
      <div className="link-container">
        <a href="#" className="link" onClick={() => navigate('/request-reset-password')}>
          Forgot Password?
        </a>
        <a href="#" className="link" onClick={() => navigate('/register')}>
          Register
        </a>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
