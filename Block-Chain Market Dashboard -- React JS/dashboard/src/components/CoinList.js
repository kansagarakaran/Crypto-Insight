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
    <div>
      <div className='max-w-[900px] m-auto bg-[#FEE715] text-[#101820] rounded-2xl'>
        <div className='grid grid-cols-7 font-bold px-5 py-4 border-b border-b-[#101820] last:border-0'>
            <p className='col-span-1 ml-5'>#</p>
            <p className='col-span-2'>Coins</p>
            <p className='col-span-1'>Price</p>
            <p className='col-span-1'>24H Change (%)</p>
            <p className='flex justify-end mr-9 col-span-2'>Market Cap</p>
        </div>
        {
            displayCoin.slice(0, 10).map((item, index) => (
                <Link to={`/coin/${item.id}`} className='grid grid-cols-7 px-5 py-4 border-b border-b-[#101820] transform transition duration-150 hover:scale-105 drop-shadow-lg' key={index}>
                    <p className='col-span-1 ml-5'>{item.market_cap_rank}</p>
                    <div className='flex gap-3 items-center col-span-2'>
                        <img src={item.image} width={25}/>
                        <p>{item.name + " - " + item.symbol}</p>
                    </div>
                    <p className='col-span-1'>{currency.symbol} {item.current_price.toLocaleString()}</p>
                    <p className={'col-span-1 ' + item.price_change_percentage_24h > 0 ? "text-green-700 text-center" : "text-red-700 text-center"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                    <p className='flex justify-end mr-9 col-span-2'>{currency.symbol} {item.market_cap.toLocaleString()}</p>

                    
                </Link>
            ))
        }
      </div>
    </div>
  )
}

export default CoinList
