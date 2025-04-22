import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const CardPage = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          {cartItems.length > 0 && (
            <button className="text-red-500 text-sm hover:underline">
              Remove all
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <Cart key={item.id} item={item} />
              ))}
            </div>

            <div className="border-t mt-6 pt-4 flex justify-between items-center">
              <div className="text-gray-600 text-sm">
                Sub-Total <span className="ml-1 text-xs">({cartItems.length} items)</span>
              </div>
              <div className="text-xl font-bold text-gray-800">
                ৳{calculateSubtotal().toLocaleString()}
              </div>
            </div>

            <button className="mt-4 w-full bg-blue-500 text-white py-3 rounded-xl font-medium shadow hover:bg-blue-600 transition duration-300">
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CardPage;
