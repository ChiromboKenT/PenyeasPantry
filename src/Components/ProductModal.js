import React ,{useContext} from 'react';
import {CartContext} from '../Context/Cart.context'
import {HamperContext} from '../Context/Hamper.context'
import {ProductsContext} from '../Context/Products.context'
import {ControlContext} from '../Context/Control.context';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import uuid from "react-uuid"
import Backdrop from '@material-ui/core/Backdrop';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';
import Fade from '@material-ui/core/Fade';
import { IconButton, Button ,Chip} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import "../Styles/ProductModal.scss"

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));
const ProductModal = () => {
    const classes = useStyles()
    const hamperContext = useContext(HamperContext)
    const {openDispatch, openModal,modalData,modalIsHamper} = useContext(ControlContext);
    const {cartTotal,cartDispatch, cartProducts} = useContext(CartContext);
    const productsContext = useContext(ProductsContext);
    const Total = cartProducts.reduce((acc,current) => acc + current.qty * current.productPrice,0)
    const desc = modalData.description;
    const handleClose = () => {
        openDispatch({type:"MODAL"})
    };

    const handleInCart = () => {
        openDispatch({type: "CART"});
    }
    const handleAddToCart =(qty=1) => {

        openDispatch({type : "MODALCARTRESET", payload : true})
        //Add Chip on Product
        hamperContext.dispatch({type : "AddCartLabel", itemID: modalData.id})
        
        //Add Product to Cart
        cartDispatch({type : "AddProduct", itemID : modalData.id,itemTitle:modalData.title,
                    itemPrice:modalData.price, itemQty : qty,itemURL: modalData.imageURL})
        
    }

    //Handle Adding Quantity 
    const handleAddQuantityClick = (qty=1) => {
        cartDispatch({type : "AddProduct", itemID : modalData.id ,
                    itemTitle: modalData.title , itemPrice:modalData.price, itemQty : qty})
    }

    //Handle Subtracting Quantity
    const handleRemoveQuantityClick = (qty) => {
        if(qty > 1){
            cartDispatch({type : "Subtract", itemID : modalData.id})
        }else {
           
           //Remove PRoduct from Modal
           openDispatch({type : "MODALCARTRESET", payload : false})

            //Remove Hamper Chip Label
            hamperContext.dispatch({type : "RemoveCartLabel", itemID: modalData.id})

            //Remove Product Chip Label
            productsContext.dispatch({type : "RemoveCartLabel", itemID: modalData.id})
            cartDispatch({type : "RemoveProduct", itemID : modalData.id})
        }
    }
   
    return (
        <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        disableScrollLock
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className="Modal">
          <div className="Control">
                <div className="Modal-title">
                    {modalData.title}
                    {modalIsHamper && " Basket"}
                </div>
                <IconButton className="Control-button" onClick={handleClose}>
                    <CancelPresentationRoundedIcon fontSize="medium" color="secondary"/>
                </IconButton>
          </div>
          <div className="Media" style={{background:`url(${modalData.imageURL})`}}>
                {
                   modalData.isInCart && (
                    <Chip
                    className="Media-chip"
                    label="In Cart"
                    color="secondary" size="large" />
                   )
               }
          </div>
          <div className={`${modalIsHamper ? "Body" :"Body-Product"}`}>
              <div className="Body-left">
                                
              </div>
              <div className="Body-right">
                <span className="Description-heading">Description</span>
                <div className="Description-text">
                    {
                        openModal && (
                            <div>
                                {
                                    desc.split('\n').map((item,index) => <li style={{listStyle:"none"}} key={uuid()}>{item}</li>)
                                
                                }
                            </div>
                        )
                            
                    }
               </div>
              </div>
          </div>
          <div className="ModCon">
                 <div className="Modal-price">
                    <span>{`R${modalData.price}`}</span>
                </div>
                <div className="ModCon-buttonControl">
                    <div>
                        {
                            modalData.isInCart && (
                                <IconButton onClick={(e) => handleRemoveQuantityClick((cartProducts.find(item => item.productID === modalData.id ).qty))}>
                                    <RemoveCircleIcon color="secondary"/>
                                </IconButton>
                            )
                        }
                        {
                            modalData.isInCart && cartProducts.length > 0 && `In Cart | * ${cartProducts.find(item => item.productID === modalData.id ).qty}` 
                        }
                        {
                            modalData.isInCart && (
                                <IconButton onClick={(e) => handleAddQuantityClick()}>
                                    <AddCircleIcon color="secondary"/>
                                </IconButton>
                            )
                        }
                    </div>
                    <Button
                        onClick={
                        modalData.isInCart ? handleInCart  : 
                        (e) => handleAddToCart()

                        }
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<AddShoppingCartIcon/>}>
                            {modalData.isInCart && cartProducts.length > 0 ? `In Cart | R${Total}` : "Add to Cart"}
                    </Button>
                </div>
                
          </div>           
          </div>
        </Fade>
      </Modal>
    </div>
    )
}

export default ProductModal;