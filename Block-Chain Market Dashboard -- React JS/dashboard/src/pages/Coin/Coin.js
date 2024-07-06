import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart";
import debounce from "lodash.debounce";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);
  const [chartTime, setChartTime] = useState("days=10")

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-sFLsL4dgJ3qWdLNZbNaBzPSJ",
      },
    };

    await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = useCallback(
    debounce(async (time) => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-sFLsL4dgJ3qWdLNZbNaBzPSJ",
        },
      };

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&${time}&interval=daily`,
          options
        );
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error(error);
      }
    }, 300),
    [coinId, currency]
  );

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData(chartTime);
  }, [currency, chartTime, fetchHistoricalData]);

  const changeTime = (event) => {
    setChartTime(event.target.value)
  }

  if (coinData && historicalData) {
    return (
      <div className="min-h-[68vh] w-screen">
        <div className="flex justify-between items-center mx-[150px] my-12 max-[1400px]:mx-[100px] max-md:mx-[50px] max-[465px]:flex-col max-[465px]:gap-3">
          <div className="flex gap-7 items-center max-lg:gap-4">
            <img src={coinData.image.large} alt="" width={40} className="max-lg:w-7"/>
            <p className="text-[#FEE715] text-3xl max-lg:text-2xl max-[675px]:text-base">
              <b>{coinData.name}</b> ({coinData.symbol.toUpperCase()})
            </p>
          </div>
          <div className="text-[#FEE715] text-3xl font-bold max-lg:text-2xl max-[675px]:text-base">
            Current Price : {currency.symbol}  {coinData.market_data.current_price[currency.name].toLocaleString()}
          </div>
        </div>

        <div className="flex w-screen">
          <div className="flex flex-col gap-8 max-[1165px]:gap-2 max-md:gap-0 max-md:ml-0">
            <div className="flex gap-5 text-[#101820] justify-center max-[750px]:justify-start max-[750px]:mx-12 max-[750px]:gap-3 max-[455px]:mx-6 max-[375px]:gap-1 max-[375px]:mx-3">
              <button type="button" value="days=1" className="border border-opacity-50 bg-[#FEE715] border-[#FEE715] py-2 px-5 font-medium transition duration-200 rounded-sm hover:bg-[#101820] hover:text-[#FEE715] max-md:py-1 max-md:px-4 max-md:text-xs max-[750px]:px-2" onClick={changeTime}>1-Day</button>
              <button type="button" value="days=10" className="border border-opacity-50 bg-[#FEE715] border-[#FEE715] py-2 px-5 font-medium transition duration-200 rounded-sm hover:bg-[#101820] hover:text-[#FEE715] max-md:py-1 max-md:px-4 max-md:text-xs max-[750px]:px-2" onClick={changeTime}>10-Day</button>
              <button type="button" value="days=30" className="border border-opacity-50 bg-[#FEE715] border-[#FEE715] py-2 px-5 font-medium transition duration-200 rounded-sm hover:bg-[#101820] hover:text-[#FEE715] max-md:py-1 max-md:px-4 max-md:text-xs max-[750px]:px-2" onClick={changeTime}>30-Day</button>
              <button type="button" value="days=180" className="border border-opacity-50 bg-[#FEE715] border-[#FEE715] py-2 px-5 font-medium transition duration-200 rounded-sm hover:bg-[#101820] hover:text-[#FEE715] max-md:py-1 max-md:px-4 max-md:text-xs max-[750px]:px-2" onClick={changeTime}>180-Day</button>
              <button type="button" value="days=365" className="border border-opacity-50 bg-[#FEE715] border-[#FEE715] py-2 px-5 font-medium transition duration-200 rounded-sm hover:bg-[#101820] hover:text-[#FEE715] max-md:py-1 max-md:px-4 max-md:text-xs max-[750px]:px-2" onClick={changeTime}>365-Day</button>
            </div>
            <div className="min-w-[800px] flex justify-center items-center max-[1165px]:w-[100vw] max-[750px]:justify-start max-[750px]:mb-5 max-[455px]:my-5">
              <LineChart historicalData={historicalData} />
            </div>
          </div>
          
          <div className="text-[#FEE715] w-screen gap-5 grid grid-cols-2 mr-16 max-[1165px]:hidden">
            <ul className="border border-opacity-50 border-[#FEE715] flex flex-col gap-3 text-center max-h-[130px] min-w-[140px] justify-center hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">Crypto Market Rank</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                # {coinData.market_cap_rank}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715] flex flex-col gap-3 text-center max-h-[130px] min-w-[140px] justify-center hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">Market Cap</li>
              <li className="font-medium text-lg max-[1400px]:text-base max-[1325px]:text-sm">
                {currency.symbol}  {coinData.market_data.market_cap[
                  currency.name
                ].toLocaleString()}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715]  flex flex-col gap-3 text-center max-h-[130px] min-w-[140px] justify-center  hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">24HR High Price</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                
                {currency.symbol}  {coinData.market_data.high_24h[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715]  flex flex-col gap-3 text-center  max-h-[130px] min-w-[140px] justify-center  hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">24HR Low Price</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                
                {currency.symbol}  {coinData.market_data.low_24h[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715]  flex flex-col gap-3 text-center  max-h-[130px] min-w-[140px] justify-center  hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">All Time High Price</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                
                {currency.symbol}  {coinData.market_data.ath[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715]  flex flex-col gap-3 text-center  max-h-[130px] min-w-[140px] justify-center  hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">All Time Low Price</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                
                {currency.symbol}  {coinData.market_data.atl[currency.name].toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
        
          {/* responsive design - bottom details of crypto */}
          
          <div className="text-[#FEE715] max-w-[800px] gap-5 grid grid-cols-3 min-[1165px]:hidden m-auto px-10 max-[550px]:flex-col max-[550px]:flex max-[550px]:items-center max-[550px]:mt-5">
            <ul className="border border-opacity-50 border-[#FEE715] flex flex-col gap-3 text-center min-h-[130px] min-w-[140px] justify-center hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm max-[550px]:flex-row max-[550px]:items-center max-[550px]:w-[110%] max-[550px]:min-h-[40px] max-[550px]:justify-between max-[550px]:border-0 max-[550px]:border-b max-[550px]:pb-5">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">Crypto Market Rank</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                # {coinData.market_cap_rank}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715] flex flex-col gap-3 text-center max-h-[130px] min-w-[140px] justify-center hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm max-[550px]:flex-row max-[550px]:items-center max-[550px]:w-[110%] max-[550px]:min-h-[40px] max-[550px]:justify-between max-[550px]:border-0 max-[550px]:border-b max-[550px]:pb-5">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">Market Cap</li>
              <li className="font-medium text-lg max-[1400px]:text-base max-[1325px]:text-sm">
                {currency.symbol}  {coinData.market_data.market_cap[
                  currency.name
                ].toLocaleString()}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715]  flex flex-col gap-3 text-center max-h-[130px] min-w-[140px] justify-center  hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm max-[550px]:flex-row max-[550px]:items-center max-[550px]:w-[110%] max-[550px]:min-h-[40px] max-[550px]:justify-between max-[550px]:border-0 max-[550px]:border-b max-[550px]:pb-5">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">24HR High Price</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                
                {currency.symbol}  {coinData.market_data.high_24h[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715]  flex flex-col gap-3 text-center  max-h-[130px] min-w-[140px] justify-center  hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm max-[550px]:flex-row max-[550px]:items-center max-[550px]:w-[110%] max-[550px]:min-h-[40px] max-[550px]:justify-between max-[550px]:border-0 max-[550px]:border-b max-[550px]:pb-5">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">24HR Low Price</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                
                {currency.symbol}  {coinData.market_data.low_24h[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715]  flex flex-col gap-3 text-center  max-h-[130px] min-w-[140px] justify-center  hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm max-[550px]:flex-row max-[550px]:items-center max-[550px]:w-[110%] max-[550px]:min-h-[40px] max-[550px]:justify-between max-[550px]:border-0 max-[550px]:border-b max-[550px]:pb-5">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">All Time High Price</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                
                {currency.symbol}  {coinData.market_data.ath[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul className=" border border-opacity-50 border-[#FEE715]  flex flex-col gap-3 text-center min-h-[130px] min-w-[140px] justify-center  hover:bg-[#FEE715] hover:text-[#101820] transition duration-200 rounded-sm max-[550px]:flex-row max-[550px]:items-center max-[550px]:w-[110%] max-[550px]:min-h-[40px] max-[550px]:justify-between max-[550px]:border-0 max-[550px]:pb-5">
              <li className="text-xl font-bold max-[1400px]:text-base max-[1325px]:text-sm">All Time Low Price</li>
              <li className="font-medium text-xl max-[1400px]:text-base max-[1325px]:text-sm">
                
                {currency.symbol}  {coinData.market_data.atl[currency.name].toLocaleString()}
              </li>
            </ul>
          </div>
      </div>
    );
  } else {
    return (
      <div
        role="status"
        className="h-[68vh] w-screen flex justify-center items-center"
      >
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
};

export default Coin;
