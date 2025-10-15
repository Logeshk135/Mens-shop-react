import React, { useState, useEffect } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleCancelOrder = (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status: "Cancelled" } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      alert("❌ Order cancelled successfully!");
    }
  };

  if (orders.length === 0)
    return (
      <h2 className="text-center mt-20 text-2xl text-gray-700">
        You have no orders yet.
      </h2>
    );

  return (
    <div className="py-20 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-8">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6 border"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">
                Order ID: #{order.id}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Cancelled"
                    ? "bg-red-200 text-red-800"
                    : order.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-600 mb-2">
              <strong>Date:</strong> {order.date}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Name:</strong> {order.customer.name} <br />
              <strong>Address:</strong> {order.customer.address} <br />
              <strong>Phone:</strong> {order.customer.phone}
            </p>

            <div className="border-t pt-3 mt-3">
              <h4 className="font-semibold mb-2">Items:</h4>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b py-1"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <h3 className="text-right font-bold mt-3 text-lg">
                Total: ₹{order.total}
              </h3>
            </div>

            {order.status !== "Cancelled" && (
              <button
                onClick={() => handleCancelOrder(order.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
