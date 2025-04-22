import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../app/cartSlice";
import { FiShoppingCart, FiEye } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const imageUrl = `https://admin.refabry.com/storage/product/${product.image}`;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      <div className="relative h-52 bg-gray-100">
        <img
          src={imageUrl || ""}
          alt={product.name}
          className="w-full h-full object-cover transition duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-md font-semibold text-gray-800 truncate">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-black  text-lg">
            <span className="text-blue-600">$</span>{product.price}
          </span>
          {product.original_price && (
            <span className="text-sm text-gray-400 line-through">
              ${product.original_price}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-200">
          <Link
            to={`/product/${product.id}`}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition duration-300"
          >
            <FiEye />
            View
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition duration-300"
          >
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
