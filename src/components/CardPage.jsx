import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { updateCartItem, removeFromCart, clearCart } from "../app/cartSlice";
import { Link, Links } from "react-router-dom";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleIncrease = (item) => {
    dispatch(updateCartItem({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItem({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-auto md:w-10/12 mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 py-10 text-center">Your cart is empty.</p>
          ) : (
            <>
              <div className="overflow-x-auto hidden md:block">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Product</th>
                      <th className="text-left py-3 px-4 font-semibold">User Price</th>
                      <th className="text-left py-3 px-4 font-semibold">Size</th>
                      <th className="text-left py-3 px-4 font-semibold">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold">Selected</th>
                      <th className="text-left py-3 px-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img
                              src={`https://admin.refabry.com/storage/product/${item.image}`}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                              }}
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">৳{(item.price * item.quantity).toFixed(2)}</td>
                        <td className="py-4 px-4">{item.selectedSize || "N/A"}</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col sm:flex-row items-center justify-start gap-2">
                            <button
                              onClick={() => handleDecrease(item)}
                              className="bg-gray-800 text-white w-full py-2 rounded-none flex justify-center items-center gap-2 hover:bg-gray-900 transition border-t border-cyan-400 sm:w-10"
                            >
                              -
                            </button>
                            <span className="text-center w-full sm:w-12 border border-gray-300 py-2 rounded">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrease(item)}
                              className="bg-gray-800 text-white w-full py-2 rounded-none flex justify-center items-center gap-2 hover:bg-gray-900 transition border-t border-cyan-400 sm:w-10"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4">৳{(item.price * item.quantity).toFixed(2)}</td>
                        <td className="py-4 px-4">
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

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded shadow border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={`https://admin.refabry.com/storage/product/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />
                      <div>
                        <h2 className="font-semibold">{item.name}</h2>
                        <p className="text-sm text-gray-600">Size: {item.selectedSize || "N/A"}</p>
                        <p className="text-sm font-semibold">৳{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="bg-gray-800 text-white py-1 px-3 rounded hover:bg-gray-900 transition"
                      >
                        -
                      </button>
                      <span className="border px-4 py-1 rounded">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="bg-gray-800 text-white py-1 px-3 rounded hover:bg-gray-900 transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </button>
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    Total Amount: ৳{calculateTotal().toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <Link to={'/checkout'}>
                    <button className="bg-gray-800 text-white px-4 py-[6px] w-full hover:bg-gray-900 transition border-t border-cyan-400">
                      Place Order
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to={'/'}>
                    <button className="bg-green-600 text-white px-4 py-[6px] w-full hover:bg-green-700 transition border-t border-cyan-400">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
