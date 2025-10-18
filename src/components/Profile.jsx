import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUsername(storedUser);
      setPassword(storedPass);
      setNewUsername(storedUser);
    }
  }, [navigate]);

  const handleUpdate = async (e) => {
  e.preventDefault();

  if (newPassword && newPassword !== confirmPassword) {
    setMessage("Passwords do not match!");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const res = await fetch("https://mens-shop-backend-2.onrender.com/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newUsername, newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Profile updated successfully!");
      localStorage.setItem("username", data.username); // only store username
      setUsername(data.username);
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setMessage(data.message || "Update failed");
    }
  } catch (err) {
    console.error(err);
    setMessage("Server error, try again later.");
  }
};

const handleLogout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  navigate("/login");
};

return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6">
    <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>
      {message && (
        <p className="text-center text-green-500 font-semibold mb-4">{message}</p>
      )}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">New Password</label>
          <input
            type="password"
            placeholder="Leave blank to keep current password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-yellow-500 transition"
        >
          Update Profile
        </button>
      </form>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Home
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);
};

export default Profile;
