import React, { useContext } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Header = (props) => {

  const { setCurrency } = useContext(CoinContext)

  const currency_handler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({name: "usd", symbol: "$"})
        break;
      }

      case "eur": {
        setCurrency({name: "eur", symbol: "€"})
        break;
      }

      case "inr": {
        setCurrency({name: "inr", symbol: "₹"})
        break;
      }

      default: {
        setCurrency({name: "usd", symbol: "$"})
        break;
      }
    }
  }

  return (
    <>
      <div className="mt-11 flex items-center justify-between">
        <Link to={"/"} className=" ml-[150px] text-[#FEE715] text-4xl font-bold max-lg:text-3xl max-[900px]:ml-[100px] max-md:text-2xl max-md:ml-12 max-[425px]:text-xl max-[375px]:text-lg max-[375px]:ml-7">
          CRYPTO INSIGHT <span className="font-thin">𖤓</span>
        </Link>

        <select
          name="currency"
          className="mr-[150px] px-2 py-1 text-lg hover:cursor-pointer bg-transparent text-[#FEE715] border border-[#FEE715] outline-none rounded-lg hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 max-[900px]:mr-[100px] max-md:text-base max-md:mr-12 max-[425px]:text-sm max-[375px]:text-xs max-[375px]:mr-7" onChange={currency_handler}>
          <option value="usd" className="bg-[#FEE715] text-[#101820]">USD</option>
          <option value="eur" className="bg-[#FEE715] text-[#101820]">EUR</option>
          <option value="inr" className="bg-[#FEE715] text-[#101820]">INR</option>
        </select>
      </div>
    </>
  );
};

export default Header;
