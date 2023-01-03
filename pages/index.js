import React from "react";

import { client } from "../lib/client";
import Product from "../components/Product";

const Home = ({ products }) => (
  <>
    <div>
      <div className=" flex flex-col md:flex-row justify-center items-center hero h-80 text-center">
        <h2 className="text-4xl text-white font-bold p-2">
          Homemade Mordern Art Prints
        </h2>
        <p className="text-sm text-white p-2 font-light max-w-md">
          Fill your home with inspirational art that inspires you to keep your
          head up! Our posters are created from quality materials printed in the
          United Kingdom. The museum-grade paper ensures that any design will
          not corrode with time.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6 w-screen">
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
