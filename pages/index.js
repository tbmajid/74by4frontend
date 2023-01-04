import React from "react";

import { client } from "../lib/client";
import Product from "../components/Product";
import Link from "next/link";

const Home = ({ products }) => (
  <>
    <div>
      <div className="hero flex flex-col justify-center items-center h-80">
        <div className=" flex flex-col md:flex-row justify-between items-center text-center">
          <div className="text-4xl text-white font-bold p-2">
            Homemade Mordern Art Prints
          </div>
          <p className="text-sm text-white p-2 font-light max-w-md">
            Fill your home with inspirational art! Our posters are created from
            quality materials printed in the United Kingdom.
          </p>
        </div>{" "}
        <button className="p-2 border-none  bg-black text-white rounded-lg mt-5 text-xl cursor-pointer w-44">
          <Link href="#gallery">Shop Now </Link>
        </button>
      </div>

      <div
        id="gallery"
        className="flex flex-wrap justify-center gap-4 mt-6 w-screen"
      >
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  </>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

export default Home;
