import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Profile from "./components/Profile";
import ProductCard from "./components/ProductCard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/wishlist";
import Myorder from "./components/MyOrders";

function App() {
const [cartItems, setCartItems] = useState([]);

const addToCart = (product) => {
  setCartItems((prev) => {
    const exists = prev.find((p) => p.id === product.id);
    if (exists) {
      return prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      return [...prev, { ...product, quantity: 1 }];
    }
  });
};

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cartItems.length}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productcard" element={<ProductCard />} />
        <Route path="/Admin" element={<AdminDashboard/>} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-orders" element={<Myorder />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
