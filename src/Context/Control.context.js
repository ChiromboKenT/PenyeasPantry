import React, {createContext, useReducer} from 'react'

export const ControlContext = createContext();

const initialState = {
    openCart : false,
    openMenu : false,
    openModal : false,
    modalIsHamper : false,
    modalData : {},
};
const reducer = (state,action) => {
    switch(action.type) {
        case 'CART' : 
            return {...state, openCart: !state.openCart}
        case 'MENU' : 
            return {...state, openMenu : !state.openMenu}
        case 'MODAL' :
            return {...state, openModal : !state.openModal}
        case 'MODALRESET': {
            return {
                ...state,
                openModal : false,
                modalIsHamper: false,
                modalData : {}
            }
        }
        case  "ModalData" : 
        return {...state,
            modalIsHamper : true,
             modalData : {...action.payload}}

        case "MODALCARTRESET" : 
            return { ...state,
                modalData : {...state.modalData, isInCart : action.payload}
            } 
        case "ModalDataProduct" : 
            return {
                ...state,
                modalIsHamper : false,
                modalData : {...action.payload}
            }
        default:
            return state
    }

}

export const ControlContextProvider = (props) => {
    const [open, dispatch] = useReducer(reducer, initialState);
    return (
        <ControlContext.Provider value={{...open, openDispatch : dispatch}}>
            {props.children}
        </ControlContext.Provider>
    )
}
