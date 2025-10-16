import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(localStorage.getItem("wishlistItems")) || []
  );
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    let updatedCart;
    if (exist) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }
    const updatedWishlist = wishlistItems.filter((i) => i.id !== product.id);
    setCartItems(updatedCart);
    setWishlistItems(updatedWishlist);

    // 🔥 Trigger navbar update instantly
    window.dispatchEvent(new Event("cartOrWishlistUpdated"));

    alert(`${product.name} added to cart 🛒`);
    navigate("/cart");
  };

  const handleRemoveWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    window.dispatchEvent(new Event("cartOrWishlistUpdated"));
    alert("Removed from wishlist ❌");
  };

  if (wishlistItems.length === 0)
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Your wishlist is empty!
        </h2>
      </div>
    );

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          ❤️ My Wishlist
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden p-4 text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-700">₹{item.price}</p>
              <p className="text-gray-500">Size: {item.size}</p>

              <div className="flex justify-center gap-2 mt-3">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-yellow-500"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveWishlist(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
