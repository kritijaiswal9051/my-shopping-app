import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="p-4">
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500 font-semibold underline">
          Home
        </Link>
        <Link to="/cart" className="text-blue-500 font-semibold underline">
          Cart
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
