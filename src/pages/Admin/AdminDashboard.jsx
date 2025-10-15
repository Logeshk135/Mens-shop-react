import { useState } from "react";
import CustomerDetails from "./CustomerDetails";
import ContactDetails from "./ContactDetails";
import ProductManagement from "./ProductManagement";
import ProductStock from "./ProductStock";
import loginbg from "../../assets/loginbg.png";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "customers":
        return <CustomerDetails />;
      case "contacts":
        return <ContactDetails />;
      case "products":
        return <ProductManagement />;
      case "stock":
        return <ProductStock />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-700">
            <h2 className="text-3xl font-bold mt-20">Welcome to Admin Panel</h2>
            <p className="text-lg mt-3 text-center">
              Select a section to manage your system efficiently.
            </p>
            <img
              src={loginbg}
              alt="Admin Dashboard Illustration"
              className="w-250 h-150 mt-5 object-contain"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-lg">
        <h1 className="text-2xl font-bold text-center py-6 border-b border-gray-700">
          Admin Panel
        </h1>
        <nav className="flex flex-col gap-3 p-4">
          <button
            onClick={() => setActivePage("customers")}
            className="bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-lg py-2 px-3 text-left"
          >
            🧍‍♂️ Customer Details
          </button>
          <button
            onClick={() => setActivePage("contacts")}
            className="bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-lg py-2 px-3 text-left"
          >
            💬 Contact Details
          </button>
          <button
            onClick={() => setActivePage("products")}
            className="bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-lg py-2 px-3 text-left"
          >
            🏭 Product Management
          </button>
          <button
            onClick={() => setActivePage("stock")}
            className="bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-lg py-2 px-3 text-left"
          >
            📦 Product Stock
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">{renderPage()}</main>
    </div>
  );
}
