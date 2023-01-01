import { AiOutlineGoogle } from "react-icons/ai";
import {
  FaCcApplePay,
  FaGooglePay,
  FaCcVisa,
  FaCcStripe,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" flex flex-col justify-center items-center  mt-9">
      <p>2022 74by4.com All rights reserverd</p>
      <div className="flex">
        <span className="p-1">
          <FaGooglePay size={50} />
        </span>
        <span className="p-1">
          {" "}
          <FaCcApplePay size={50} />
        </span>
        <span className="p-1">
          <FaCcStripe size={50} />
        </span>
        <span className="p-1">
          <FaCcVisa size={50} />
        </span>
        <span className="p-1">
          <FaCcMastercard size={50} />
        </span>
        <span className="p-1">
          <FaCcAmex size={50} />
        </span>
      </div>
    </div>
  );
};

export default Footer;
