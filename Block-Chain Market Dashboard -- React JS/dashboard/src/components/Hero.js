import React, { useContext, useState } from 'react'
import { CoinContext } from '../context/CoinContext'
import { DisplayCoinContext } from '../context/DisplayCoinContext'

const Hero = () => {

    const {allcoin} = useContext(CoinContext)
    const {displayCoin, setDisplayCoin} = useContext(DisplayCoinContext)
    const [input, setInput] = useState('')

    const input_handler = (event) => {
        setInput(event.target.value);

        if(event.target.value === ""){
            setDisplayCoin(allcoin)
        }
    }

    const search_handler = async (event) => {
        event.preventDefault();
        const coins = await allcoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins)
    }

  return (
    <div className='flex flex-col gap-10 my-[120px] items-center justify-center text-[#FEE715] w-screen text-center max-lg:my-24'>

      <div className='font-bold text-6xl mx-[50px] max-md:text-5xl max-[420px]:text-4xl max-[350px]:text-3xl'>
        Largest Crypto Market Sight Platform
      </div>

      <div className='w-3/5 font-light text-xl max-md:text-lg max-[630px]:text-base max-[420px]:text-sm max-[350px]:text-xs'>
      <p>Stay ahead in the crypto game with real-time price updates and comprehensive market insights.</p> Empower your investments today!
      </div>

      <div className='w-screen mt-[50px] max-md:mt-[35px]'>
        <form onSubmit={search_handler}>
            <input type="text" placeholder='Search crypto...' className='w-[30%] px-3 py-2 bg-[#FEE715] text-[#101820] rounded-md border-0 outline-none mx-3 font-semibold focus:bg-[#101820] focus:text-[#FEE715] focus:border focus:border-[#FEE715] transition duration-200 focus:placeholder:text-[#FEE715] placeholder:text-[#101820] placeholder:opacity-50 max-md:px-2 max-md:py-1 max-md:w-[40%] max-[525px]:text-sm max-[425px]:px-1  max-[425px]:mx-2' onChange={input_handler} required value={input} />

            <button type='submit' className='border border-[#FEE715] py-2 px-3 rounded-md transition duration-200 hover:bg-[#FEE715] hover:text-[#101820] max-md:px-2 max-md:py-1 max-[525px]:text-sm max-[425px]:px-1'>Search</button>
        </form>
      </div>

    </div>
  )
}

export default Hero