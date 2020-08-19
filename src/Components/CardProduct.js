import React, {useContext} from 'react';
import {ProductsContext} from '../Context/Products.context'
import {ControlContext} from '../Context/Control.context'
import {CartContext} from "../Context/Cart.context"
import { Chip, IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles ,createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';

//Define Overridding Icon Buttton Class
const ButtonTheme =  createMuiTheme({
    
    overrides : {
        MuiSvgIcon : {
             root: {
                fontSize : '1.2em',
                color : "#284453"
            },
        },
        MuiButton : {
           root: {
                letterSpacing : "0",
                lineHeight : "0",
                minWidth : "20px",
                fontWeight : "900",
            },
            containedSizeSmall : {
                padding: "5px 8px",
                fontSize : "0.575rem",
            }
        }
       
    },
});
const useStyles = makeStyles((theme) => ({
    root: {
    
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    marginR :{
        marginLeft : ".5rem"
    },
    positionChip : {
        position : "absolute",
        top : "1rem",
        right : "1rem"
    },actionColor:{
        backgroundColor:"purple"
    }
  }));
const CardProduct = (props) => {

    //Import the states and functions from context
    const {title,description,price,id,isInCart,imageURL,stock_qty,special} = props;
    const {openDispatch} = useContext(ControlContext)
    const {dispatch} = useContext(ProductsContext)
    const {cartDispatch} = useContext(CartContext)

    //Define Styles
    const classes = useStyles();

    //Define Functions 

    const handleDelete = (prodId) => {
     //Remove  Cart Label From product
     dispatch({type : "RemoveCartLabel", itemID: prodId})

     //Remove the product from the cart 
     cartDispatch({type : "RemoveProduct", itemID : id})
    };

    const handleCartClick = (id,name,price,qty,url) => {
        //Add Chip on Product
        dispatch({type : "AddCartLabel", itemID: id})

        //Add Product to Cart
        cartDispatch({type : "AddProduct", itemID : id,itemTitle: name, itemPrice:price, itemQty : qty,itemURL : url})

        
    }

    const handleClick = (prodId) => {
        //Open Cart
        openDispatch({type :"CART"})
    };

    //Handle Modal 
    const handleModalData = (idA, titleA, productsA,imageA,priceA,isInC ) =>{
        openDispatch({type : "ModalDataProduct", payload : {id : idA,title : titleA, description : productsA,imageURL:imageA ,price : priceA,isInCart : isInC}});
        openDispatch({type : "MODAL"});
    }

 
    return(
        props.isLoading === true ? 
            <div>
                <CircularProgress />
                <CircularProgress color="secondary" />
            </div> :
            ( <div className="Card" style={{height : "15rem"}}>
                {
                    stock_qty < 1 && (
                        <div className="Card-stock">
                            <div className="Card-stock-label">Out of Stock</div>
                        </div>
                    )
                }
                <div className="Card-Media" style={{backgroundImage : `url(${imageURL})`,backgroundSize: "70%", backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>
                    {
                        special && (
                            <div class="Card-ribbon Card-ribbon-top">
                                <span>{`Save R${special.save}`}</span>
                            </div>
                        )
                    }
                
                    {
                        isInCart && (
                            <Chip
                                className={classes.positionChip}
                                label="In Cart"
                                clickable
                                onClick={() => handleClick(id)}
                                onDelete={() => handleDelete(id)}
                                color="secondary" size="small" 
                            />
                        )  
                    }
                </div>
                <div className= "Card-Action">
                    <div className="Card-Action--heading">

                    <span>{title}</span>
                    </div>
                    <div className="Card-Action--text">
                        <span className="Card-Action--spanText" >{`Price : R${price}`}</span>
                        {
                            special && <span className="Card-Action--spanText crossedOut">{`R${special.specialPrice}`}</span>
                        }
                    </div>
                    <div className="Card-Hamper--control">
                            <ThemeProvider theme={ButtonTheme}>
                                <Button onClick={(e) => handleCartClick(id ,title,price, 1,imageURL)} size="small"
                                 variant="contained"
                                 endIcon={<AddShoppingCartIcon fontsize="small"></AddShoppingCartIcon>} >
                                    Add
                                </Button>
                                <IconButton   onClick={(e) => handleModalData(id, title,description,imageURL,price,isInCart)} size="small" >
                                    <InfoIcon color="secondary" fontsize="medium"/>
                                </IconButton>
                            </ThemeProvider>
                        </div>
                </div>
            </div>
        )
            
    )
}
export default CardProduct;