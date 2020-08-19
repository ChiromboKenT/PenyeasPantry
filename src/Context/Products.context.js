import React, {createContext, useEffect,useReducer} from 'react';
import axios from 'axios'



const initialState = {
    isLoading : true,
    Error : "",
    productData : []
}
const reducer = (state, action) => {
    switch(action.type){
        case 'Success' : 
            const newProd = action.payload.map(item => {
                return {...item, isInCart : false}
            })
            return { 
                isLoading : false, 
                productData : newProd
            }
        case 'Error' :
            console.log(action.Err)
            return {
                isLoading : false,
                Error : action.Err,
                productData : state.productData
            }
            case "AddCartLabel" : 
            const updatedAddChipHamperData = state.productData.map(product => (
               product.id === action.itemID ? {...product, isInCart : true} : product
            ))
            return {
                ...state,
                productData : [...updatedAddChipHamperData]
            }
        case "RemoveCartLabel" :
            const updatedRemoveChipHamperData = state.productData.map(product => (
                product.id === action.itemID ? {...product, isInCart : false} : product
             ))
             return {
                 ...state,
                 productData : [...updatedRemoveChipHamperData]
             }
        default : 
        return state;
    }

}


export const ProductsContextProvider = (props) => {
    const [productState, dispatch] = useReducer(reducer, initialState)
    //imageURL : `https://penyesa-pictures.s3.af-south-1.amazonaws.com/${result.imageURL}.jpg`,
    useEffect(() => {
        const  getData = async () =>{
           try{
            let prodArray = []
            const response = await axios.get("https://rartx1msad.execute-api.eu-west-1.amazonaws.com/Production/products/Products");
            const results = response.data
            results.map(result => prodArray.push(
                {
                    id : `prod_ID0${result.id}`,
                    title : result.title,
                    price : result.price,
                    description: result.description,
                    stock_qty: result.stock_qty,
                    imageURL : `https://penyesa-pictures.s3.af-south-1.amazonaws.com/${result.imageURL}.jpg`,
                    category : result.category,
                    special : result.special

                }
            ))
           dispatch({type : "Success", payload : prodArray})

           }catch(err){
            dispatch({type: "Error", Err : "There was an Error" })

           }
        }
    getData();

    }, [])

    return (
        <ProductsContext.Provider value ={{...productState,dispatch}}>
            {props.children}
        </ProductsContext.Provider>
    )
}


export const ProductsContext = createContext();