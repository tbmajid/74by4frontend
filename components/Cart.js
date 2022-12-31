import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiFillMinusCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
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

  // const calculateVAT = () =>()

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
          <span>Your Basket</span>

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
              <div
                className="flex flex-col md:flex-row gap-7 p-5 overflow-scroll"
                key={item._id}
              >
                <img src={urlFor(item?.image[0])} className="w-48 h-auto" />
                <div className=" w-auto">
                  <div className="flex flex-col flex-wrap gap-1">
                    <div className="text-2xl">{item.name}</div>
                    <div className="text-sm">Size: {item.size}</div>
                    <div>
                      {" "}
                      <div className="text-xl p-1">£{item.price}</div>
                    </div>
                  </div>

                  <div className="flex justify-between w-80">
                    <div>
                      <p className="flex justify-center items-center">
                        <span onClick={() => onMinus(item)}>
                          <AiOutlineMinusCircle size={32} />
                        </span>
                        <span
                          className="w-6 border-r-2 border-gray-400 text-lg text-center"
                          onClick=""
                        >
                          {" "}
                          {item.quantity}
                        </span>
                        <span onClick={() => onPlus(item, 1)}>
                          <AiOutlinePlusCircle size={32} />
                        </span>
                      </p>
                      <button
                        type="button"
                        className="text-xs border-none cursor-pointer bg-transparent"
                        onClick={() => onRemove(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="w-full mb-1 pr-8 cursor-pointer">
            <hr></hr>
            <div className="flex justify-between mt-2">
              <h4 className="text-sm pl-5">Subtotal&nbsp; </h4>
              <h3 className="text-sm">£{totalPrice}</h3>
            </div>
            <div className="flex justify-between">
              <h4 className="text-sm pl-5">Delivery </h4>
              <h3 className="text-sm">FREE</h3>
            </div>
            <div className="flex justify-between">
              <h4 className="text-sm pl-5">VAT (Included) </h4>
              <h3 className="text-sm">£{Math.round(0.2 * totalPrice)}</h3>
            </div>
            <div className="flex justify-between">
              <h3 className="text-xl pl-5">Total </h3>
              <h3 className="text-xl">£{totalPrice}</h3>
            </div>
            <div className="w-72 m-auto">
              <button
                type="button"
                className="w-full border-solid rounded-lg max-w-lg p-3 z-40 mb-2 border-none text-xl mt-3 bg-black text-white cursor-pointer scale-100"
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
