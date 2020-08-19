import React, { useContext} from 'react';
import {ControlContext} from '../Context/Control.context'
import {HamperContext} from "../Context/Hamper.context"
import {ProductsContext} from "../Context/Products.context"
import {CartContext} from '../Context/Cart.context'
import { makeStyles } from '@material-ui/core/styles';
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';
import {SwipeableDrawer as SwipeDrawer,
        Button,List, ListItem, ListItemAvatar,ListItemIcon, IconButton, Divider}
        from '@material-ui/core';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import KeyboardArrowUpSharpIcon from '@material-ui/icons/KeyboardArrowUpSharp';
import '../Styles/sideBar.scss'
import { useHistory } from "react-router-dom";
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const useStyles = makeStyles({

    cartContent : {
        minWidth : "20rem",
        padding : "2rem 1rem"
    },
    header: {
        display : "inline-flex",
        justifyItems : "flex-end !important",
        alignItems : "center"
    }, listContainer : {
        width : "100%",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        border : "3px solid #fe731e;",
        backgroundColor : " #fafafa",
       
    }, listTopContainer : {
        "maxHeight": "25rem",
        "overflowY": "scroll",
    }
}) 


const SideBarCart = () => {
    const {openCart, openDispatch,openModal}   = useContext(ControlContext);
    const {cartTotal,cartDispatch, cartProducts} = useContext(CartContext);
    const hamperContext = useContext(HamperContext);
    const productsContext = useContext(ProductsContext);
    let history = useHistory();

    const classes = useStyles();
    const handleClick = () => {
        openDispatch({type : "CART"});
    }
    const handleCheckoutClick = () => {
        cartDispatch({type : "cartID"})
        openCart && openDispatch({type : "CART"});
        openModal && openDispatch({type : "MODAL"});
        return history.push('/checkout/shippingInformation')
    }

    //Handle Adding Quantity 
    const handleAddQuantityClick = (id,title,price,qty,url) => {
        cartDispatch({type : "AddProduct", itemID : id,itemTitle: title, itemPrice:price, itemQty : qty,itemURL : url})
    }

    //Handle Subtracting Quantity
    const handleRemoveQuantityClick = (id,qty) => {
        if(qty > 1){
            cartDispatch({type : "Subtract", itemID : id})
        }else {
            //Reset and Close the Modal
            openDispatch({type : "MODALCARTRESET", payload : false})

            //Remove Hamper Chip Label
            hamperContext.dispatch({type : "RemoveCartLabel", itemID: id})

            //Remove Product Chip Label
            productsContext.dispatch({type : "RemoveCartLabel", itemID: id})
            cartDispatch({type : "RemoveProduct", itemID : id})
        }
    }

    //Calculating the Products Quantity
    const Total = cartProducts.reduce((acc,current) => acc + current.qty * current.productPrice,0)
    return(
      
        
        <SwipeDrawer anchor="right" open={openCart} >
            <div className={classes.cartContent}>
                <div className={classes.header}>
                    <IconButton onClick={handleClick}>
                        <CancelPresentationRoundedIcon/>
                    </IconButton>
                </div>
                <div style={{'textAlign':'center'}}>
                    <span>
                        <ShoppingBasketRoundedIcon/>
                    </span>
                    <h1>Your Cart</h1>
                    
                </div>
                <Divider/>
                {
                    cartProducts.length > 0 ?
                    (
                        <div style={{"width":"100%"}}>
                            <List className={classes.listTopContainer}>
                                {
                                    cartProducts.map(item => (
                                        <>
                                            <ListItem className={classes.listContainer}>
                                                <img className="cart-image" src={`${item.productImage}`} alt=""/>
                                                <div className= "cart-text">
                                                    <p className="cart-text--heading">{item.productTitle}</p>
                                                    <p className="cart-text--heading-2">{`R${item.productPrice}`}</p>
                                                    <p className="cart-text--heading-3">{`${item.qty}`}</p>
                                                </div>
                                                <div className="cart-controls">
                                                    <IconButton size="small" onClick={(e) => handleAddQuantityClick(
                                                        item.productID, item.productTitle, item.productPrice,1,item.imageURL
                                                    )}>
                                                        <KeyboardArrowUpSharpIcon/>
                                                    </IconButton>
                                                    <p style={{margin: "0"}}>{`${item.qty}`}</p>
                                                    <   IconButton size="small" onClick={(e) => handleRemoveQuantityClick(
                                                        item.productID, item.qty
                                                    )}>
                                                        <KeyboardArrowDownSharpIcon />
                                                    </IconButton>
                                                </div>
                                            </ListItem>
                                            <Divider/>
                                        </>
                                    ))
                                }
                            </List>
                            <Divider/>
                            <div className="cart-total">
                            <div className="total-text">
                                    <h3>Cart Total :  <span>{`ZAR ${Total}`}</span> </h3>
                                
                            </div>

                                <Button
                                    onClick= {handleCheckoutClick}
                                    variant="contained"
                                    color="secondary"
                                    size="medium"
                                    className={classes.button}
                                    startIcon={<DoneSharpIcon />}
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div style={{'textAlign':'center'}}>
                            
                            <h1 style={{margin : "5rem 0"}}>Your Cart Is Empty</h1> 
                            <Button
                                onClick = {handleClick}
                                variant="contained"
                                color="secondary"
                                size="medium"
                                startIcon={<KeyboardReturnIcon />}
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    )
                }
                
                

            </div>    
        </SwipeDrawer>
      
    )
}

export default SideBarCart;