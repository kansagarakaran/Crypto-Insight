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
    <div className='flex flex-col gap-10 my-[120px] items-center justify-center text-[#FEE715] w-screen text-center'>

      <div className='font-bold text-6xl'>
        Largest Crypto Market Sight Platform
      </div>

      <div className='w-3/5 font-light text-xl'>
      <p>Stay ahead in the crypto game with real-time price updates and comprehensive market insights.</p> Empower your investments today!
      </div>

      <div className='w-screen mt-[50px]'>
        <form onSubmit={search_handler}>
            <input type="text" placeholder='Search crypto...' className='w-[30%] px-3 py-2 bg-[#FEE715] text-[#101820] rounded-md border-0 outline-none mx-3 font-semibold focus:bg-[#101820] focus:text-[#FEE715] focus:border focus:border-[#FEE715] transition duration-200 focus:placeholder:text-[#FEE715] placeholder:text-[#101820] placeholder:opacity-50' onChange={input_handler} required value={input} list='coinlist' />

            <datalist id='coinlist'>
                {allcoin.map((item, index) => { <option key={index} value={item.name} />})}
            </datalist>

            <button type='submit' className='border border-[#FEE715] py-2 px-3 rounded-md transition duration-200 hover:bg-[#FEE715] hover:text-[#101820]'>Search</button>
        </form>
      </div>

    </div>
  )
}

export default Hero