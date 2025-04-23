import React from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
const Cart = ({ item, handleDecrease, handleRemove, handleIncrease }) => {
    const { id } = item;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse block sm:table">
                <thead className="hidden sm:table-header-group">
                    <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Product</th>
                        <th className="text-left py-3 px-4 font-semibold">User Price</th>
                        <th className="text-left py-3 px-4 font-semibold hidden sm:table-cell">Size</th>
                        <th className="text-left py-3 px-4 font-semibold ml-4">Quantity</th>
                        <th className="text-left py-3 px-4 font-semibold hidden sm:table-cell">Selected</th>
                        <th className="text-left py-3 px-4 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={item.id} className="border-b block sm:table-row">
                        <td className="py-4 px-4 block sm:table-cell">
                            <div className="flex items-center gap-4">
                                <img
                                    src={`https://admin.refabry.com/storage/product/${item.image}`}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                                    }}
                                />
                                <span className="font-medium">{item.name}</span>
                            </div>
                        </td>
                        <td className="py-4 px-4 block sm:table-cell">৳{(item.price * item.quantity).toFixed(2)}</td>
                        <td className="py-4 px-4 hidden sm:table-cell">{item.selectedSize || "N/A"}</td>
                        <td className="py-4 px-4 block sm:table-cell">
                            <div className="flex flex-col sm:flex-row items-center justify-start  gap-2">
                                <button
                                    onClick={() => handleDecrease(item)}
                                    className=" "
                                >
                                    <FaMinus />
                                </button>
                                <span className="text-center w-full sm:w-12 border border-gray-300 py-2 rounded ">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => handleIncrease(item)}
                                    className=" "
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </td>
                        <td className="py-4 px-4 hidden sm:table-cell">
                            ৳{(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-4 px-4 block sm:table-cell">
                            <button
                                onClick={() => handleRemove(id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Cart;
