import React from "react";

import { client } from "../lib/client";
import Product from "../components/Product";

const Home = ({ products }) => (
  <div>
    <div className="text-center m-3 mt-0 mb-0">
      <h2 className="text-4xl font-bold">Premium Poster Prints</h2>
      <p className="text-xl font-light">Digital Art by T Majid</p>
    </div>

    <div className="flex flex-wrap justify-center gap-4 mt-6 w-screen">
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

export default Home;
