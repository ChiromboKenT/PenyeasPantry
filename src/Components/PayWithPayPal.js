import React, {useState,useRef,useEffect,useContext} from 'react'
import {CheckoutContext} from "../Context/Checkout.context"
import {PaymentContext} from "../Context/Payment.context"
import  ReviewBackdrop from "./ReviewBackdrop"
import axios from 'axios'


export const PayWithPayPal = ({items,shippingData,billingData,history,handleSendEmail,cartID}) => {

    const {checkoutDispatch} = useContext(CheckoutContext)
    const {isPaying,handleIsPaying} = useContext(PaymentContext)
    const {billFirstName,billLastName,billCity,billProvince,billCountry,billMobile,billEmail,billAddressLineOne,billAddressLineTwo} = billingData
    const {city,province,country,mobile,addressLineOne,addressLineTwo, deliverInstructions,firstName,lastName} = shippingData
    let Total = 0;
    let vatTotal = 0;
    let subTotal = 0;

    const handleRedirect = (Order_ID) => {
        
        handleIsPaying(false);
        history.push(`successConfirmation/0/${Order_ID}`)
    }
    
  
   const convertToSubCurrency = (perc,baseVal,rateValue) => {
       const baseAmount =  (baseVal * perc)
       return (baseAmount * rateValue).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
   }
   const handleCreateOrder = async () =>{
        try{
            const response = await axios({
                method : "post",
                url : " https://rartx1msad.execute-api.eu-west-1.amazonaws.com/Production/pendingorders",
                data : JSON.stringify({ 
                    Order_ID : `${cartID}`,
                    billName : `${billFirstName} ${billLastName}`,
                    billEmail : `${billEmail}`,
                    paymentMethod : "PayPal",
                    billNumber : `${billMobile}`,
                    shipName : `${firstName} ${lastName}`,
                    shipAddress : `${addressLineOne} ${addressLineTwo ? addressLineTwo : ""}, ${city} ${province}, ${country}`,
                    billAddress : `${billAddressLineOne} , ${billCity} ${billProvince}, ${billCountry}`,
                    shipMobile : `${mobile}`,
                    deliveryInstruction : `${deliverInstructions}`,
                    products : JSON.stringify(items.map(product => {
                    return {
                        name : product.productTitle,
                        price : product.productPrice,
                        quantity : product.qty
                    }
                    }))
                }  )             
            })
            return response;
        }catch(err){
            console.log(err)
        }
       
   }
   
    useEffect(() => {
        let products = [];
        const getCurrency = async () =>{
            const results = await axios.get("https://api.exchangeratesapi.io/latest?base=ZAR")
            const rates = results.data.rates
            products = await items.map((item) => {
                return {
                    name : item.productTitle,
                    unit_amount : {
                        currency_code : "USD",
                        value : convertToSubCurrency(0.85,item.productPrice,rates["USD"]),

                    },
                    tax : {
                        currency_code : "USD",
                        value : convertToSubCurrency(0.15,item.productPrice,rates["USD"]),
                    },
                    quantity : item.qty,
                }
            })
            
            vatTotal = products.reduce((acc,current) => acc + (current.tax.value * current.quantity),0).toFixed(2);
            subTotal = products.reduce((acc,current) => acc + (current.unit_amount.value * current.quantity),0).toFixed(2);
            Total = (parseFloat(vatTotal) + parseFloat(subTotal)).toFixed(2);
           
        }
        getCurrency();
        window.paypal
            .Buttons({
                createOrder : async (data, actions) => {
                    try{
                        const resp = await handleCreateOrder()
                    }catch(err){
                        console.log(err);
                    }
                    return actions.order.create({
                        intent : 'CAPTURE',
                        purchase_units : [{
                            amount : {
                                currency_code : 'USD',
                                value : Total,
                                breakdown : {
                                    item_total : {
                                        currency_code : 'USD',
                                        value : subTotal,
                                    },
                                    tax_total : {
                                        currency_code : 'USD',
                                        value : vatTotal,
                                    }
                                }
                                
                            },
                            payee : {
                                email_address : "shorai@penyesa.co.za",
                                merchant_ID : "NHY7D537MQNNN"
                            },
                            description : "Penyesa Pantry groceries",
                            invoice_id : `${cartID}`,
                            items : products,
                            shipping : {
                                name : {
                                    full_name : `${shippingData.firstName}  ${shippingData.lastName}`
                                },
                                address : {
                                    address_line_1 : shippingData.addressLineOne,
                                    address_line_2 : shippingData.addressLineTwo,
                                    admin_area_2 : shippingData.city,
                                    admin_area_1 : shippingData.province,
                                    country_code : "ZW"
                                }
                            }
                        }]
                    })
                },
                onApprove : async (data,actions) =>  {
                    handleIsPaying(true);
                    const order = await actions.order.capture()
                                      
                   order.status === "COMPLETED" && handleRedirect(order.purchase_units[0].invoice_id)
                   
                    
                },
                onCancel : (data,actions) => {
                    {/**Handle on Cancel */}
                    console.log("You are a bummer!");
                },
                onError : err => {
                    setError(err);
                    console.log(err.toJSON())
                }
            }).render(payPalRef.current)

        
    },[items])
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const payPalRef = useRef();
    if (error){

    }

    return (
        <div>
          <div ref={payPalRef} />
          <ReviewBackdrop openState={isPaying}/>
        </div>
    )
}
