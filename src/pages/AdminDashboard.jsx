import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchContacts(); 
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-30">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Message</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td className="border px-2 py-1">{c.name}</td>
              <td className="border px-2 py-1">{c.email}</td>
              <td className="border px-2 py-1">{c.message}</td>
              <td className="border px-2 py-1">{new Date(c.date).toLocaleString()}</td>
              <td className="border px-2 py-1">
                <button onClick={() => deleteMessage(c._id)} className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
