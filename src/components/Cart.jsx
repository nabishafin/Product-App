import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { removeFromCart, updateCartItem } from "../app/cartSlice";
import { useDispatch } from "react-redux";
const Cart = ({ cartItems }) => {
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(updateCartItem({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItem({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse block sm:table">
        <thead className="hidden sm:table-header-group">
          <tr className="border-b">
            <th className="text-center py-3 px-4 font-semibold">Product</th>
            <th className="text-center py-3 px-4 font-semibold">Unit Price</th>
            <th className="text-center py-3 px-4 font-semibold hidden sm:table-cell">
              Size
            </th>
            <th className="text-center py-3 px-4 font-semibold ml-4">
              Quantity
            </th>
            <th className="text-center py-3 px-4 font-semibold hidden sm:table-cell">
              Total Price
            </th>
            <th className="text-center py-3 px-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-b block sm:table-row">
              <td className="py-4 px-4 block sm:table-cell">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://admin.refabry.com/storage/product/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
              </td>
              <td className="py-4 px-4 block sm:table-cell text-center">
                ৳{item.price.toFixed(2)}
              </td>
              <td className="py-4 px-4 hidden sm:table-cell text-center ">
                {item.size || "N/A"}
              </td>
              <td className="py-4 px-4 block sm:table-cell text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                  <button onClick={() => handleDecrease(item)} className=" ">
                    <FaMinus />
                  </button>
                  <span className="text-center w-12 md:w-full border border-gray-300 py-2 rounded ">
                    {item.quantity}
                  </span>
                  <button onClick={() => handleIncrease(item)} className=" ">
                    <FaPlus />
                  </button>
                </div>
              </td>
              <td className="py-4 px-4 hidden sm:table-cell text-center">
                ৳{(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="py-4 px-4 block sm:table-cell text-center">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
