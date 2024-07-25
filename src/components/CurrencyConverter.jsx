import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { MdSwapHorizontalCircle } from "react-icons/md";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [tocurrency, setTocurrency] = useState("INR");
  const [amount, setAmount] = useState(1);

  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);

  //   const api1 = "https://api.frankfurter.app/latest?amount=1&from=USD&to=INR";

  const fetchcurrency = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");

      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error Fetching ", error);
    }
  };

  useEffect(() => {
    fetchcurrency();
  }, []);

  // console.log(currencies);

  const convertCurrency = async () => {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${tocurrency}`
      );

      const data = await res.json();

      setConvertedAmount(data.rates[tocurrency] + " " + tocurrency);
    } catch (error) {
      console.log("error");
    }
  };

  const swapp = () => {
    setFromCurrency(tocurrency);
    setTocurrency(fromCurrency);
  };

  return (
    <div className=" max-w-xl mx-auto my-10 p-5   bg-white rounded-lg shadow-md">
      <h1 className=" font-semibold  text-2xl ">Currency Converter</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <Dropdown
          currency={currencies}
          title="from"
          current={fromCurrency}
          setCurrency={setFromCurrency}
        />
        <div className=" flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={() => swapp()}
            className=" p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <MdSwapHorizontalCircle />
          </button>
        </div>
        <Dropdown
          currency={currencies}
          title="to"
          current={tocurrency}
          setCurrency={setTocurrency}
        />
      </div>
      <div className=" mt-4">
        <label
          htmlFor="amount"
          className=" text-sm font-medium block text-gray-700"
        >
          Amount
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className=" w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>
      <div className=" flex justify-end mt-6">
        <button
          className=" px-5 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2"
          onClick={() => convertCurrency()}
        >
          Convert
        </button>
      </div>
      <div className=" mt-4 text-xl text-orange-600 ">
        Converted Amount: {convertedAmount}
      </div>
    </div>
  );
};

export default CurrencyConverter;
