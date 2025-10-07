import React, { useState } from "react";
import casual from "../assets/casual.jpg";
import formal from "../assets/formal.jpg";
import denim from "../assets/denim.jpg";
import belt from "../assets/belt.jpg";

const allProducts = [
  { id: 1, name: "Casual Shirt", category: "Shirt", price: 1200, size: "M", image: casual },
  { id: 2, name: "Formal Pant", category: "Pant", price: 1500, size: "L", image: formal },
  { id: 3, name: "Leather Belt", category: "Belt", price: 800, size: "One Size", image: belt },
  { id: 4, name: "Denim Shirt", category: "Denim", price: 2000, size: "XL", image: denim },
];

const Products = ({ addToCart }) => {
  const [category, setCategory] = useState("All");

  const filteredProducts = allProducts.filter(
    (p) => category === "All" || p.category === category
  );

  return (
    <div className="px-6 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Products</h2>

      <div className="flex justify-center mb-6 space-x-4">
        {["All", "Shirt", "Pant", "Belt", "Denim"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded ${
              category === cat ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-lg overflow-hidden p-4 text-center"
          >
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-2 font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-700">₹{p.price}</p>
            <p className="text-gray-500">Size: {p.size}</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
