import React, { useState, useEffect } from "react";
import shirt1 from "../assets/casual1.jpg";
import shirt2 from "../assets/checkedflannel.jpg";
import shirt3 from "../assets/LinenSummerShirt.jpg";
import shirt4 from "../assets/plainshirt.jpg";
import shirt5 from "../assets/LinenLightBeigeShirt.jpg";
import shirt6 from "../assets/PrintedFloralShirt.jpg";
import shirt7 from "../assets/DarkBlackCasualShirt.jpg";
import shirt8 from "../assets/PastelGreenSummerShirt.jpg";
import shirt9 from "../assets/GreyOxfordShirt.jpg";
import shirt10 from "../assets/NavyBlueSolidShirt.jpg";
import shirt11 from "../assets/LightPinkFormalCasual.jpg";
import shirt12 from "../assets/ShortSleevePrint.jpg";
import casual from "../assets/casual.jpg";
import denim from "../assets/denim.jpg";
import denim1 from "../assets/denim1.jpg";
import denim2 from "../assets/denim2.jpg";
import denim3 from "../assets/denim3.jpg";
import denim4 from "../assets/denim4.jpg";
import blackdenim from "../assets/blackdenim.jpg";
import denimwestrenshirt from "../assets/denimwestrenshirt.jpg";
import belt from "../assets/belt.jpg";
import Adaptable from "../assets/Adaptable.jpg";
import belt1 from "../assets/belt1.jpg";
import formalbelt from "../assets/formalbelt.jpg";
import formalbelt2 from "../assets/formalbelt2.jpg";
import pant1 from "../assets/CargoPants.jpg";
import pant2 from "../assets/DenimJeans.jpg";
import pant3 from "../assets/FormalTrousers.jpg";
import pant4 from "../assets/JoggerPants.jpg";
import pant5 from "../assets/LinenPant.jpg";
import pant6 from "../assets/PleatedPants.jpg";
import pant8 from "../assets/RegularFitJeanspant.jpg";
import pant9 from "../assets/SlimFitChinospant.jpg";
import pant10 from "../assets/Stretchfitjeanspant.jpg";
import pant11 from "../assets/StraightFitPants.jpg";
import pant12 from "../assets/formal.jpg";
import { Link } from "react-router-dom";

