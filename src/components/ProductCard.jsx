import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="relative border border-blue-100 rounded-md shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </Link>
  );
};

export default ProductCard;
