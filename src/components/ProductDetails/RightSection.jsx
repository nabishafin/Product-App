import { useState } from "react";
import SizeSelection from "./SizeSelection";
import ColorSelection from "./ColorSelection";
import AddtoCart from "./AddtoCart";

const RightSection = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className="md:w-1/2 flex flex-col h-full">
      <div className="flex-grow overflow-y-auto pr-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {product?.name || "Product Name"}
        </h1>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product?.price || "0.00"}
          </span>
        </div>

        <SizeSelection
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <ColorSelection
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        <AddtoCart
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />

        <div className="border-t border-gray-200 my-4"></div>

        {/* Detailed Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Detailed Description
          </h3>

          <div className="whitespace-pre-line">{product?.short_desc}</div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>
      </div>
    </div>
  );
};

export default RightSection;
