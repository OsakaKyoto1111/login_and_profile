import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="primary-button">Send Request</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={() => navigate("/login")} className="back-button" style={{ marginTop: "10px" }}>
        Back
      </button>
    </div>
  );
};

export default RequestPasswordReset;
