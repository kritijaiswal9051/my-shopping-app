import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const addToCart = useCartStore((state) => state.addToCart);
  const [popup, setPopup] = useState(null);

  const handlePopup = (product) => {
    addToCart(product);
    setPopup(product.title);
    setTimeout(() => setPopup(null), 2000);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold text-center underline mb-3">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((product) => (
          <li
            className="flex flex-col rounded-xl border-[3px] border-gray-400 items-center mb-2"
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-[150px] h-[200px] object-contain"
            />
            <h3 className=" text-sm font-semibold text-center my-2">
              {product.title}
            </h3>
            <p className="text-gray-500">Price: {product.price}</p>

            <Button
              onClick={() => handlePopup(product)}
              className="bg-blue-500 hover:bg-blue-700 mb-2 cursor-pointer"
            >
              Add to Cart
            </Button>
          </li>
        ))}
      </ul>
      {popup && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          added to cart !
        </div>
      )}
    </div>
  );
}
