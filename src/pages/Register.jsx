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
        className="bg-transparent bg-opacity-90 p-8 rounded shadow-md w-80 flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mb-3 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <button className="bg-gray-900 text-white py-2 rounded hover:bg-yellow-500 mb-2">
          Register
        </button>
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
