import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get("email");

    if (emailFromUrl) {
      setEmail(decodeURIComponent(emailFromUrl));
    } else {
      setError("Invalid reset password link.");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = {
      email,
      code: parseInt(code, 10),
      newPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:5200/api/Auth/ResetPassword",
        data
      );

      if (response.status === 200) {
        setMessage("Password successfully updated!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError("Incorrect confirmation code. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Confirmation Code"
          className="custom-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="custom-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="custom-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="custom-button">
          Reset Password
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <button
        className="custom-button-back"
        onClick={() => navigate("/login")}
      >
        Back
      </button>
    </div>
  );
};

export default ResetPassword;
