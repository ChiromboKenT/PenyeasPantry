import React, {useState, useReducer, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import {CheckoutContext} from '../Context/Checkout.context'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Divider, Paper} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import {FormErrorsMessage} from "./FormErrors"
import "../Styles/errorStyles.scss" 

export default function AddressForm(props) {
  
  const { shippingData, checkoutDispatch} = useContext(CheckoutContext)
  //Destructure Input Fields from shippingData
  const {firstName,lastName,addressLineOne,addressLineTwo,city,province,deliverInstructions,country,mobile,} = shippingData;

  //Use form destructure
  const {register,handleSubmit,errors,formState: { isSubmitting }} = useForm()

  const handleInputChange = (e) => {
    checkoutDispatch({type : "ShippingData" , key : e.target.name, load : e.target.value})
  }

  
  const handleFormSubmit = (data) => {
    props.history.push("paymentInformation")
    
 }

   return (
    <React.Fragment>
      
      <Typography variant="h6" gutterBottom>
        Shipping address and Receiver details
      </Typography>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)} id="addressForm">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="Receiver's First name"
              fullWidth
              value={firstName}
              onChange={handleInputChange}
              autoComplete="off"
              required error={errors.firstName? true : false}
              inputRef={register({required : true})}
            />
            <FormErrorsMessage error={errors.firstName} name="firstName" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Receiver's Last name"
              value={lastName}
              onChange={handleInputChange}
              fullWidth
              autoComplete="off"
              required error={errors.lastName? true : false}
              inputRef={register({required : true})}
            />
            <FormErrorsMessage error={errors.lastName} name="lastName" />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              id="rMobile"
              type="tel"
              name="mobile"
              label="Receiver's Mobile"
              value={mobile} 
              onChange={handleInputChange}
              fullWidth required error={errors.mobile? true : false}
              autoComplete="off"
              inputRef={register({required : true,pattern : /^((?:\+263|\+27|263|27)|0)(\d{2})-?(\d{3})-?(\d{4})$/i })}
            />
            <FormErrorsMessage error={errors.mobile} name="mobile" />
          </Grid>        
          <Grid item xs={12}>
            <TextField
              id="address1"
              name="addressLineOne"
              value={addressLineOne}
              onChange={handleInputChange}
              label="Address line 1"
              fullWidth
              required error={errors.addressLineOne? true : false}
              autoComplete="shipping address-line1"
              inputRef={register({required : true})}
            />
            <FormErrorsMessage error={errors.addressLineOne} name="addressLineOne" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="addressLineTwo"
              label="Address line 2"
              value={addressLineTwo}
              onChange={handleInputChange}
              fullWidth 
              autoComplete="shipping address-line2"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City"
              value={city}
              required error={errors.city? true : false}
              onChange={handleInputChange}
              fullWidth
              autoComplete="shipping address-level2"
              inputRef={register({required: true})}
            />
            <FormErrorsMessage error={errors.city} name="city" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="stateProvince"  
            label="State/Province/Region" name="province"
            value={province} onChange={handleInputChange} fullWidth 
            inputRef={register({required : true})}
            required error={errors.province? true : false}
            />
            <FormErrorsMessage error={errors.province} name="province" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="country"
              name="country"
              label="Country"
              value={country}
              onChange={handleInputChange}
              fullWidth required error={errors.country? true : false}
              autoComplete="shipping country"
              inputRef={register({required : true})}
            />
            <FormErrorsMessage error={errors.country} name="country" />
          </Grid> 

          <Grid item xs={12} >
              <TextField
              id="outlined-multiline-static"
              name="deliverInstructions"
              label="Special Delivery Instructions"
              value={deliverInstructions}
              onChange={handleInputChange}
              multiline
              rows={7}
              fullWidth
              variant="outlined"
            />
          </Grid>     
        </Grid>
      </form>
      <div className="checkout-control">
          <button className="checkout-control--back"  onClick={props.history.goBack}>
                    Back
          </button>
          <button className="checkout-control--next" disabled={isSubmitting} form="addressForm" type="submit" >
            Next
          </button>
          
      </div>
    </React.Fragment>
  );
}