const ProductImage = ({ product }) => {
  const imageUrl = `https://admin.refabry.com/storage/product/${product.image}`;
  return (
    <div className="bg-gray-100 h-64 flex justify-center items-center">
      <img
        src={imageUrl || ""}
        alt={product?.name || "product"}
        className="object-cover h-full w-full"
      />
    </div>
  );
};

export default ProductImage;
