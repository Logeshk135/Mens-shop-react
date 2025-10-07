import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import casual from "../assets/casual.jpg"
import formal from "../assets/formal.jpg"
import denim from "../assets/denim.jpg"
import belt  from "../assets/belt.jpg"

const products = [
  { id: 1, name: "Casual Shirt", price: 1200, image:  casual },
  { id: 2, name: "Formal Pant", price: 1500, image: formal },
  { id: 3, name: "Leather Belt", price: 800, image: belt },
  { id: 4, name: "Denim Shirt", price: 2000, image: denim },
];

const Home = () => {
  return (
    <div>
      <Banner />
      <h2 className="text-2xl font-bold text-center mt-8 mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
