import React from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../app/cartSlice";

const Cart = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ item }));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const imageUrl = item.product_images?.[0] || "https://via.placeholder.com/300x300?text=No+Image"; // Fallback image if no image available

  console.log("Image URL:", imageUrl);  // Log the image URL to debug

  return (
    <div className="flex gap-4 items-center p-4 border rounded-2xl shadow hover:shadow-md transition">
      <div className="relative w-20 h-20">
        <img
          src={imageUrl}
          alt={item.name || "Product Image"}
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            console.log("Image load error, using fallback.");
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category?.name}</p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleDecrease}
            className="p-1 rounded-full border hover:bg-gray-100"
          >
            <FiMinus className="text-gray-600" />
          </button>

          <span className="text-md font-medium">{item.quantity}</span>

          <button
            onClick={handleIncrease}
            className="p-1 rounded-full border hover:bg-gray-100"
          >
            <FiPlus className="text-gray-600" />
          </button>
        </div>

        <div className="mt-2 text-sm text-gray-700">
          <span className="font-semibold">Price:</span> ৳{item.price.toLocaleString()}
        </div>
        <div className="text-sm font-bold text-gray-800">
          <span>Total:</span> ৳{(item.price * item.quantity).toLocaleString()}
        </div>
      </div>

      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-600"
        title="Remove Item"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  );
};

export default Cart;
