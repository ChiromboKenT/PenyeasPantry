import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from  "./InvoiceTitle"
import InvoiceNo from "./InvoiceNo"
import InvoiceItemsTable from "./InvoiceItemsTable"
import BillTo from "./BillTo"
import InvoiceThankYouMsg from "./InvoiceThankYouMsg"
import  Logo from "../../Icons/logo.jpg"

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 20,
        paddingLeft:40,
        paddingRight:40,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 174,
        height: 94,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });


  //Function
  const Invoice = ({invoice}) => (
    <Document title="Penyesa Pantry Invoice" author="Dev_Ken">
        <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={Logo} />
            <InvoiceTitle title='Invoice' /> 
            <InvoiceNo invoice={invoice}/>
            <BillTo invoice={invoice}/> 
            <InvoiceItemsTable invoice={invoice}/>
            <InvoiceThankYouMsg/>
            
        </Page>
    </Document>
);

export default Invoice