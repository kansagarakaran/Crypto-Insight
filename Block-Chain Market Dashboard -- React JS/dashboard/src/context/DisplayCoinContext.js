import { createContext, useState } from "react";

export const DisplayCoinContext = createContext()

    export const DisplayCoinContextProvider = (props) => {

        const [displayCoin, setDisplayCoin] = useState([]);

        const contextValue = {
            displayCoin, setDisplayCoin
        }

        return( 
            <DisplayCoinContext.Provider value={contextValue}>
                {props.children}
            </DisplayCoinContext.Provider>
        )

    }

    
