import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPassword from './components/ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/request-reset-password" element={<RequestPasswordReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<div>Page Not Found</div>} /> {/* 404 Page */}
      </Routes>
    </Router>
  );
};

export default App;
