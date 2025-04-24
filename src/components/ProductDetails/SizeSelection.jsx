const SizeSelection = ({ selectedSize, setSelectedSize }) => {
  const sizes = ["M (28-30)", "L (32-34)", "XL (36-38)", "XXL (38-42)"];
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Size</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`border py-2 px-4 rounded font-bold w-full ${
              selectedSize === size
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
  );
};

export default SizeSelection;
