import { useCartStore } from "../store/cartStore";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCartStore();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 items-center border rounded-lg p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 object-cover rounded col-span-1"
              />
              <div className="col-span-2">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="col-span-1 flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                >
                  -
                </button>
                <span className="px-4 text-lg font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                >
                  +
                </button>
              </div>
              <Button
                onClick={() => removeFromCart(item.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded col-span-1"
              >
                Remove
              </Button>
            </div>
          ))}
          <h2 className="text-2xl font-bold text-right mt-6">
            Total: ${totalPrice.toFixed(2)}
          </h2>
        </div>
      )}
    </div>
  );
}