const allProducts = [
  { id: 1, name: "Striped Casual Shirt", category: "Shirt", price: 799, size: "M", image: shirt1 },
  { id: 2, name: "Checked Flannel", category: "Shirt", price: 899, size: "L", image: shirt2 },
  { id: 3, name: "Linen Summer Shirt", category: "Shirt", price: 899, size: "XL", image: shirt3 },
  { id: 4, name: "Plain Shirt", category: "Shirt", price: 849, size: "M", image: shirt4 },
  { id: 5, name: "Linen Light Beige Shirt", category: "Shirt", price: 1500, size: "L", image: shirt5 },
  { id: 6, name: "Printed Floral Shirt", category: "Shirt", price: 2000, size: "XL", image: shirt6 },
  { id: 7, name: "DarkBlack CasualShirt", category: "Shirt", price: 800, size: "XL", image: shirt7 },
  { id: 8, name: "PastelGreen SummerShirt", category: "Shirt", price: 800, size: "XXL", image: shirt8 },
  { id: 9, name: "Grey Oxford Shirt", category: "Shirt", price: 800, size: "XL", image: shirt9 },
  { id: 10, name: "Navy BlueSolid Shirt", category: "Shirt", price: 900, size: "XXL", image: shirt10 },
  { id: 11, name: "Light PinkFormal Casual", category: "Shirt", price: 800, size: "XL", image: shirt11 },
  { id: 12, name: "Short Sleeve Print", category: "Shirt", price: 999, size: "XL", image: shirt12 },
  { id: 35, name: "Casual Shirt", category: "Shirt", price: 799, size: "M", image: casual },
  { id: 13, name: "Blue denim Shirt", category: "Denim", price: 1299, size: "XL", image: denim },
    { id: 14, name: "Blue white Shirt", category: "Denim", price: 1299, size: "L", image: denim1 },
    { id: 15, name: " Dray Denim Shirt", category: "Denim", price: 1299, size: "XL", image: denim2 },
    { id: 16, name: " Jeans Denim Shirt", category: "Denim", price: 1299, size: "XXL", image: denim3 },
    { id: 17, name: "Cotton Denim Shirt", category: "Denim", price: 1299, size: "XXXL", image: denim4 },
    { id: 18, name: " Light Dray Denim Shirt", category: "Denim", price: 1299, size: "XXL", image: denimwestrenshirt },
    { id: 19, name: "Black Denim", category: "Denim", price: 1299, size: "XXL", image: blackdenim },
  { id: 20, name: "Leather Belt", category: "Belt", price: 800, size: "One Size", image: belt },
  { id: 21, name: "Adaptable Belt", category: "Belt", price: 800, size: "One Size", image:  Adaptable },
  { id: 22, name: "Leather Belt", category: "Belt", price: 800, size: "One Size", image: belt1 },
  { id: 23, name: "Formal Belt", category: "Belt", price: 800, size: "One Size", image: formalbelt },
  { id: 24, name: "Formal Belt", category: "Belt", price: 800, size: "One Size", image: formalbelt2 },
  { id: 25, name: "Cargo Pants", category: "Pant", price: 999, size: "M", image: pant1 },
  { id: 26, name: "Denim Jeans", category: "Pant", price: 1299, size: "L", image: pant2 },
  { id: 27, name: "Formal Trousers", category: "Pant", price: 1499, size: "XL", image: pant3 },
  { id: 28, name: "Jogger Pants", category: "Pant", price: 899, size: "M", image: pant4 },
  { id: 29, name: "Linen Pant", category: "Pant", price: 1199, size: "L", image: pant5 },
  { id: 30, name: "Pleated Pants", category: "Pant", price: 1399, size: "XL", image: pant6 },
  { id: 31, name: "Regular Fit Jeanspant", category: "Pant", price: 1299, size: "L", image: pant8 },
  { id: 32, name: "Slim Fit Chino Pant", category: "Pant", price: 1299, size: "XL", image: pant9 },
  { id: 33, name: "Streight Fit JeansPant", category: "Pant", price: 1299, size: "XXL", image: pant10 },
  { id: 34, name: "Straight Fit Pants", category: "Pant", price: 1299, size: "XXXL", image: pant11 },
  { id: 36, name:"Formal Pants", category: "Pant", price: 1299, size: "L", image: pant12 },
  
];

export default function CasualShirtProducts() {
  const [category, setCategory] = useState("All");
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(localStorage.getItem("wishlistItems")) || []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const filteredProducts = allProducts.filter(
    (p) => category === "All" || p.category.toLowerCase() === category.toLowerCase()
  );

   const handleAddCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    let updatedCart;
    if (exist) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }
    setCartItems(updatedCart);
  };

  // 🩵 ADD TO WISHLIST FUNCTION
  const handleAddWishlist = (product) => {
    const exist = wishlistItems.find((item) => item.id === product.id);
    if (exist) {
      alert("Already in wishlist!");
    } else {
      const updatedWishlist = [...wishlistItems, product];
      setWishlistItems(updatedWishlist);
      alert("Added to wishlist ❤️");
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            <span className="text-red-500">Products</span> Collection
          </h2>
          <div className="flex gap-4">
            <Link to="/wishlist">
              <span className="px-3 py-1 bg-pink-500 text-white rounded">
                ❤️ Wishlist: {wishlistCount}
              </span>
            </Link>
            <Link to="/cart">
              <span className="px-3 py-1 bg-yellow-500 text-black rounded">
                🛒 Cart: {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-6 space-x-4">
          {["All", "Shirt", "Pant", "Belt", "Denim"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded ${
                category === cat ? "bg-yellow-500 text-white" : "bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-lg overflow-hidden p-4 text-center"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg">{p.name}</h3>
              <p className="text-gray-700">₹{p.price}</p>
              <p className="text-gray-500">Size: {p.size}</p>
              <button
                onClick={() => handleAddCart(p)}
                className="mt-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-yellow-500"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddWishlist(p)}
                className="mt-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-400 ml-2"
              >
                Wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}