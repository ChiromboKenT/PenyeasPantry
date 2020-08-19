import React, {useContext} from 'react'
import {ControlContext} from '../Context/Control.context';
import {CartContext} from '../Context/Cart.context'
import {IconButton} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import {NavLink} from "react-router-dom"

import "./../Styles/Navbar.scss"

const Navbar = ({mode}) =>{
    const {openDispatch,openCart, openMenu } = useContext(ControlContext);
    const { cartTotal} = useContext(CartContext);
    
    return(
        <div className="Navbar">
           
                <div className="Navbar-text">
                    <NavLink to="/" className="Navbar-link">
                        {mode === 'success' && <HomeIcon fontSize="medium" style={{color:"#f5f0c4", marginRight :".3rem"}}/>} Pantry & Home
                    </NavLink>
                </div>
            <a 
            href="mailto:info@penyesa.co.za,shorai@penyesa.co.za?bcc=developer20@penyesa.co.za&subject=Enquiry&body=Greetings%20Penyesa%2C%0D%0A%0D%0AI%20would%20like%20to%20make%20an%20enquiry%20regarding%20%3A%0D%0A%0D%0A%0D%0A%0D%0A">
                <EmailIcon fontSize="medium" style={{color:"#f5f0c4", marginRight :".3rem"}}/>
            </a>
            {
                mode !== "success" && <>
                    {/* <IconButton onClick={() => openDispatch({type: "MENU"})} style={{color:"white"}}>
                        <AddIcon/>
                     </IconButton> */}
                    <IconButton onClick={() => openDispatch({type :'CART'})} style={{color:"#f5f0c4"}}>
                    <Badge badgeContent={`${cartTotal}`} color="secondary">
                            <ShoppingCartIcon />
                    </Badge>
                    </IconButton>
                </>
            }
            

        </div>
    )
}
export default Navbar