import React, { useState } from "react";
import loginbg from "../assets/loginbg.png";

const Checkout = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! (Frontend Only)");
  };

  return (

    <div className="flex justify-center items-center h-screen w-auto bg-cover bg-center" style={{ backgroundImage: `url(${loginbg})` }}>
        <div className="px-6 py-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 bg-transition shadow-md p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
      </div>
    </div>
  );
};

export default Checkout;
