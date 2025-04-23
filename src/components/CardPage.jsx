import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { updateCartItem, removeFromCart, clearCart } from "../app/cartSlice";
import { Link, } from "react-router-dom";
import Cart from "./Cart";

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
    dispatch(removeFromCart({ id }));
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
                {cartItems.map((item) => (
                  <Cart
                    item={item}
                    handleDecrease={handleDecrease}
                    handleIncrease={handleIncrease}
                    handleRemove={handleRemove}
                  />
                ))}
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {cartItems.map((item) => (
                  <Cart
                    item={item}
                    handleDecrease={handleDecrease}
                    handleIncrease={handleIncrease}
                    handleRemove={handleRemove}
                  />
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
