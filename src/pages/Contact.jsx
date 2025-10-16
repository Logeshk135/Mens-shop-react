import { useState } from "react";
import contactBg from "../assets/loginbg.png";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok) setStatus("Message sent!");
      else setStatus(data.message);
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Server error");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/20 mt-20 rounded-2xl shadow-2xl w-96 flex flex-col border border-white/30"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black drop-shadow-lg">Contact Us</h2>

        <input type="text"
         placeholder="Your Name"
          value={name} 
          onChange={(e) => setName(e.target.value)} required 
          className="mb-4 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" 
          />

        <input type="email" 
        placeholder="Your Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} required 
        className="mb-4 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" 
        />

        <textarea placeholder="Your Message" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} required 
        rows="4" className="mb-4 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
        </textarea>

        <button type="submit" 
        className="w-full bg-gray-900 text-white py-2 rounded hover:bg-yellow-500">Send Message</button>
        {status && <p className="text-center mt-2 text-green-600">{status}</p>}
      </form>
    </div>
  );
}
