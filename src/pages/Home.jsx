import React, { useEffect } from "react";
// import { useFetchProducts } from "../hooks/useFetchProducts";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Header from "../components/Header";

import { useProducts } from "../hooks/useProducts";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../app/productSlice";

const Home = () => {
  const { items: products } = useSelector((state) => state.products);
  const { data, loading, error } = useProducts();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.status) {
      dispatch(setProducts(data?.data?.data));
    }
  }, [data, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>
        {
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        }
      </main>
    </div>
  );
};

export default Home;

{
  /* {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
  )} */
}
