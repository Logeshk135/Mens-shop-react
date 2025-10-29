import React, { useEffect, useState } from "react";
import loginbg from "../assets/loginbg.png";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
        });
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const updated = await res.json();
      if (res.ok) {
        setUser(updated);
        setEditMode(false);
        alert("Profile updated successfully!");
      } else {
        alert(updated.message || "Profile update failed!");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!user) return null;

  return (
    <div
          className="flex justify-center items-center h-screen w-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${loginbg})` }}
        >
      <div
        className="backdrop-blur-md  shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-black/70 shadow-md"
          />
          <h2 className="text-2xl font-semibold mt-3 text-black drop-shadow">
            Hi, {user.name?.split(" ")[0]} 👋
          </h2>
          <p className="text-sm text-black-100 opacity-90">
            Welcome back to Men's Style Hub
          </p>
        </div>

        {/* Info Section */}
        <div className="space-y-3 text-white">
          <div>
            <label className="block text-sm text-black/90">Full Name</label>
            <input
              type="text"
              name="name"
              disabled={!editMode}
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${
                editMode ? "border-white/40 bg-white/40" : "border-transparent bg-white/20"
              } rounded-lg p-2 text-black focus:outline-none`}
            />
          </div>

          <div>
            <label className="block text-sm text-black/90">Email</label>
            <input
              type="email"
              name="email"
              disabled={!editMode}
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                editMode ? "border-white/40 bg-white/40" : "border-transparent bg-white/20"
              } rounded-lg p-2 text-black focus:outline-none`}
            />
          </div>

          <div>
            <label className="block text-sm text-black/90">Phone</label>
            <input
              type="text"
              name="phone"
              disabled={!editMode}
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border ${
                editMode ? "border-white/40 bg-white/40" : "border-transparent bg-white/20"
              } rounded-lg p-2 text-black focus:outline-none`}
            />
          </div>

          <div>
            <label className="block text-sm text-black/90">Gender</label>
            <select
              name="gender"
              disabled={!editMode}
              value={formData.gender}
              onChange={handleChange}
              className={`w-full border ${
                editMode ? "border-white/40 bg-white/40" : "border-transparent bg-white/20"
              } rounded-lg p-2 text-black focus:outline-none`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600/90 text-white px-5 py-2 rounded-lg mr-2 hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400/70 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600/90 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
