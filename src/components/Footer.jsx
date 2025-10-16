import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  const role = localStorage.getItem("role"); // Get role from localStorage

  return (
    <footer className="bg-red-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-red-500">Dravon</span> Men's Shop
          </h2>
          <p>© 2025 Dravon Men's Shop. All Rights Reserved.</p>
        </div>

        {/* Middle Section — Hide for Admin */}
        {role !== "admin" && (
          <div className="text-center">
            <h3 className="font-semibold mb-2 text-bold">Quick Links</h3>
            <div className="flex flex-col space-y-1">
              <Link to="/" className="hover:text-yellow-400">Home</Link>
              <Link to="/about" className="hover:text-yellow-400">About</Link>
              <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="text-center md:text-right">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-600"
            >
              <FaYoutube />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
