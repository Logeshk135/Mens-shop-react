import React from "react";

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover rounded-t-xl"
      />

      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1 text-lg">₹{price}</p>

        <button className="mt-3 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition">
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
