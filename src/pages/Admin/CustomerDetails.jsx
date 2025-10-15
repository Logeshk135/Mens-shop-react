import { useEffect, useState } from "react";

export default function CustomerDetails() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 mt-20 text-center text-gray-800">
        🧍‍♂️ Customer Details
      </h2>
      <table className="w-full border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{u.username}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
