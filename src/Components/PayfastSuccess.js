import React,{useEffect,useState} from 'react'
import Navbar  from "./Navbar"
import "../Styles/PayfastSuccess.scss"
import axios from "axios"
import uuid from "react-uuid"
import ReviewBackdrop from "./ReviewBackdrop"
import emailjs from 'emailjs-com';
import ReactDOMServer from 'react-dom/server';


const Service_ID = "smtp_server";
const Template_ID ="penyesa_pantry_Invoice";
const User_ID = "user_K4qsbXBtZjLdm68HrBejv"

const handleSendEmail =  async (data) => {
    
    try{
        const items = JSON.parse(data.products)
        const Total = items.reduce((acc,current) => acc + current.price * current.quantity,0).toFixed(2)
        const vat = (0.15 * Total).toFixed(2);
        const subTotal = (0.85 * Total).toFixed(2);
            const payfastEmailData = {
            invoice_no : `0020${data.id}`.slice(-3).toUpperCase(),
            payRef : data.Order_ID, 
            billName : data.billName,
            billEmail : data.billEmail,
            billAddress : data.billAddress,
            shipAddress : data.shipAddress,
            InvoiceText : "Thank you for your purchase.This confirms receipt of your payment and Penyesa is now busy with your order.",
            shipPhone : data.shipMobile,
            shipName : data.shipName,
            deliveryInstruction : data.deliveryInstructions,
            paymentMethod : data.paymentMethod,
            productsBody : ReactDOMServer.renderToStaticMarkup(
                <table style={{width:"80%",border:"1px solid #fe731e",borderCollapse:"collapse",margin:"2em 0 2em",font:"1em"}}>
                <tr style={{backgroundColor:"#fe731e",color:"black",borderBottom:"1px solid #fe731e"}}>
                    <th style={{width:"64.285%",textAlign:"left",padding:"0.8em 1em"}}>Product</th>
                    <th style={{width:"13.05%",verticalAlign:"top",textAlign:"center",padding:"0.8em 1em"}}>Quantity</th>
                    <th style={{width:"21.4285",padding:"0.8em 1em",textAlign:"right",verticalAlign:"top",padding:"0.8em 1em"}}>price</th>
                </tr>
                    {
                        items.map(item => (
                            <tr  key={uuid()}>
                                <td style={{border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>{item.name}</td>
                                <td style={{border:"0.8px solid #dddddd",textAlign:"center",padding:"0.8em 1em"}}>{item.quantity}</td>
                                <td style={{border:"0.8px solid #dddddd",textAlign:"right",padding:"0.8em 1em"}}>R{item.price}</td>
                            </tr>
                        ))
                    }
                  <tr style={{borderBottom:"0.8px solid #dddddd"}}>
                    <td colSpan="2" style={{textAlign:"right",fontWeight:"900",border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>SubTotal</td>
                    <td style={{textAlign:"right",fontWeight:"900",border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>R{subTotal}</td>
                 </tr>
                 <tr style={{borderBottom:"0.8px solid #dddddd"}}>
                    <td colSpan="2" style={{textAlign:"right",fontWeight:"900",border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>Vat 15%</td>
                    <td style={{textAlign:"right",fontWeight:"900",border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>R{vat}</td>
                 </tr>  
                 <tr style={{borderBottom:"0.8px solid #dddddd"}}>
                    <td colSpan="2" style={{textAlign:"right",fontWeight:"900",border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>Total</td>
                    <td style={{textAlign:"right",fontWeight:"900",border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>R{Total}</td>
                 </tr>
            </table>
               )
            
         }
        const emailRes = await emailjs.send(Service_ID,Template_ID,payfastEmailData,User_ID)
    }catch(error){
      console.log(error)
      return (error)
    }

 } 

export const PayFastSuccess = ({history,location,match}) => {
    const idValue = match.params.Order_ID
        const [isLoadingState, setIsLoadingstate] = useState(true)
        const  [error, setError] = useState(false)
        const [foundState, setFoundState] = useState(false)
        const [paymentData,setPaymentData] = useState({})
        
        const postData = async ()  => {
            try{
                const postResponse = await axios({
                    method : "post",
                    url : "https://rartx1msad.execute-api.eu-west-1.amazonaws.com/Production/successfulorders",
                    data : {
                            Order_ID :paymentData.Order_ID,
                            billName :paymentData.billName,
                            billEmail :paymentData.billEmail,
                            paymentMethod : paymentData.paymentMethod,
                            billNumber :paymentData.billNumber,
                            shipName :paymentData.shipName,
                            shipAddress :paymentData.shipAddress,
                            shipMobile :paymentData.shipMobile,
                            deliveryInstructions :paymentData.deliveryInstruction,
                            billAddress : paymentData.billAddress,
                            products : paymentData.products
                    }
                })
                return postResponse


            }catch(error){
                console.log(error.toJSON())
                
            }
        }
        const fetchOrder = async (id) =>{
            try{
                const response = await axios.get(`https://rartx1msad.execute-api.eu-west-1.amazonaws.com/Production/pendingorders/${id}`)
                const order = response.data.Item
                console.log(order)
                if(!(Object.keys(order).length === 0)){
                     setPaymentData({
                            Order_ID : order.Order_ID,
                            billName : order.billName,
                            billEmail :order.billEmail,
                            billAddress : order.billAddress,
                            paymentMethod : order.paymentMethod,
                            billNumber : order.billNumber,
                            shipName : order.shipName,
                            shipAddress : order.shipAddress,
                            shipMobile : order.shipMobile,
                            deliveryInstruction : order.deliveryInstruction,
                            products : order.products
                    })
                   
                    setFoundState(true)
                    setIsLoadingstate(false)
                
                }else {
                    setFoundState(false)
                    setIsLoadingstate(false)
                    throw Error("Not Found")
                }
            }catch(err){
                console.log(err)
              
            }
        }
        useEffect(() => {
           
            fetchOrder(idValue)
            
        },[])

        useEffect(() => {
            
            if(paymentData.Order_ID){
                postData().then(async (postResponse) => {
                    try{
                        handleSendEmail(postResponse.data)
                    }catch(err){
                        console.log(err)
                    }
                })
            }
        },[paymentData])
    return (
        <>
            <Navbar mode={"success"}/>
            <ReviewBackdrop openState={isLoadingState}/>                
            {
                foundState ? (<div style={{width :" 100%"}}>
                <div className="success-heading">
                    <h1>Payment Successful</h1>
                    
                </div>
                <p className="success-body">
                <p className="success-text"> 
                    {`Thank you ${paymentData.billName}. Your payment refernce is ${paymentData.Order_ID}. We have emailed your order confirmation, we will
                        send you an update when your order has been shipped. If you have any enquires contact info@penyesa.co.za `}
                    </p>
                </p>
            </div>) : ( !isLoadingState  &&
                <div style={{width :" 100%"}}>
                    <div className="success-heading">
                        <h1>Payment Unsuccessful</h1>
                        
                    </div>
                    <p className="success-body">
                    <p className="success-text"> 
                        {`Sorry, No Payment Found...If you made a payment. Please contact us at Info@penyesa.co.za `}
                        </p>
                    </p>
                </div>
            )

            }
        </>
    )
}
