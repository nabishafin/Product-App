import React, { useState } from "react";
import { useSelector } from "react-redux";
import { post } from "../api/api";
import toast from "react-hot-toast";
import Loader from "./Loader";
import LoadingSVG from "../SVGs/LoadingSVG";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [note, setNote] = useState("");
  const [courier, setCourier] = useState("steadfast");

  const productIds = cartItems.map((item) => item.id).join(",");
  const productQtys = cartItems.map((item) => item.quantity).join(",");
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const orderData = {
    product_ids: productIds,
    s_product_qty: productQtys,
    c_phone: phone,
    c_name: fullName,
    courier,
    address: address,
    advance: null,
    cod_amount: totalAmount,
    discount_amount: null,
    delivery_charge: 60,
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      setLoading(true);
      const response = await post("/api/public/order/create", orderData);
      console.log("Order placed successfully:", response.data);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error.message);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="bg-white rounded-md shadow-md p-6"
        onSubmit={(e) => handlePlaceOrder(e)}
      >
        <h2 className="text-xl font-semibold mb-4">Checkout Info</h2>

        {/* Contact Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="full-name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Full Name
              </label>
              <input
                required
                type="text"
                id="full-name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                required
                type="tel"
                id="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Info</h3>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Detailed Address
            </label>
            <textarea
              required
              id="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Courier Selection */}
          <div className="mt-4">
            <label
              htmlFor="courier"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Courier
            </label>
            <select
              id="courier"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
            >
              <option value="steadfast">Steadfast</option>
              <option value="pathao">Pathao</option>
              <option value="redx">RedX</option>
              <option value="ecourier">eCourier</option>
              <option value="paperfly">Paperfly</option>
            </select>
          </div>
        </div>

        {/* Note for Seller */}
        <div className="mb-4">
          <label
            htmlFor="note"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Note for Seller (optional)
          </label>
          <textarea
            id="note"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Place Order Button */}
        <button
          className="bg-gray-800 text-white w-full py-2 rounded-none flex justify-center items-center gap-2 hover:bg-gray-900 transition border-t border-cyan-400"
          type="submit"
          disabled={loading}
        >
          Place Order {loading ? <LoadingSVG /> : ""}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
