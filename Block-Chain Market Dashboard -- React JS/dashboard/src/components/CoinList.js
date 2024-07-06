import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../context/CoinContext'
import { DisplayCoinContext } from '../context/DisplayCoinContext'
import { Link } from 'react-router-dom'

const CoinList = () => {

    const {allcoin, currency} = useContext(CoinContext)
    const {displayCoin, setDisplayCoin} = useContext(DisplayCoinContext)

    useEffect(() => {
        setDisplayCoin(allcoin)
    }, [allcoin])

  return (
    <div className='flex justify-center'>
      <div className='max-w-[900px] mx-[30px] bg-[#FEE715] text-[#101820] rounded-2xl max-md:max-w-[700px]'>
        <div className='grid grid-cols-7 font-bold px-5 py-4 border-b border-b-[#101820] last:border-0 max-md:text-xs'>
            <p className='col-span-1 ml-5 max-[425px]:ml-1'>#</p>
            <p className={"col-span-2 " + (window.screen.width < 768 ? "col-span-3" : "") + (window.screen.width < 480 ? "col-span-3 col-start-2 col-end-6" : "")}>Coins</p>
            <p className={"col-span-1 " + (window.screen.width < 768 ? "col-span-2" : "") + (window.screen.width < 480 ? "col-start-6 col-end-9" : "")}>Price</p>
            <p className="col-span-1 max-[480px]:hidden">24H Change (%)</p>
            <p className='flex justify-end mr-9 col-span-2 max-md:hidden'>Market Cap</p>
        </div>
        {
            displayCoin.slice(0, 10).map((item, index) => (
                <Link to={`/coin/${item.id}`} className='grid grid-cols-7 px-5 py-4 border-b border-b-[#101820] transform transition duration-150 hover:scale-105 drop-shadow-lg max-md:text-xs' key={index}>
                    <p className='col-span-1 ml-5 max-[425px]:ml-1'>{item.market_cap_rank}</p>
                    <div className={"flex gap-3 items-center col-span-2 " + (window.screen.width < 768 ? "col-span-3" : "") + (window.screen.width < 480 ? "col-span-3 col-start-2 col-end-6" : "")}>
                        <img src={item.image} width={25} className=' max-[425px]:w-4'/>
                        <p>{item.name + " - " + item.symbol}</p>
                    </div>
                    <p className={"col-span-1 " + (window.screen.width < 768 ? "col-span-2" : "") + (window.screen.width < 480 ? "col-start-6 col-end-9" : "")}>{currency.symbol} {item.current_price.toLocaleString()}</p>
                    <p className="max-[480px]:hidden">
                      <p className={"col-span-1 " + item.price_change_percentage_24h > 0 ? "text-green-700 text-center" : "text-red-700   text-center"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                    </p>
                    <p className='flex justify-end mr-9 col-span-2 max-md:hidden'>{currency.symbol} {item.market_cap.toLocaleString()}</p>

                    
                </Link>
            ))
        }
      </div>
    </div>
  )
}

export default CoinList
