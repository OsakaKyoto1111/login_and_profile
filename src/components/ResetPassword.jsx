import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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
        <div>
          <label>Confirmation Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="primary-button">
          Reset Password
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        className="back-button"
        onClick={() => navigate("/login")}
        style={{ marginTop: "10px" }}
      >
        Back
      </button>
    </div>
  );
};

export default ResetPassword;
