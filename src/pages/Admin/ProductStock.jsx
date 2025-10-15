import { useEffect, useState } from "react";

export default function ProductStock() {
  const [stock, setStock] = useState([]);

  const fetchStock = async () => {
    const res = await fetch("http://localhost:5000/api/stock");
    const data = await res.json();
    setStock(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 mt-10 text-center text-gray-800">
        📦 Product Stock
      </h2>
      <table className="w-full border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Available Quantity</th>
            <th className="border px-4 py-2">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((s) => (
            <tr key={s._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{s.productName}</td>
              <td className="border px-4 py-2">{s.quantity}</td>
              <td className="border px-4 py-2">
                {new Date(s.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
