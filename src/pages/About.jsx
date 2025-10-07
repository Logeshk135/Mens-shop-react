import React from "react";
import aboutImage from "../assets/loginbg.png";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-2 py-20">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-900">About Dravon Men's Shop</h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img 
          src={aboutImage} 
          alt="Dravon Men's Shop" 
          className="w-full md:w-1/2 rounded shadow-lg"
        />

        <div className="md:w-1/2 text-gray-800">
          <p className="mb-4">
            Welcome to <span className="font-bold text-red-600">Dravon Men's Shop</span>, your ultimate destination for stylish, high-quality men's fashion. We specialize in casual and formal wear, footwear, and accessories that perfectly blend comfort, elegance, and modern trends.
          </p>
          <p className="mb-4">
            Our mission is to make every man feel confident and fashionable, whether you're heading to a business meeting, a casual outing, or a special event. At Dravon, we believe in premium fabrics, fine tailoring, and attention to every detail.
          </p>
          <p className="mb-4">
            We’re proud to offer personalized customer service and an experience that goes beyond shopping — a lifestyle curated for the modern man.
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Our Address</h3>
            <p>Dravon Men's Shop</p>
            <p>123 Fashion Street</p>
            <p>Chennai, Tamil Nadu 600001</p>
            <p>India</p>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-900">Our Vision</h2>
        <p className="text-gray-700">
          To become the most trusted brand in men’s fashion, delivering exceptional style, quality, and service, and empowering men to look and feel their best every day.
        </p>
      </div>
    </div>
  );
}
