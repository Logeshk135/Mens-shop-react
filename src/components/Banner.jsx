import React, { useState, useEffect } from "react";
import shirtImg from "../assets/shirt.jpg";
import pantImg from "../assets/pant.jpg";
import beltImg from "../assets/beltbaner.jpg";
import denim from "../assets/denimbaner.jpg";

const slides = [
  { id: 1, image: shirtImg, text: "Stylish Shirts Collection" },
  { id: 2, image: pantImg, text: "Trendy Pants for Men" },
  { id: 3, image: beltImg, text: "Premium Leather Belts" },
  { id: 4, image: denim, text: "Premium Denim Shirt" }
];


const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
        >
          <img src={slide.image} alt={slide.text} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">{slide.text}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
