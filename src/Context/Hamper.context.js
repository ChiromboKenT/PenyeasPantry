import React, {createContext, useReducer,useEffect} from 'react';
import axios from 'axios'

export const HamperContext = createContext();

const initialState = {
    isLoading : true,
    error : false,
    display: "All",
    selectedHamper : "standard",
    hamperData : []
}
const reducer = (state, action) => {
    switch(action.type){
        case "Success" : 
            const newProd = action.payload.map(item => {
                return {...item, isInCart : false}
            })
            return {
                isLaoding : false,
                error : false,
                display : state.display,
                hamperData : newProd
            }
        case "Error" : 
            return {
                isLaoding : false,
                error : true,
                hamperData : []
            }
            case "Filter" : 
                return {
                    ...state,
                    display : action.load
                }
            case "SelectHamper" : 
            return {
                ...state,
                selectedHamper : action.load
            }
            case "AddCartLabel" : 

                const updatedAddChipHamperData = state.hamperData.map(product => {
                   return product.id === action.itemID ? {...product, isInCart : true} : product
                    })
                return {
                    ...state,
                    hamperData : [...updatedAddChipHamperData]
                }
            case "RemoveCartLabel" :
                const updatedRemoveChipHamperData = state.hamperData.map(product => (
                    product.id === action.itemID ? {...product, isInCart : false} : product
                 ))
                 return {
                     ...state,
                     hamperData : [...updatedRemoveChipHamperData]
                 }

        default :
            return state

    }
}
export const HamperContextProvider = (props) => {
    const [hamperState, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        const data = async () => {
            try {
                const hamperArray = []
                const response = await axios({
                    method : 'GET',
                    url : "https://rartx1msad.execute-api.eu-west-1.amazonaws.com/Production/products/Hampers"
                })
    
                const results = response.data;
                results.map(result => (hamperArray.push(
                    {
                         
                        id : result.id,
                        title : result.title,
                        price: result.price,
                        imageURL : result.imageURL,
                        stock_qty: result.stock_qty,
                        category : result.category,
                        description : result.description,
                        
                       
                }
                )))
                
                dispatch({type : "Success", payload : hamperArray})
            }catch(err){
                console.log(err);
                dispatch({type : "Error"})
            }


        }
       data();
    }, [])
    return (
        <HamperContext.Provider value={{...hamperState, dispatch}}>
            {props.children}
        </HamperContext.Provider>
    )
}
