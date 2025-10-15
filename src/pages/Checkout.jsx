import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/loginbg.png"; // your local jpg/png

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  // Load cart + login check
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);

    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      alert("Please login before placing an order!");
      navigate("/login");
    }
  }, [navigate]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      alert("⚠️ You must login first to place an order!");
      navigate("/login");
      return;
    }

    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please fill all details!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: form,
      items: cartItems,
      total,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    localStorage.removeItem("cartItems");

    alert("✅ Order placed successfully!");
    navigate("/my-orders");
  };

  return (
    <div
      className="py-20 min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Checkout
        </h2>

        <div className="grid md:grid-cols-2 mt-25 gap-6">
          {/* Left - Shipping Details */}
          <div className="bg-white p-6 shadow rounded">
            <h3 className="font-semibold text-lg mb-4">
              Shipping Information
            </h3>
            <form className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </form>
          </div>

          {/* Right - Order Summary */}
          <div className="bg-white p-6 shadow rounded">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-2 border-b pb-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <h3 className="text-right font-bold mt-4 text-xl">
              Total: ₹{total}
            </h3>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
