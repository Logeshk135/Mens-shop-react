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
    const adminUsername = "admin";
    const adminPassword = "admin123";

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
        className="bg-transparent bg-opacity-90 p-8 rounded shadow-md w-80 flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {username === "admin" ? "Admin Login" : "Login"}
        </h2>
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
        <button className="bg-gray-900 text-white py-2 rounded hover:bg-yellow-500 mb-2">
          Login
        </button>
        {message && <p className="text-center text-red-500 font-semibold">{message}</p>}


        {username !== "admin" && (
          <p className="text-center text-sm mt-2">
            Don't have account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
