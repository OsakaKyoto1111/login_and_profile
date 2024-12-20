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
        linkToResetPassword: `http://localhost:3000/reset-password?email=${encodeURIComponent(
          email
        )}`,
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Password Reset Request</h2>
        <p className="text-gray-600 text-center mb-6">Enter your email to request a password reset</p>
        <form onSubmit={handleSubmit}>
          <label className="block text-left text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Send Request
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default RequestPasswordReset;
