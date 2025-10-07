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
        className="bg-transparent bg-opacity-80 shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required rows="4" className="w-full border px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
        <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-yellow-500">Send Message</button>
        {status && <p className="text-center mt-2 text-green-600">{status}</p>}
      </form>
    </div>
  );
}
