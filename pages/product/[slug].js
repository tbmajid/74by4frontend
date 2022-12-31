import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import { client, urlFor } from "../../lib/client";

import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  const { decQty, incQty, qty, onAdd, setShowCart, size, setSize } =
    useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-start sm:gap-40 m-20 ml-5 md:ml-20 mb-1">
        <div>
          <div>
            <img
              src={urlFor(image && image[index])}
              className="max-w-sm cursor-pointer self-center"
            />
          </div>
          <div className="flex gap-2.5 mt-3">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index
                    ? "cursor-pointer w-16 h-16"
                    : "cursor-pointer w-16 h-16 bg-red-900"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1>{name}</h1>

          <div className="text-sm py-3">Product Description: </div>
          <p>{details}</p>
          <p>
            <div className="p-1 text-sm mt-2">Select Size: </div>
            <div className="flex">
              <button
                className={
                  size === 0
                    ? "mb-2 p-2 m-1 rounded-lg text-lg mt-3 bg-white border-solid border-blue-600 cursor-pointer"
                    : "shadow-none rounded-lg mb-2 p-2 m-1 border-solid border-slate-200 bg-white text-lg mt-3 cursor-pointer"
                }
                onClick={() => setSize(0)}
              >
                A4
                <br />
                <span className="text-sm"> 21 x 29.7 cm</span>
                <br />
                <span className="text-sm"> 16.5 x 23.4 inches</span>
              </button>
              <button
                className={
                  size === 1
                    ? "mb-2 p-2 m-1 rounded-lg text-lg mt-3 bg-white border-solid border-blue-600 cursor-pointer"
                    : "shadow-none rounded-lg mb-2 p-2 m-1 border-solid border-slate-200 bg-white text-lg mt-3 cursor-pointer"
                }
                onClick={() => setSize(1)}
              >
                A3
                <br />
                <span className="text-sm"> 21 x 29.7 cm</span>
                <br />
                <span className="text-sm"> 16.5 x 23.4 inches</span>
              </button>
              <button
                className={
                  size === 2
                    ? "mb-2 p-2 m-1 rounded-lg text-lg mt-3 bg-white border-solid border-blue-600 cursor-pointer"
                    : "shadow-none rounded-lg mb-2 p-2 m-1 border-solid border-slate-200 bg-white text-lg mt-3 cursor-pointer"
                }
                onClick={() => setSize(2)}
              >
                A2
                <br />
                <span className="text-sm"> 21 x 29.7 cm</span>
                <br />
                <span className="text-sm"> 16.5 x 23.4 inches</span>
              </button>
            </div>
          </p>
          <p className="font-bold text-2xl lg:mt-12">£{price[size]}</p>
          <div className="flex gap-5 mt-3 items-center text-xl">
            <h3>Quantity:</h3>
            <p className="flex justify-center items-center">
              <span onClick={decQty}>
                <AiOutlineMinusCircle size={32} />
              </span>
              <span className="w-6 text-center mt-0 pt-0">{qty}</span>
              <span onClick={incQty}>
                <AiOutlinePlusCircle size={32} />
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="p-2 border-none  bg-black text-white rounded-lg mt-5 text-xl cursor-pointer w-44"
              onClick={() => onAdd(product, qty)}
            >
              Add to Basket
            </button>
            <button
              type="button"
              className="p-2 bg-black text-white border-none rounded-lg mt-5 text-xl  cursor-pointer w-44"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
