import React, {createContext,useEffect, useReducer} from 'react'
import createUID from 'create-unique-id';


export const CartContext = createContext();

//Initial State = an Empty object or read from storage
const initialState = 
    {

        cartTotal : 0,
        cartProducts : [],
        cartID : ""
    }


const reducer = (state, action) => {
    
    switch(action.type){
        case "AddProduct" :
            let tempCartArray = [...state.cartProducts]
            let cartTotal = state.cartTotal;
            const foundProductIndex = tempCartArray.findIndex(item => item.productID === action.itemID);
            if(foundProductIndex < 0){
                tempCartArray =[...tempCartArray, {
                    productID : action.itemID,
                    productTitle : action.itemTitle,
                    productPrice : action.itemPrice,
                    productImage : action.itemURL,
                    qty : action.itemQty
                }]
                cartTotal = cartTotal + 1;
            }else {
                tempCartArray[foundProductIndex].qty += action.itemQty;

            }
           return {
                ...state,
               cartTotal : cartTotal,
               cartProducts : tempCartArray
           }
        case "Subtract" :
            let tempCartArrayRemove = [...state.cartProducts]
            const foundProductIndexRemove = tempCartArrayRemove.findIndex(item => item.productID === action.itemID);
            if(foundProductIndexRemove >= 0){
                tempCartArrayRemove[foundProductIndexRemove].qty -= 1;
            }
            return {
                ...state,
                cartProducts : tempCartArrayRemove
            }
        case "RemoveProduct" :
            if(state.cartTotal > 0){
                return {
                    cartTotal : state.cartTotal - 1,
                    cartProducts : state.cartProducts.filter(item => item.productID !== action.itemID)
                }
            }else {
                return state
            }
        case "cartID" : 
        return {
            ...state,
            cartID : `${createUID(7)}`.toUpperCase()
        }

           
            
        default :
            return state
    }
}
export  function CartContextProvider(props) {
     const [cartState, cartDispatch] = useReducer(reducer, initialState)
    return (
         <CartContext.Provider value={{...cartState, cartDispatch}}>
             {props.children}
         </CartContext.Provider>
    )
}


