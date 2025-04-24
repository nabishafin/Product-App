import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Order Placed Successfully!");
  };

  return (
    <div className="flex flex-col justify-between flex-grow">
      <div className="p-4 text-center space-y-2">
        <h3 className="text-md font-semibold text-gray-700">{product?.name}</h3>
        <div className="flex flex-col justify-center items-center gap-1 text-sm">
          <span className="text-black px-4 py-[1px]">৳{product?.price}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => handleAddToCart(e)}
        className="bg-gray-800 text-white w-full py-2 rounded-none flex justify-center items-center gap-2 hover:bg-gray-900 transition border-t border-cyan-400"
      >
        <FiShoppingCart className="text-white" />
        <span className="font-semibold">Add to Cart</span>
      </button>
    </div>
  );
};

export default ProductInfo;
