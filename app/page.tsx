"use client"
import { useState, useRef, useEffect } from "react";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
// import { getAllProducts } from "@/lib/actions";
import { Product } from "@/types";
import ProductDetails from "@/components/ProductDetails";
import HeroCarousel from "@/components/HeroCarousel";

const Home = () => {
  //const allProducts = await getAllProducts();
  const [productData, setProductData] = useState<Product | null>(null);
  const productDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productData && productDetailsRef.current) {
      productDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [productData]);

  return (
    <>
      <section className="px-6 md:px-20 pt-15">
        <div className="flex max-xl:flex-col gap-16 mb-6">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> Better One</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>

            <Searchbar setProductData={setProductData} />
          </div>

          <HeroCarousel />
        </div>
      </section>

      {/* <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section> */}
      
      {productData && 
        <div ref={productDetailsRef}>
          <ProductDetails product={productData} />
        </div>
      }
    </>
  );
};

export default Home;
