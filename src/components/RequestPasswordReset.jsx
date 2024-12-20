import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5200/api/Auth/RequestPasswordReset", {
        email,
        linkToResetPassword: `http://localhost:3000/reset-password?email=${encodeURIComponent(email)}`,
      });

      if (response.status === 200) {
        setMessage("Password reset link has been sent to your email.");
        setTimeout(() => navigate(`/reset-password?email=${encodeURIComponent(email)}`), 1500);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.Email?.[0] ||
        err.response?.data?.title ||
        "An error occurred. Please make sure the email is correct.";
      setError(errorMsg);
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h2>Password Reset Request</h2>
      <p>Enter your email to request a password reset</p>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="custom-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="custom-button">Send Request</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => navigate("/login")} className="custom-button-back">
        Back
      </button>
    </div>
  );
};

export default RequestPasswordReset;
