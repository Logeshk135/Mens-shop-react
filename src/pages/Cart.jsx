import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const navigate = useNavigate();

  const updateQuantity = (id, qty) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <h2 className="text-center mt-20 text-2xl">Cart is empty</h2>
    );

  return (
    <div className="py-20 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">My Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-4 bg-white p-4 shadow rounded"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex-1 ml-4">
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.id, Number(e.target.value))
            }
            className="w-16 border px-2 py-1"
          />
          <button
            onClick={() => removeItem(item.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center mt-8">
        <h3 className="text-xl font-bold">Total: ₹{total}</h3>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
