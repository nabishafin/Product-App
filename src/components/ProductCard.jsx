import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";



const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const imageUrl = `https://admin.refabry.com/storage/product/${product.image}`;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Order Placed Successfully!");
  };



  return (
    <Link
      to={`/product/${product.id}`}
      className="relative border border-blue-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >

      {/* Product Image */}
      <div className="bg-gray-100 h-64 flex justify-center items-center">
        <img
          src={imageUrl || "https://via.placeholder.com/300x300?text=No+Image"}
          alt={product.name}
          className="object-cover h-full w-full"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/300x300?text=No+Image")
          }
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between flex-grow">
        <div className="p-4 text-center space-y-2">
          <h3 className="text-md font-semibold text-gray-700">{product.name}</h3>
          <div className="flex flex-col justify-center items-center gap-1 text-sm">


            <span className="text-black px-4 py-[1px]">৳{product.price}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // prevent Link navigation
            e.stopPropagation(); // stop event bubbling to Link
            handleAddToCart();
          }}
          className="bg-gray-800 text-white w-full py-2 rounded-none flex justify-center items-center gap-2 hover:bg-gray-900 transition border-t border-cyan-400"
        >
          <FiShoppingCart className="text-white" />
          <span className="font-semibold">Add to Cart</span>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
