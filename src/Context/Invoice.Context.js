import React,{createContext, useReducer} from 'react'
import uuid from 'react-uuid'

export const InvoiceContext = createContext();

const initialState = {
       invoiceData : {
        id : "",
        invoice_no : "",
        billName : "",
        billEmail : "",
        billPhone : "",
        billAddress : "",
        trans_date: "",
        items : "",
        shipName: "",
        shipAddress : "",
        shipPhone : "",
        instructions : ""
       }

}
const reducer = (state, action) => {
    switch(action.type){
        case "Generate" :
            const {billingData,cartData,shippingData,cartID} = action
            const billingAddress = `${billingData.billAddressLineOne} ${billingData.billAddressLineTwo}, ${billingData.billCity}
                                     ${billingData.billProvince}. ${billingData.billCountry}`
            const shippingAddress = `${shippingData.addressLineOne} ${shippingData.addressLineTwo}, ${shippingData.city}
                                     ${shippingData.province}. ${shippingData.country}`
            let today = new Date();
            let date=`${today.getDate()}-${parseInt(today.getMonth()+1)}-${today.getFullYear()}`;
            return {
                ...state,
                invoiceData : {
                    id : cartID ,
                    invoice_no : `002${uuid().replace(/-/g,'').slice(-3)}`.toUpperCase(),
                    billName : `${billingData.billFirstName} ${billingData.billLastName}`,
                    billEmail : billingData.billEmail,
                    billPhone : billingData.billMobile,
                    billAddress : billingAddress,
                    trans_date: date,
                    items : cartData,
                    shipName: `${shippingData.firstName} ${shippingData.lastName}`,
                    shipAddress : shippingAddress,
                    shipPhone : shippingData.mobile,
                    instructions : shippingData.deliverInstructions
                }


            }

        default : 
        return state;
    }
} 


const InvoiceContextProvider = ({children}) => {

    const [invoiceState, invoiceDispatch] = useReducer(reducer, initialState)
    return (
       <InvoiceContext.Provider value={{...invoiceState, invoiceDispatch}}>
           {children}
       </InvoiceContext.Provider>
    )
}

export default InvoiceContextProvider
