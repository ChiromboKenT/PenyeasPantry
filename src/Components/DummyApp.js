import React, {Fragment,useContext,useEffect} from 'react'
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from '../Invoice/Reports/Invoice'
import {InvoiceContext} from "../Context/Invoice.Context"



const DummyApp = ({history}) => {
    const {invoiceData} = useContext(InvoiceContext) 
    const handleNoData = () => {
        alert("No purchase made, Return to Penyesa Pantry Home and make purchase")
        return history.push('/')
    }
    invoiceData.items === "" && handleNoData()
    
    console.log(invoiceData)
    return (
        invoiceData.items === "" ? (
            <div>

            </div>
        ) :
        (
            <Fragment>
            <PDFViewer width="100%" height='1000'>
                <Invoice invoice={invoiceData}/>
            </PDFViewer>
        </Fragment> 
        )      
    )
}

export default DummyApp
