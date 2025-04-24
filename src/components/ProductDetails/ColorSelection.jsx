const ColorSelection = ({ selectedColor, setSelectedColor }) => {
  const colors = ["Red", "Blue", "Black", "Gray", "White"];
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Color</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`border py-2 px-4 rounded font-bold  ${
              selectedColor === color
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
            {selectedColor}
          </span>
        </div>
      )}
    </div>
  );
};

export default ColorSelection;
