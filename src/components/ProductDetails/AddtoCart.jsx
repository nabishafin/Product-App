import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../app/cartSlice";
import { useState } from "react";

const AddtoCart = ({ product, selectedSize, selectedColor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const cartItem = {
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    };

    dispatch(addToCart(cartItem));
    toast.success("Item added to cart!");
    navigate("/cart");
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center border border-gray-300 rounded">
        <button
          className="px-3 py-1 font-bold text-xl"
          onClick={decrementQuantity}
        >
          -
        </button>
        <span className="px-3 py-1 font-bold">{quantity}</span>
        <button
          className="px-3 py-1 font-bold text-xl"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>
      <button
        className="bg-gray-800 text-white  px-4 py-[6px]  hover:bg-gray-900 transition border-t border-cyan-40"
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default AddtoCart;
