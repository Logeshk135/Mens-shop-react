import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginbg from "../assets/loginbg.png";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
  e.preventDefault();

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("User Registered Successfully!");
      navigate("/login");
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Try again later.");
  }
};

  return (
    <div
      className="flex justify-center items-center h-screen w-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/20 p-2 rounded-2xl shadow-2xl w-96 flex flex-col border border-white/30"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black drop-shadow-lg">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mb-4 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button className="bg-gray-900 text-white py-3 rounded-lg hover:bg-green-500 hover:text-black font-semibold transition-all duration-300">
          Register
        </button>
        <p className="text-center text-sm mt-4 text-black">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 underline hover:text-blue-900">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
