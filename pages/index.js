import React from "react";

import { client } from "../lib/client";
import Product from "../components/Product";

const Home = ({ products }) => (
  <>
    <div>
      <div className=" flex flex-col md:flex-row justify-center items-center hero h-80 text-center">
        <h2 className="text-4xl text-white font-bold p-2">
          HOMEMADE POSTER PRINTS
        </h2>
        <p className="text-md text-white p-2 font-light max-w-md">
          Our posters are created from quality materials printed in the United
          Kingdom. The museum-grade paper ensures that any design won't corrode
          with time. The pigment inks used to represent various colours are
          bright and intense. These posters are hangable with double-sided tape,
          tacks, or via framing. .: 175 gsm fine art paper .: For indoor use .:
          Multiple sizes .: Free and fast delivery to the UK
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
