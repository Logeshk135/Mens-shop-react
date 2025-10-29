import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginbg from "../assets/loginbg.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminUsername = "Admin";
    const adminPassword = "logesh@123";

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("username", username);
      localStorage.setItem("role", "admin");
      navigate("/Admin");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const { token, role } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        if (role === "admin") navigate("/admin-dashboard");
        else navigate("/");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error, try again later.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/20 p-6 rounded-2xl shadow-2xl w-96 flex flex-col border border-white/30"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black drop-shadow-lg">
          {username === "admin" ? "Admin Login" : "Login"}
        </h2>

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

        <button
          type="submit"
          className="bg-gray-900 text-white py-3 rounded-lg hover:bg-green-500 hover:text-black font-semibold transition-all duration-300"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-red-500 font-semibold mt-3">{message}</p>
        )}

        {/* Forgot Password + Signup links */}
        <div className="text-start text-sm mt-4 text-black">
          <Link
            to="/forgot"
            className="text-blue-700 underline hover:text-blue-900"
          >
            Forgot Password?
          </Link>
        </div>

        {username !== "Admin" && (
          <p className="text-center text-sm mt-2 text-black">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-700 underline hover:text-blue-900"
            >
              Signup
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
