import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginbg from "../assets/loginbg.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // ✅ success or error

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    if (storedUser) {
      setUsername(storedUser);
      setPassword(storedPass);
      setNewUsername(storedUser);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newUsername, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Alert success message
        alert("✅ Password updated successfully!");

        // Clear form
        setNewPassword("");
        setConfirmPassword("");
        setMessage("");
        setMessageType("success");

        // ✅ Redirect to login after alert
        navigate("/login");
      } else {
        alert(data.message || "❌ Update failed");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error, try again later.");
      setMessageType("error");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <form
        onSubmit={handleUpdate}
        className="backdrop-blur-md bg-white/20 p-6 rounded-2xl shadow-2xl w-96 flex flex-col border border-white/30"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black drop-shadow-lg">
          Forgot Password
        </h2>

        <div>
          <label className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="mb-4 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-yellow-500 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
