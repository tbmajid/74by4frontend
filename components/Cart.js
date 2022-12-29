import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiFillMinusSquare,
  BsTrashFill,
  AiFillPlusSquare,
} from "react-icons/ai";

import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();

  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    onRemove,
    onPlus,
    onMinus,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div
      className="w-screen h-screen mb-1 fixed top-0 right-0 z-50 overflow-scroll  ease-in-out bg-white"
      ref={cartRef}
    >
      <div className="h-screen float-right py-10 px-2.5 bg-white relative">
        <button
          type="button"
          className="flex items-center text-xl font-bold cursor-pointer gap-0.5 bg-transparent border-0"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span>Your Cart</span>

          <span className="ml-2.5 text-rose-600">
            ({totalQuantities} items)
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className="m-10  text-center">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="w-full max-w-md py-2.5 text-sm mt-2.5 text-rose-600 text-white cursor-pointer scale-125 ease-linear"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="mt-2.5">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="flex gap-7 p-5 overflow-scroll" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className=" w-36 h-32 bg-white"
                />
                <div className="w-52">
                  <div className="flex flex-wrap gap-2.5">
                    <div className="text-lg">{item.name}</div>
                    <br /> <div className="text-sm  mt-1">{item.size}</div>
                    <div>
                      {" "}
                      <div className="text-base p-1">£{item.price}</div>
                    </div>
                  </div>

                  <div className="flex justify-between w-80">
                    <div>
                      <p className="flex justify-center items-center">
                        <span onClick={() => onMinus(item)}>
                          <AiFillMinusSquare size={32} />
                        </span>
                        <span
                          className="w-6 border-r-2 border-gray-400 text-lg text-center"
                          onClick=""
                        >
                          {" "}
                          {item.quantity}
                        </span>
                        <span onClick={() => onPlus(item, 1)}>
                          <AiFillPlusSquare size={32} />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs border-none cursor-pointer bg-transparent"
                  onClick={() => onRemove(item)}
                >
                  Remove Items
                </button>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className=" w-full mb-1 pr-8 cursor-pointer bg-white">
            <div className="flex">
              <h3 className="text-xl pl-5">Subtotal:&nbsp; </h3>
              <h3 className="text-xl">£{totalPrice}</h3>
            </div>
            <div className="w-72 m-auto">
              <button
                type="button"
                className="w-full max-w-lg p-3 z-40 mb-2 border-none text-xl mt-3 bg-black text-white cursor-pointer scale-100"
                onClick={handleCheckout}
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
