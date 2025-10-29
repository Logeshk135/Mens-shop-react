import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  // Fetch user profile when component loads
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

  // Handle input changes
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
        alert("✅ Profile updated successfully!");
      } else {
        alert(updated.message || "Profile update failed!");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  if (!user) return null; // no loading screen

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <h2 className="text-2xl font-semibold mt-3 text-gray-800">
            Hi, {user.name?.split(" ")[0]} 👋
          </h2>
          <p className="text-sm text-gray-500">Welcome back to Men's Style Hub</p>
        </div>

        {/* Info Section */}
        <div className="space-y-3">
          <div>
            <label className="block text-gray-500 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              disabled={!editMode}
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${
                editMode ? "border-gray-400" : "border-transparent"
              } rounded-lg p-2 bg-gray-100 focus:outline-none`}
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              className="w-full border border-transparent rounded-lg p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm">Phone</label>
            <input
              type="text"
              name="phone"
              disabled={!editMode}
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border ${
                editMode ? "border-gray-400" : "border-transparent"
              } rounded-lg p-2 bg-gray-100 focus:outline-none`}
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm">Gender</label>
            <select
              name="gender"
              disabled={!editMode}
              value={formData.gender}
              onChange={handleChange}
              className={`w-full border ${
                editMode ? "border-gray-400" : "border-transparent"
              } rounded-lg p-2 bg-gray-100 focus:outline-none`}
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
                className="bg-green-600 text-white px-5 py-2 rounded-lg mr-2 hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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
