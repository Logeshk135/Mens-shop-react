import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(localStorage.getItem("wishlistItems")) || []
  );
  const [activeMenu, setActiveMenu] = useState(null); // track which item's menu is open
  const navigate = useNavigate();

  // Save cart & wishlist in localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Update quantity
  const updateQuantity = (id, qty) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updated);
    window.dispatchEvent(new Event("cartOrWishlistUpdated"));
  };

  // Remove item from cart
  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    window.dispatchEvent(new Event("cartOrWishlistUpdated"));
    setActiveMenu(null);
    alert("Removed from cart ❌");
  };

  // Move to wishlist
  const handleMoveToWishlist = (item) => {
    const exist = wishlistItems.find((w) => w.id === item.id);
    if (!exist) {
      setWishlistItems([...wishlistItems, item]);
    }
    const updatedCart = cartItems.filter((c) => c.id !== item.id);
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartOrWishlistUpdated"));
    setActiveMenu(null);
    alert(`${item.name} moved to wishlist ❤️`);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <h2 className="text-center mt-20 text-2xl text-gray-600">
        Your cart is empty!
      </h2>
    );

  return (
    <div className="py-20 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">🛍 My Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-4 bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition relative"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded"
          />

          <div className="flex-1 ml-4">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-600">₹{item.price}</p>
          </div>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            className="w-16 border px-2 py-1 rounded text-center"
          />

          {/* Options button */}
          <div className="relative ml-3">
             <button
    onClick={() =>
      setActiveMenu(activeMenu === item.id ? null : item.id)
    }
    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
  >
   Remove
  </button>

  {/* Notification-style menu centered below button */}
  {activeMenu === item.id && (
    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-44 bg-white shadow-lg rounded z-10">
      <button
        onClick={() => handleMoveToWishlist(item)}
        className="block w-full text-center px-4 py-2 hover:bg-gray-100"
      >
        Move to Wishlist
      </button>
      <button
        onClick={() => handleRemove(item.id)}
        className="block w-full text-center px-4 py-2 hover:bg-gray-100 text-red-600"
      >
        Remove from Cart
      </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-8 bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold">Total: ₹{total}</h3>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}
