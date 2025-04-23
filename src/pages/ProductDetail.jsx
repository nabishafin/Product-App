import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../components/Header";
import { useProducts } from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const { data, loading, error } = useProducts();

  const product = data?.data?.data?.find((item) => item?.id === parseInt(id));
  const imageUrl = `https://admin.refabry.com/storage/product/${product?.image}`;

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
      selectedSize,
      selectedColor,
      quantity
    };

    dispatch(addToCart(cartItem));
    toast.success("Item added to cart!");
    navigate("/cart");
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  if (loading) return <Loader />;
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-500 text-lg font-semibold">
          Error: {error.message}
        </div>
      </div>
    );
  }

  const sizes = product?.variation_combinations?.find(v => v.size)
    ? product.variation_combinations.map(v => v.size).filter(Boolean)
    : ['M(28-30)', 'L(32-34)', 'XL(36-38)', 'ZXL(38-42)'];

  const specifications = product?.specifications
    ? product.specifications.split("\n").filter(item => item.trim() !== "")
    : [
      "Made of 100% Cotton",
      "Covered 100% Cotton waistband (knit fabric)",
      "Drawstring for an adjustable fit",
      "Convenient side seam pockets",
      "An extra layer of Gray Melange on top of the waistband.",
      "Soft material for comfort",
      "Durable tightly coupled stitches",
      "Locked open-ended wholes for durability",
      "Fabric type: Plain fabric",
      "G.S.M.: 110-125",
      "Yarn count: 40/40"
    ];

  const sizeChart = {
    measurements: ["Half-Thigh (inch)", "Length (inch)"],
    sizes: ["M", "L", "XL", "ZXL"],
    values: [
      ["12.0", "12.4", "12.8", "12.6"],
      ["37", "38", "39", "40"]
    ]
  };

  const colors = ["Red", "Blue", "Black", "Gray", "White"];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden md:flex md:gap-6 p-6 h-full">
          {/* Left Section: Image */}
          <div className="md:w-1/2 flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-lg mb-4 overflow-hidden">
              <img
                src={imageUrl}
                alt={product?.name}
                className="max-h-[800px] w-full object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
                }}
              />
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div className="md:w-1/2 flex flex-col h-full">
            <div className="flex-grow overflow-y-auto pr-2">

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product?.name || "Mens Premium Trouser"}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  ${product?.price || "99.00"}
                </span>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Size</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`border py-2 px-4 rounded font-bold w-full ${selectedSize === size
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300"
                        }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <div className="mt-2">
                    <span className="inline-block bg-blue-50 text-blue-600 font-semibold py-2 px-4 rounded-lg border border-blue-600 shadow">
                      {selectedSize}
                    </span>
                  </div>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Color</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`border py-2 px-4 rounded font-bold  ${selectedColor === color
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300"
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                {selectedColor && (
                  <div className="mt-2">
                    <span className="inline-block bg-blue-50 text-blue-600 font-semibold py-2 px-4 rounded-lg border border-blue-600 shadow">
                      Selected Color: {selectedColor}
                    </span>
                  </div>
                )}
              </div>

              {/* Quantity & Add to Cart */}
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
                  + Add To Cart
                </button>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              {/* Detailed Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Detailed Description</h3>

                <div key={product?.id} className="whitespace-pre-line">
                  {product?.short_desc}
                </div>

              </div>

              <div className="border-t border-gray-200 my-4"></div>


            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
