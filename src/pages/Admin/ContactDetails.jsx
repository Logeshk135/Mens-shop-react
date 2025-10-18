import { useEffect, useState } from "react";

export default function ContactDetails() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
  try {
    const token = localStorage.getItem("token"); // get admin token
    const res = await fetch("https://mens-shop-backend-2.onrender.com/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ Check if the request failed
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error fetching contacts:", errorData.message);
      return; // stop here if not ok
    }

    // ✅ Here is where you set the contacts array
    const data = await res.json();
    setContacts(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error(err);
  }
};


  const deleteMessage = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`https://mens-shop-backend-2.onrender.com/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 mt-10 text-center text-gray-800">
        💬 Contact Details
      </h2>
      <table className="w-full border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Message</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{c.name}</td>
              <td className="border px-4 py-2">{c.email}</td>
              <td className="border px-4 py-2">{c.message}</td>
              <td className="border px-4 py-2">
                {new Date(c.date).toLocaleString()}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => deleteMessage(c._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
