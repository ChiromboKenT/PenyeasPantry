import React , { useContext, useState}from  'react';
import {CheckoutContext} from '../Context/Checkout.context'
import {CartContext} from "../Context/Cart.context"
import {PaymentContext} from "../Context/Payment.context"
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {CartSummary} from './CartSummary';
import {NavLink} from 'react-router-dom'
import IconBreadcrumbs from './checkoutBreadCrumb'
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../Styles/Checkout.scss'
import Navbar from "./Navbar"
import uuid from 'react-uuid'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Penyesa Pantry & Home
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const steps = ['Shipping address', 'Payment details', 'Review your order'];
const routes = ["shippingInformation", "paymentInformation", "review"]
const paymentMethods = ["paypal","eft"]


export default function Checkout(props) {
 
  const [activeStep, setActiveStep] = useState(0);
  const {cartData,checkBillAddress,paySuccessData  } = useContext(CheckoutContext)
  const {isPaying, handleIsPaying} = useContext(PaymentContext);
  const [paymethodState, setPaymethodState] = useState(0)
  const {cartProducts,cartID} = useContext(CartContext)
  const {routeName} = props.match.params
  const {history} = props

  const handleSetPaymentMethod = (paymentName) => {
    setPaymethodState(paymentName)
  }
  const handleNext = () => {
    
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    activeStep > 0 && setActiveStep(activeStep - 1);
    props.history.goBack()
  };
  const handleCrumbClick = (e) =>{
    e.preventDefault()
  }

  function getStepContent(step) {
    switch (step) {
      case "shippingInformation":
        
        return <AddressForm history={history} cartData={cartProducts} handleNext={handleNext} handleBack={handleBack}/>;
      case "paymentInformation":
       
        return <PaymentForm history={history} cartData={cartProducts} 
              handleNext={handleNext} handleBack={handleBack}
              paymentMethod={paymethodState} 
              handlePaymentMethod={handleSetPaymentMethod}
            />;
      case "review":
        return <Review history={history} cartData={cartProducts}
              handleBack={handleBack} cartID={cartID}
              paymentMethod={paymethodState}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
      <div className="checkout">
        <div className="Navbar" style={{zIndex: 0, position : "static" }}>
          <div className="Navbar-text">
              <NavLink to="/" className="Navbar-link">
                Pantry & Home
              </NavLink>
            
          </div>
        </div>
         {
           routeName !== "successConfirmation" || paySuccessData ? (

            <div className="checkout-container">
            <div className="checkout-left">
              <div className="checkout-heading">
               {routeName === "successConfirmation" ? "Payment successful" : "Checkout"} 
                  
              </div>
              <div className="checkout-breadcrumb">
                <Stepper activeStep={activeStep} >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              <div >
                <React.Fragment>
                  {routeName === "successConfirmation" ? (
                    <React.Fragment>
                      <Typography variant="h5" gutterBottom>
                        Thank you for your purchase.
                      </Typography>
                      <Typography variant="subtitle1">
                        {`Thank you ${paySuccessData.order_name}. Your order number is #${paySuccessData.order_id}. We have emailed your order confirmation, and will
                        send you an update when your order has shipped. If you have any enquires contact ${paySuccessData.contact}`}
                      </Typography>
                    </React.Fragment>
                  ) : (
                    <div className ="checkout-component">
                    {getStepContent(routeName)}
                    </div>
                  )}
                </React.Fragment>
              </div>
            </div>
            {routeName !== "successConfirmation" && 
              <div className="checkout-right">
                  <CartSummary cartProducts={cartProducts}/>
              </div>
            }
          </div>
           ) : (
              <div style={{with : "100%", display : "flex", justifyContent : "center"}}>
                   <Typography style={{padding : "2rem"}}variant="h5" gutterBottom>
                      No Purchase Information found, please review your purchase and/or contact info@penyesa.co.za
                  </Typography>    
             </div>
           )
         }
    </div>
  )
}