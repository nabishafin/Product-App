import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Header from "../components/Header";
import OrderModal from "../components/OrderModal";
import { useProducts } from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";

const ProductDetail = () => {

  const dispatch = useDispatch();


  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };


  const { id } = useParams();
  const { data, loading, error } = useProducts();
  // const [showOrderModal, setShowOrderModal] = useState(false);

  const product = data?.data?.data?.find((item) => item?.id === parseInt(id));
  const imageUrl = `https://admin.refabry.com/storage/product/${product?.image}`;

  // const handlePlaceOrder = async (orderData) => {
  //   try {
  //     await axios.post(
  //       "https://admin.refabry.com/api/public/order/create",
  //       orderData
  //     );
  //     alert("Order placed successfully!");
  //     setShowOrderModal(false);
  //   } catch (error) {
  //     alert("Failed to place order. Please try again.");
  //   }
  // };

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

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden md:flex md:gap-6 p-6 h-full">
          {/* Left Section: Image Carousel */}
          <div className="md:w-1/2 flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-lg mb-4 overflow-hidden">
              <img
                src={imageUrl}
                alt={product?.name}
                className="max-h-[800px] w-full object-contain"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x600?text=No+Image";
                }}
              />
            </div>


          </div>

          {/* Right Section: Product Details */}
          <div className="md:w-1/2 flex flex-col h-full">
            <div className="flex-grow overflow-y-auto pr-2">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product?.name}</h1>

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-2xl font-bold text-blue-600">${product?.price}</span>
                {product?.discount_amount && (
                  <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
                    -${product?.discount_amount}
                  </span>
                )}
                {product?.buying_price && (
                  <span className="text-sm text-gray-500">Buying Price: ${product.buying_price}</span>
                )}
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6 p-3 bg-gray-50 rounded-lg">
                <div><strong>Category:</strong> {product?.category?.name || "N/A"}</div>
                <div><strong>Code:</strong> {product?.code || "N/A"}</div>
                <div><strong>Stock:</strong> {product?.stock || "N/A"}</div>
                <div><strong>Published:</strong> {product?.is_published ? "Yes" : "No"}</div>
                {product?.discount_date && <div><strong>Discount Date:</strong> {product.discount_date}</div>}
                <div><strong>Pre Order:</strong> {product?.pre_order || "N/A"}</div>
              </div>

              {/* Short Description */}
              {product?.short_desc && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Highlights</h3>
                  <div className="whitespace-pre-line text-gray-700 bg-gray-50 p-3 rounded-md border">
                    {product.short_desc}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {product?.specifications && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Specifications</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {product.specifications.split("\n").map((spec, idx) => (
                      <li key={idx}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Variations */}
              {product?.variation_combinations?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Variations</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variation_combinations.map((combo, idx) => (
                      <div key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {Object.entries(combo).map(([key, value]) => (
                          <span key={key}>{key}: {value}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button - Sticky at the bottom */}
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={() => handleAddToCart()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow hover:shadow-lg transition duration-300"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Order Modal */}
      {/* {showOrderModal && (
        <OrderModal
          product={product}
          onClose={() => setShowOrderModal(false)}
          onSubmit={handlePlaceOrder}
        />
      )} */}
    </div>
  );
};

export default ProductDetail;