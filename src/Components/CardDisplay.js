import React, {useContext} from 'react';
import {ControlContext} from '../Context/Control.context'
import {CartContext} from '../Context/Cart.context'
import {HamperContext} from '../Context/Hamper.context'
import { makeStyles ,createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './../Styles/Card.scss'

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
    }
  }));

const CardDisplay = (props) => {
    const {id, title, description,category,price,imageURL,isInCart} = props
    const classes = useStyles();
    const {openDispatch} = useContext(ControlContext);
    const {cartDispatch} = useContext(CartContext);
    const {dispatch} = useContext(HamperContext)
    
    const handleDelete = (id) => {
        //Remove  Chip on product
       dispatch({type : "RemoveCartLabel", itemID: id})
       
       //Remove Product From cart
       cartDispatch({type : "RemoveProduct", itemID : id})
    };
  
    const handleClick = () => {
      openDispatch({type: "CART"});
    };
    const handleCartClick = (id,name,price,qty,url) => {
        //Add Chip on Product
        dispatch({type : "AddCartLabel", itemID: id})

        //Add Product to Cart
        cartDispatch({type : "AddProduct", itemID : id,itemTitle: name, itemPrice:price, itemQty : qty, itemURL : url})

        
    }

    const handleModalData = (idA, titleA, desc,imageA,priceA,isInC ) =>{
        openDispatch({type : "ModalData", payload : {id : idA, title : titleA, description : desc,imageURL:imageA ,price : priceA,isInCart : isInC}});
        openDispatch({type : "MODAL"});
    }
    
    return(
        <div className="Card" style={{height : "15rem"}}>
            
            <div className="Hamper-Media" style={{backgroundImage : `url(${imageURL})`,backgroundSize: "75%", backgroundPosition:"center", backgroundRepeat: "no-repeat"}}>
                {
                    isInCart && (
                        <Chip
                        className={classes.positionChip}
                        label="In Cart"
                        clickable
                        onClick={handleClick}
                        onDelete={(e) => handleDelete(id)}
                        color="secondary" size="small" />
                    )
                }
            </div>
            <div className= "Card-Action" style={{backgroundColor:"#dab92762"}}>
                <div className="Card-Action--heading">

                    <span>{`${title} Basket`}</span>
                    </div>
                <div className="Card-Action--text">
                    <span className="Card-Action--spanText">{`Price : R${price}`}</span>
                    
                </div>
                <div className="Card-Hamper--control">
                        <ThemeProvider theme={ButtonTheme}>
                            <Button onClick={(e) => handleCartClick(id ,title,price, 1,imageURL)} 
                            variant="contained" size="small"
                            endIcon={<AddShoppingCartIcon fontsize="small"></AddShoppingCartIcon>} >
                                Add
                            </Button>
                            <IconButton  onClick={(e) => handleModalData(id, title, description,imageURL,price,isInCart)} size="small" className={classes.marginR}>
                                <InfoIcon color="secondary" fontsize="small"/>
                            </IconButton>
                        </ThemeProvider>
                </div>
            </div>
        </div>
    )
}
export default CardDisplay ;
