import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5200/api/Auth/Login", {
        email,
        password,
      });

      const token = response.data;

      if (!token || typeof token !== "string") {
        throw new Error("Token is missing or invalid!");
      }

      const decodedPayload = jwtDecode(token);
      const userId = decodedPayload.nameid;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setMessage("Login successful!");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome to our shop</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-between text-blue-500 text-sm">
          <button
            className="hover:underline"
            onClick={() => navigate("/request-reset-password")}
          >
            Forgot Password?
          </button>
          <button className="hover:underline" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
