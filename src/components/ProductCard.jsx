import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const imageUrl = `https://admin.refabry.com/storage/product/${product.image}`;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const discountPercentage = 0.1; // 10% discount
  const discountedPrice = product.price * (1 - discountPercentage);
  const discountAmount = product.original_price
    ? product.original_price - discountedPrice
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="relative border border-blue-100 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* SALE Badge */}
      {discountAmount > 0 && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 z-10">
          SALE
        </div>
      )}

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
            <span className="bg-black py-[2px] px-3 text-white text-sm">save 10%</span>
            <span className="text-red-500 line-through">৳{product.price}</span>
            <span className="text-black px-4 py-[1px]">৳{discountedPrice.toFixed(2)}</span>
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
