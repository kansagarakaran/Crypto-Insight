import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext()

const CoinContextProvider = (props) => {

    const [allcoin, setAllcoin] = useState([])
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-sFLsL4dgJ3qWdLNZbNaBzPSJ'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllcoin(response))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchAllCoin()
    
    }, [currency])
    

    const contextValue = {
        allcoin, currency, setCurrency
    }

    return( 
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;