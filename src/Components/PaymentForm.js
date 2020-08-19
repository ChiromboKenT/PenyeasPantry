import React, {useContext,useState} from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import{ CheckoutContext} from '../Context/Checkout.context'
import Radio from '@material-ui/core/Radio';
import '../Styles/Checkout.scss'
import PayfastLogo from '../Icons/payfastlogo.png'
import PaypalLogo from  '../Icons/paypallogo.png'
import EftLogo from  '../Icons/eftlogo.jpg'
import {useForm} from 'react-hook-form'
import {FormErrorsMessage} from "./FormErrors"
import "../Styles/errorStyles.scss" 





//Override Css

const radioButtonTheme = createMuiTheme({
  overrides: {
    MuiFormControllabel : {
      labelPlacementTop : {
        marginLeft : "0"
      }
    }
  }
})
export default function PaymentForm(props) {
  const {billingData,checkBillAddress,shippingData, checkoutDispatch} = useContext(CheckoutContext)
  const { paymentMethod ,handlePaymentMethod} = props
  const {billFirstName,billLastName, billAddressLineOne, billAddressLineTwo,billCity,billProvince, billCountry,billMobile,billEmail} = billingData;
  
  //Use form destructure
  const {register,handleSubmit,errors,formState: { isSubmitting }} = useForm()

  const handleInputChange = (e) => {
    checkoutDispatch({type : "BillingData" , key : e.target.name, load : e.target.value})
  }
 
  const handleChange = (event) => {
    handlePaymentMethod(event.target.value)
  };

  

  const handleFormSubmit = (data) => {
    
     props.history.push("review")
     
  }
  const handleCheckBoxSate = () => {
    checkoutDispatch({type : "BILLADDRESSCHECK"})
    !checkBillAddress && checkoutDispatch({type : "ShipToBillAddress" })
    checkBillAddress && checkoutDispatch({type : "ResetBillInfo"})
  }
  return (
  <React.Fragment>
     
      <Typography variant="h6" gutterBottom>
        Select Payment Method
      </Typography>
    <form  noValidate onSubmit={handleSubmit(handleFormSubmit)} id="payForm">
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <div className="PayOption">
        <ThemeProvider theme={radioButtonTheme}>
        <FormControlLabel 
          control={<Radio
                        checked={ paymentMethod === "PaypalLogo"}
                        onChange={handleChange}
                        required inputRef={register({required : true})} 
                        value="PaypalLogo"
                        name="RadioButton"
                        labelPlacement="top"
                        inputProps={{ 'aria-label': 'A' }}
                      />}
                  label={<img src={PaypalLogo} alt="paypallogo" width="92px" height="32px"/>}
                  labelPlacement="top"
        />
          <FormControlLabel 
          control={<Radio
                        checked={ paymentMethod === "EftLogo"}
                        onChange={handleChange}
                        required inputRef={register({required : true})} 
                        value="EftLogo"
                        name="RadioButton"
                        labelPlacement="top"
                        inputProps={{ 'aria-label': 'A' }}
                      />}
          label={<img src={ EftLogo} alt=" EftLogo" width="110x" height="76px"/>}
          labelPlacement="top"
        />
          <FormControlLabel 
          control={<Radio
                        checked={ paymentMethod === "PayfastLogo"}
                        onChange={handleChange}
                        required inputRef={register({required : true})} 
                        value="PayfastLogo"
                        name="RadioButton"
                        labelPlacement="top"
                        inputProps={{ 'aria-label': 'A' }}
                      />}
          label={<img src={PayfastLogo} alt="paypallogo" width="96px" height="32px"/>}
          labelPlacement="top"
        />
        </ThemeProvider>
          
      </div>
      <FormErrorsMessage error={errors.RadioButton} name="Radio Button" />
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        Billing Information
      </Typography>
      <Grid container spacing={3}>
        
      
        <Grid item xs={12} md={6}>
          <TextField
            required error={errors.billFirstName? true : false}
            id="billFirstName"
            name="billFirstName" 
            inputRef={register({required : true})} 
            label="First Name" 
            fullWidth
            value={billFirstName} onChange={handleInputChange}/>
          <FormErrorsMessage error={errors.billFirstName} name="First Name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required error={errors.billLastName? true : false} 
            id="billLastName"
            name="billLastName"
            inputRef={register({required : true})} 
            label="Last Name" fullWidth 
             value={billLastName} onChange={handleInputChange}
          />
            <FormErrorsMessage error={errors.billLastName} name="Last Name" />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
             required 
            id="billMobile"
            name="billMobile"
            inputRef={register({required : true,pattern : /^((?:\+263|\+27|263|27)|0)(\d{2})-?(\d{3})-?(\d{4})$/i })}
            label="Mobile"
            value={billMobile} onChange={handleInputChange}
            fullWidth
          />
           <FormErrorsMessage error={errors.billMobile} name="Mobile Number" />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            
            id="billEmail"
            name="billEmail"
            label="Email"
            fullWidth 
            value ={billEmail} onChange={handleInputChange} 
          />
        </Grid>
        <Grid item xs={12} > 
          <FormControlLabel
            control={<Checkbox color="secondary" name="sAddress" 
            inputRef={register()} 
             value="yes" onChange={(e) => handleCheckBoxSate()} 
            checked={checkBillAddress}/>}
            label="Billing Address same as Shipping Address"
          />
        </Grid>
        {
            !checkBillAddress && (
              <>
              <Grid item xs={12}>
                <TextField
                   required error={errors.billAddressLineOne? true : false}
                  id="billAddress1"
                  name="billAddressLineOne"
                  label="Address line 1"
                  inputRef={register({required : true})} 
                  value={checkBillAddress ? shippingData.addressLineOne : billAddressLineOne} onChange={handleInputChange}
                  fullWidth
                  autoComplete="shipping address-line1"
                />
                  <FormErrorsMessage error={errors.billAddressLineOne} name="Billing Address" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="billAddress2"
                  name="billAddressLineTwo"
                  label="Address line 2"
                  value={checkBillAddress ? shippingData.addressLineTwo : billAddressLineTwo} onChange={handleInputChange}
                  fullWidth
                  autoComplete="shipping address-line2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
               required error={errors.billCity? true : false}
                id="billCity"
                name="billCity"
                inputRef={register({required : true})} 
                label="City"
                value={checkBillAddress ? shippingData.city : billCity} onChange={handleInputChange}
                fullWidth
                autoComplete="shipping address-level2"
              />
              <FormErrorsMessage error={errors.billCity} name="city" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="billProvince"
               name="billProvince"
               required 
               inputRef={register({required : true})} 
               error={errors.billProvince? true : false}
               label="State/Province/Region"
              value={billProvince} onChange={handleInputChange} fullWidth />
               <FormErrorsMessage error={errors.billProvince} name="city" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required error={errors.billCountry? true : false}
                id="billCountry"
                name="billCountry"
                inputRef={register({required : true})} 
                label="Country"
                value={checkBillAddress ? shippingData.country : billCountry} onChange={handleInputChange}
                fullWidth
                autoComplete="shipping country"
              />
            </Grid>
              </>)
        }

      </Grid>
    </form>
    <div className="checkout-control">
      <button className="checkout-control--back"  onClick={props.history.goBack}>
                Back
      </button>
        <button className="checkout-control--next" disabled={isSubmitting} form="payForm" type="submit" >
          Next
      </button>
              
    </div>
          
     
  </React.Fragment>
  )
}