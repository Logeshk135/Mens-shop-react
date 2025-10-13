import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaShoppingCart, FaBoxOpen, FaBars, FaTimes,FaHeart } from "react-icons/fa";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalQty);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setUsername(null);
    navigate("/login");
    setDropdown(false);
    setMobileMenu(false);
  };

  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();
    window.addEventListener("storage", updateWishlistCount);
    return () => window.removeEventListener("storage", updateWishlistCount);
  }, []);


  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-red-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <h2 className="text-2xl font-bold">
          <span className="text-red-500">Dravon</span> Men's Shop
        </h2>

        <ul className="hidden md:flex space-x-6 items-center">
          <li className="flex items-center space-x-1 hover:text-yellow-400">
            <FaHome /> <Link to="/">Home</Link>
          </li>
          <li className="flex items-center space-x-1 hover:text-yellow-400">
            <FaBoxOpen /> <Link to="/products">Products</Link>
          </li>
          <li className="flex items-center space-x-1 hover:text-yellow-400 relative">
            <FaShoppingCart />
            <Link to="/cart">Cart</Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </li>

          <li className="flex items-center space-x-1 hover:text-yellow-400 relative">
            <FaHeart />
            <Link to="/wishlist">Wishlist</Link>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-400 text-black text-xs font-bold px-1 rounded-full">
                {wishlistCount}
              </span>
            )}
          </li>


          {!username ? (
            <>
              <li className="flex items-center space-x-1 hover:text-yellow-400">
                <FaUser /> <Link to="/login">Login</Link>
              </li>
              <li className="flex items-center space-x-1 hover:text-yellow-400">
                <FaUser /> <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li className="relative">
              <div
                className="flex items-center space-x-1 cursor-pointer hover:text-yellow-400"
                onClick={() => setDropdown(!dropdown)}
              >
                <FaUser /> <span>{username}</span>
              </div>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-gray-900 rounded shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <ul className="md:hidden bg-red-800 text-white px-4 pb-4 space-y-2">
          <li className="flex items-center space-x-1 hover:text-yellow-400">
            <FaHome /> <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
          </li>
          <li className="flex items-center space-x-1 hover:text-yellow-400">
            <FaBoxOpen /> <Link to="/products" onClick={() => setMobileMenu(false)}>Products</Link>
          </li>
          <li className="flex items-center space-x-1 hover:text-yellow-400 relative">
            <FaShoppingCart /> <Link to="/cart" onClick={() => setMobileMenu(false)}>Cart</Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </li>

          {!username ? (
            <>
              <li className="flex items-center space-x-1 hover:text-yellow-400">
                <FaUser /> <Link to="/login" onClick={() => setMobileMenu(false)}>Login</Link>
              </li>
              <li className="flex items-center space-x-1 hover:text-yellow-400">
                <FaUser /> <Link to="/register" onClick={() => setMobileMenu(false)}>Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center space-x-1 hover:text-yellow-400">
                <FaUser /> <Link to="/profile" onClick={() => setMobileMenu(false)}>{username}</Link>
              </li>
              <li>
                <button
                  className="flex items-center space-x-1 hover:text-yellow-400 w-full"
                  onClick={handleLogout}
                >
                  <FaUser /> <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
