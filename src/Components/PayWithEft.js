import React,{useContext,useEffect,useState} from 'react'
import ReactDOMServer from 'react-dom/server';
import {InvoiceContext} from "../Context/Invoice.Context"
import  ReviewBackdrop from "./ReviewBackdrop"
import uuid from "react-uuid"

const PayWithEft = (props) => {
    const [isPaying,handleIsPaying] = useState(false)
    const {invoiceData, invoiceDispatch} = useContext(InvoiceContext);
    const {items,billingData,shippingData,history,Total,SubTotal,vat,cartID,handleSendEmail} = props 
    useEffect(() => {
        invoiceDispatch({type: "Generate",cartData : items, billingData,shippingData,cartID });
    },[cartID])

    const handleInvoiceGeneration = async (event) =>{
        handleIsPaying(true)
        const invoiceEmailData = {
           invoice_no : invoiceData.invoice_no,
           payRef : invoiceData.id, 
           billName : invoiceData.billName,
           billEmail : invoiceData.billEmail,
           billAddress : invoiceData.billAddress,
           shipAddress : invoiceData.shipAddress,
           shipPhone : invoiceData.shipPhone,
           InvoiceText : "Thank you for your order.This confirms that we have received your order which we have placed on hold until we can confirm that payment has been received.\n Please use the payment reference provided or full name as reference and kindly send the proof of payment to info@penyesa.co.za",
           shipName : invoiceData.shipName,
           productsBody : ReactDOMServer.renderToStaticMarkup(
            <table style={{width:"80%",border:"1px solid #fe731e",borderCollapse:"collapse",margin:"2em 0 2em",font:"1em"}}>
            <tr style={{backgroundColor:"#fe731e",color:"black",borderBottom:"1px solid #fe731e"}}>
                <th style={{width:"64.285%",textAlign:"left",padding:"0.8em 1em"}}>Product</th>
                <th style={{width:"13.05%",verticalAlign:"top",textAlign:"center",padding:"0.8em 1em"}}>Quantity</th>
                <th style={{width:"21.4285",padding:"0.8em 1em",textAlign:"right",verticalAlign:"top",padding:"0.8em 1em"}}>price</th>
            </tr>
                {
                    invoiceData.items.map(item => (
                        <tr  key={uuid()}>
                            <td style={{border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>{item.productTitle}</td>
                            <td style={{border:"0.8px solid #dddddd",textAlign:"center",padding:"0.8em 1em"}}>{item.qty}</td>
                            <td style={{border:"0.8px solid #dddddd",textAlign:"right",padding:"0.8em 1em"}}>R{item.productPrice}</td>
                        </tr>
                    ))
                }
                <tr style={{borderBottom:"0.8px solid #dddddd"}}>
                    <td colSpan="2" style={{textAlign:"right",fontWeight:"900",border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>SubTotal</td>
                    <td style={{textAlign:"right",fontWeight:"900",border:"0.8px solid #dddddd",padding:"0.8em 1em"}}>R{SubTotal}</td>
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
        const response = await handleSendEmail(invoiceEmailData,'eft')
        handleIsPaying(false)
        history.push('/checkout/invoice/success');
    }

    return (
        <>
            <button className="checkout-control--next" onClick={handleInvoiceGeneration} >
                Download Invoice
            </button>
            <ReviewBackdrop openState={isPaying}/>
        </>
    )
}

export default PayWithEft
