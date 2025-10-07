import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="px-6 py-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4"
            >
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded" />
              <div className="flex-1 ml-0 sm:ml-4 mt-2 sm:mt-0 text-center sm:text-left">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-gray-700 font-bold">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="w-16 text-center border rounded px-2 py-1"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <h3 className="text-2xl font-bold">Total: ₹{total}</h3>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
