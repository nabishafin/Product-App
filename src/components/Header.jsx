import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-bold text-blue-600 tracking-wide">
          ProductHub
        </Link>

        {/* Navigation (hidden on mobile) */}
        <nav className="hidden sm:flex ">
          <ul className="flex space-x-6 items-center text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-600 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-600 transition duration-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 transition duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Cart Icon */}
        <Link
          to="/cartpage"
          className="relative hover:text-blue-600 transition duration-300 ml-4 sm:ml-0"
        >
          <FiShoppingCart className="text-2xl" />
          {cartItems?.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;

