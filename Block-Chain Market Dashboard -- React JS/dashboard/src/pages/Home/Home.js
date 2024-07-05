import React from 'react'
import Hero from '../../components/Hero'
import CoinList from '../../components/CoinList'
import { DisplayCoinContextProvider } from '../../context/DisplayCoinContext'

const Home = () => {
  return (
    <>
      
      <DisplayCoinContextProvider>
        <Hero/>
        <CoinList/>
      </DisplayCoinContextProvider>
    </>
  )
}

export default Home
