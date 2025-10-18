import { useEffect, useState } from "react";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://mens-shop-backend-2.onrender.com/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Filter out admins if needed
      const userOrders = Array.isArray(data) ? data.filter(o => o.role !== "admin") : [];
      setOrders(userOrders);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`https://mens-shop-backend-2.onrender.com/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter(o => o._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    // Example: mark as delivered
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://mens-shop-backend-2.onrender.com/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "Delivered" }),
      });
      const updatedOrder = await res.json();
      setOrders(orders.map(o => o._id === id ? updatedOrder : o));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mt-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📦 Customer Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-yellow-500 text-black">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Order Items</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="border px-4 py-2 text-center">No orders found</td>
              </tr>
            )}
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{order.username}</td>
                <td className="border px-4 py-2">{order.email}</td>
                <td className="border px-4 py-2">
                  {order.items.map((i) => (
                    <div key={i._id}>{i.name} x{i.quantity}</div>
                  ))}
                </td>
                <td className="border px-4 py-2">${order.totalPrice}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2 flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => handleUpdate(order._id)}
                  >
                    Mark Delivered
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
