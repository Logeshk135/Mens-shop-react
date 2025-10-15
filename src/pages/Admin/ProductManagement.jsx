import { useEffect, useState } from "react";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ name: "", price: "", image: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 mt-10 text-center text-gray-800">
        🏭 Product Management
      </h2>
      <form
        onSubmit={handleAdd}
        className="flex gap-3 justify-center mb-6 flex-wrap"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border px-3 py-2 rounded"
        />
        <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setNewProduct({ ...newProduct, image: e.target.files[0] })
        }
        className="border px-3 py-2 rounded"
      />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800">
          Add Product
        </button>
      </form>

      <table className="w-full border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">₹{p.price}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(p._id)}
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
