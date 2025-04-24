const LeftSection = ({ product }) => {
  const imageUrl = `https://admin.refabry.com/storage/product/${product?.image}`;
  return (
    <div className="md:w-1/2 flex flex-col h-full">
      <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-lg mb-4 overflow-hidden">
        <img
          src={imageUrl || ""}
          alt={product?.name}
          className="max-h-[800px] w-full object-contain"
        />
      </div>
    </div>
  );
};

export default LeftSection;
