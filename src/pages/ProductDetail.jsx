import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../components/Header";
import { useProducts } from "../hooks/useProducts";
import ErrorComponent from "../components/ErrorComponent";
import LeftSection from "../components/ProductDetails/LeftSection";
import RightSection from "../components/ProductDetails/RightSection";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useProducts();

  const product = data?.data?.data?.find((item) => item?.id === parseInt(id));

  if (loading) return <Loader />;

  if (error) {
    return <ErrorComponent message={error?.message} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden md:flex md:gap-6 p-6 h-full">
          <LeftSection product={product} />

          <RightSection product={product} />
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
