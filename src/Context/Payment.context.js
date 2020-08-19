import React, {createContext,useState} from 'react'

export const PaymentContext = createContext();


export const PaymentContextProvider = ({children}) => {
    const [isPaying, setIsPaying] = useState(false)

    const handleIsPaying = (value) => {
        setIsPaying(value)
    }
    return (
        <PaymentContext.Provider value = {{isPaying,handleIsPaying}}>
            {children}
        </PaymentContext.Provider>
    )
}
