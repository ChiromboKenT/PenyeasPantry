import React,{useContext} from 'react';
import  ReviewBackdrop from "./ReviewBackdrop"
import {PaymentContext} from "../Context/Payment.context"
import axios from 'axios';


    const PayWithPayfast = ({billingData, shippingData, cartID,items,Total,history}) => {
    const {isPaying,handleIsPaying} = useContext(PaymentContext)
    const {billFirstName,billLastName,billCity,billProvince,billCountry,billMobile,billEmail,billAddressLineOne,billAddressLineTwo} = billingData
    const {city,province,country,mobile,addressLineOne,addressLineTwo, deliverInstructions,firstName,lastName} = shippingData
    let data = new URLSearchParams()
    
    data.set("merchant_id" , "15055294")
    data.set("merchant_key" , "mu9k8pig0pdr7")
    data.set("return_url" , " https://www.edx.org/course/think-create-code");
    data.set("notify_url","https://sandbox.payfast.co.za/eng/query/validate");
    data.set("name_first" , `${billFirstName}`);
    data.set("name_last" , `${billLastName}`);
    data.set("email_address" , `${billEmail}`);
    data.set("cell_number",billMobile);
    data.set("m_payment_id" , `${cartID}`)
    data.set("amount" , Total);
    data.set( "item_name" , `${items.map(product => product.productTitle )} `)
    data.set("item_description" , "PenyesaPantryProducts");
    data.set("email_confirmation" , 1);
    data.set("confirmation_address", "developer20@penyesa.co.za")
    data.set("payment_method" ,  "cc")

     /*
    const handleSendPay = async () => {
        try{
            const mesage = "merchant_id=10018603&merchant_key=87l7owtfjrrdr&return_url=https://www.edx.org/course/think-create-code&notify_url=https://sandbox.payfast.co.za/eng/query/validate&name_first=Tamuka&name_last=Muregedze&email_address=ken@example.com&cell_number=0789123522&m_payment_id=N656ST7Y7A&amount=1280&item_name=Express,Basmati Rice &item_description=PenyesaPantryProducts&email_confirmation=1&confirmation_address=developer20@penyesa.co.za&payment_method=cc"
            const md5Hash = md5(mesage).toString()
            const formData = [...data.entries()];
            const formDataString = formData.map(item => `${item[0]}=${item[1]}`).join('&')
            <input type="hidden" name="payment_method" value="cc"
            console.log(md5Hash)
        }catch(error){
            console.log(error)
        }
    }
   
    
    }  */

    const handlePostData = async () => {
        try{        
            const response = await axios({
                method : "post",
                url : " https://rartx1msad.execute-api.eu-west-1.amazonaws.com/Production/pendingorders",
                headers : {
                    "content-type":"application/json"
                },
                data : { 
                    Order_ID : `${cartID}`,
                    billName : `${billFirstName} ${billLastName}`,
                    billEmail : `${billEmail}`,
                    paymentMethod : "Payfast",
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
                }               
            })
            
        }catch(error){
            console.log(error.toJSON())
            alert("Error Occured Please Kindly Reload Cart. Redirecting To Pantry Home");
            history.push("/")
            handleIsPaying(false)
        }
    }
    const handleSubmitPay = async (event) => {

        event.preventDefault();
        console.log(event.target.id)
        handleIsPaying(true)
        handlePostData()
        event.target.submit()
    }
    
   
    return (
        <>
        <form onSubmit={handleSubmitPay} action="https://www.payfast.co.za/eng/process" method="POST" id="myForm"> 
            <input type="hidden" readOnly name="merchant_id" value="15055294"/>
          <input type="hidden" readOnly name="merchant_key" value="mu9k8pig0pdr7"/>
          <input type="hidden" readOnly name="return_url" value={`https://pantry.penyesa.co.za/checkout/successConfirmation/0/${cartID}`}/>
          <input type="hidden" readOnly name="cancel_url" value={`https://pantry.penyesa.co.za`}/>
          <input type="hidden" readOnly name="name_first" value={billFirstName}/>
          <input type="hidden" readOnly name="name_last" value={billLastName}/>
          <input type="hidden" readOnly name="email_address" value={billEmail}/>
          <input type="hidden" readOnly name="cell_number" value={billMobile}/>
          <input type="hidden" readOnly name="m_payment_id" value={cartID}/>
          <input type="hidden" readOnly name="amount" value={Total}/>
          <input type="hidden" readOnly name="item_name" value="PenyesaGroceryPackage"/>
          <input type="hidden" readOnly name="item_description" value={`${items.map(product => product.productTitle )} `}/>
          <input type="hidden" readOnly name="email_confirmation" value="1"/>
          <input type="hidden" readOnly name="confirmation_address" value="shorai@penyesa.co.za"/>
        </form>
            <button className="checkout-control--next" type="submit" form="myForm">
                PAY
            </button>
            <ReviewBackdrop openState={isPaying}/>
        </>
    )
}

export default PayWithPayfast
