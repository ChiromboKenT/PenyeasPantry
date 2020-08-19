import React, {createContext,useReducer} from 'react'
export const CheckoutContext = createContext() 
const initialState = {
    cartData : {},
    
    shippingData :  {
        firstName : "",
        lastName : "",
        addressLineOne : "",
        addressLineTwo : "",
        city : "",
        province : "",
        country : "",
        mobile : "",
        deliverInstructions : ""
    },
    billingData :  {
        billFirstName : "",
        billLastName : "",
        billAddressLineOne : "",
        billAddressLineTwo : "",
        billCity : "",
        billProvince : "",
        billCountry : "",
        billMobile : "",
        billEmail : ""
    },
    paySuccessData : "",

    checkBillAddress : false
}

const reducer = (state,action) => {
    switch(action.type){

        case "BILLADDRESSCHECK" :
            return {
                ...state,
                checkBillAddress : !state.checkBillAddress
            }
        case "ShippingData" : 
            
            const newShipData = {
                ...state.shippingData, [action.key] : action.load
            }
            return {
                ...state, shippingData : newShipData
                
            }
            case "BillingData" : 
            
            const newBillData = {
                ...state.billingData, [action.key] : action.load
            }
            return {
                ...state, billingData : newBillData
                
            }
            case "ShipToBillAddress" : 
                const shipToBill = {
                    ...state.billingData,
                    billAddressLineOne : state.shippingData.addressLineOne,
                    billAddressLineTwo : state.shippingData.addressLineTwo,
                    billCity : state.shippingData.city,
                    billProvince : state.shippingData.province,
                    billCountry : state.shippingData.country,
                        

                }
            return {
                ...state, 
                billingData : shipToBill
            }

            case "ResetBillInfo" :
                const ResetBillInfo = {
                    ...state.billingData,
                        billAddressLineOne : "",
                        billAddressLineTwo : "",
                        billCity : "",
                        billProvince : "",
                        billCountry : ""                     

                }
                return {
                    ...state,
                    billingData : ResetBillInfo
                }
                case  "PaySuccess" :
                    return {
                        ...state,
                        paySuccessData : action.payload
                    }
        default : 
        return state
    }
}

export const CheckoutContextProvider = (props) => {
    const [checkoutState, checkoutDispatch] = useReducer(reducer, initialState)

    return (
        <CheckoutContext.Provider value={{...checkoutState, checkoutDispatch}}>
            {props.children}
        </CheckoutContext.Provider>
    )
}
