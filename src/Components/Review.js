import React, {useContext} from 'react';
import { CheckoutContext } from '../Context/Checkout.context';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'
import{ PayWithPayPal} from "./PayWithPayPal"
import PayfastLogo from '../Icons/payfastlogo.png'
import PaypalLogo from  '../Icons/paypallogo.png'
import EftLogo from  '../Icons/eftlogo.jpg'
import PayWithPayfast from "./PayWithPayfast"
import PayWithEft from "./PayWithEft"
import emailjs from 'emailjs-com';


const Service_ID = "smtp_server";
const Template_ID ="penyesa_pantry_Invoice";
const User_ID = "user_K4qsbXBtZjLdm68HrBejv"



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));



export default function Review(props) {
  const classes = useStyles();
  const products = props.cartData 
  const {billingData,shippingData} = useContext(CheckoutContext)
  const cartID = props.cartID
  
  const {paymentMethod} = props;
  const Total = products.reduce((acc,current) => acc + current.qty * current.productPrice,0).toFixed(2);
  const vat = (0.15 * Total).toFixed(2);
  const SubTotal = (0.85 * Total).toFixed(2); 

  const {firstName,lastName,city,province,country,mobile,addressLineOne,addressLineTwo} = shippingData
  const {billCity,billProvince,billCountry,billMobile,billEmail,billAddressLineOne,billAddressLineTwo} = billingData


  const handleFormSubmit = (e) => {
    e.preventDefault();
 }
 const imageLogo = () => {
   if(paymentMethod === "PaypalLogo"){
     return <img style={{marginTop: "1.5rem"}} src={PaypalLogo} alt="paypallogo" width="220px" height="82"/>
   }else if(paymentMethod === "EftLogo"){
    return <img src={EftLogo} alt="eftlogo"  width="220px" height="157" />
   }else if (paymentMethod === "PayfastLogo"){
    return <img style={{marginTop: "1.5rem"}} src={PayfastLogo} alt="payfastlogo" width="220px" height="72"/>
   }
 }

 const handleSendEmail =  async (data) => {
    try{
      const emailResponse = await emailjs.send(Service_ID,Template_ID,data,User_ID);
      return emailResponse
    }catch(error){
      console.log(error)
      return (error)
    }

 } 

 const SelectedPayment = () => {
   
   switch(paymentMethod){
      case "PaypalLogo" :
        return <div>
          <PayWithPayPal items={products} history={props.history} billingData={billingData} shippingData={shippingData} 
          handleSendEmail={handleSendEmail} cartID= {cartID}/>
        <button className="checkout-control--back"  onClick={props.history.goBack}>
                  Back
        </button>
        </div>
      case "EftLogo" : 
       return (
         <PayWithEft history items={products} history={props.history} billingData={billingData} shippingData={shippingData} 
         handleSendEmail={handleSendEmail} cartID={cartID} Total={Total} vat={vat} SubTotal={SubTotal}/>
        )
        case "PayfastLogo" :
          return (
            <PayWithPayfast  items={products} history={props.history} billingData={billingData} shippingData={shippingData}
                  cartID= {cartID} handleSendEmail={handleSendEmail} Total={Total} vat={vat} SubTotal={SubTotal}
                >
            PayNows
          </PayWithPayfast>
          )
   
   }
 }

  return (
    <React.Fragment>
    
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.productID}>
            <ListItemText primary={`${product.qty} x ${product.productTitle}`} secondary={product.description} />
            <Typography variant="body1">R{product.productPrice}</Typography>
            <Divider variant="fullWidth" component="hr" orientation="horizontal"/>
          </ListItem>
          
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
           {`R${Total}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${firstName} ${lastName}`}</Typography>
          <Typography gutterBottom>{`${addressLineOne}${addressLineTwo == "" ? "," : `${addressLineTwo} `}${city} 
          ${province}, ${country}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
              Selected Payment Method
            </Typography>
            {imageLogo()}
        </Grid>
      </Grid>

      <div className="checkout-control">
        { paymentMethod !== "PaypalLogo" && <button className="checkout-control--back"  onClick={props.history.goBack}>
                  Back
        </button>}
        {
          SelectedPayment()
        } 
      </div>
    </React.Fragment>
  );
}