import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
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
        setError("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, [userId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

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

      setMessage("Profile information updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Profile Picture URL"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={profilePictureUrl}
            onChange={(e) => setProfilePictureUrl(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <button
          className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          onClick={() => navigate("/profile")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
