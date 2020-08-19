import React from 'react';
import './../Styles/Display.scss';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';
import HighQualityIcon from '@material-ui/icons/HighQuality';
import { Button, IconButton } from '@material-ui/core';

const FlashBar = () =>{
    
    return(
        <div className="FlashBar">
            <div className="FlashBar-extra">
                <div className="FlashBar-extra-info">
                    <span>
                        <IconButton  size="small" disabled>
                            <LocalShippingIcon/>
                        </IconButton>
                    </span>
                    <span style={{"margin-left": "1rem"}}>Fast Delivery</span>
                </div>
                <div className="FlashBar-extra-info">
                    <span>
                        <IconButton size="small" disabled >
                            <HighQualityIcon/>
                        </IconButton>
                    </span>
                    <span style={{"margin-left": "1rem"}}>Premium Service</span>
                </div>
                <div className="FlashBar-extra-info">
                    <span>
                        <IconButton size="small" disabled >
                            <PaymentIcon/>
                        </IconButton>
                    </span>
                    <span style={{"margin-left": "1rem"}}>Secure Payments</span>
                </div>
            </div>
            <div className="FlashBar-signup">
                <div className="FlashBar-text">
                    Discover Awesome benefits and receive latest updates
                </div>
                <Button variant="contained" color="primary" size="small">
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default FlashBar