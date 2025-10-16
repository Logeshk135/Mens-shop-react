import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, name, image }) => {
  const navigate = useNavigate();

  const handleView = () => {
    const role = localStorage.getItem("role");

    if (role === "admin") {
      alert("Only users can view or purchase products!");
      return; // stop navigation
    }

    navigate(`/products`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={image} alt={name} className="w-full h-56 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <button
          onClick={handleView}
          className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
