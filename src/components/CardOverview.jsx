import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CardOverview = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const deliveryCharge = 60;
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const payableAmount = totalAmount + deliveryCharge;

  return (
    <div>
      <div className="bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cart Overview</h2>
          <Link to="/cart">
            <button className="text-blue-500 text-sm">Modify Order</button>
          </Link>
        </div>

        {/* Cart Items */}
        <ul>
          {cartItems?.map((item) => (
            <li key={item.id} className="flex items-center py-2 border-b">
              <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                <img
                  src={`https://admin.refabry.com/storage/product/${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-gray-800 text-sm">{item.name}</p>
                <p className="text-gray-600 text-xs">
                  ({item.quantity} x ৳{item.price})
                </p>
              </div>
              <div className="ml-auto text-gray-900">
                ৳{item.price * item.quantity}
              </div>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <div className="mt-4">
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-semibold">Total:</span>
            <span className="text-gray-900">৳{totalAmount}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-semibold">Shipping (+):</span>
            <span className="text-gray-900">৳{deliveryCharge}</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg">
            <span>Payable:</span>
            <span>৳{payableAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOverview;
