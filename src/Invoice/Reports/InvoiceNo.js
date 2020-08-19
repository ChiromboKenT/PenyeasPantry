import React, { Fragment } from 'react';
import {Text, View, StyleSheet,Font } from '@react-pdf/renderer';
Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
const styles = StyleSheet.create({
    pageContainer : {
        width : "100%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between",
        alignContent : "flex-end",
        
    },
    InfoContainer : {
        display : "flex",
        width : "30%",
        flexDirection : "column",
        alignItems: 'flex-start',
    },
    rowContainer : {
        display : 'flex',
        flexDirection : "row",
        alignItems : "start",
        marginTop : 9,
        width : "100%",
        justifyContent : "space-between",
        borderBottom : "0.2 solid orange"
    },
    invoice_value : {
        fontSize: 9,
        family: 'Oswald'
       
    },
    invoice_label : {
        fontSize: 8,
    }
    
  });


  const InvoiceNo = ({invoice}) => (
        <Fragment >
            <View style={styles.pageContainer}>
            <View style={styles.InfoContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.invoice_label}>
                            Bank
                        </Text>
                        <Text style={styles.invoice_value}>
                            First National Bank
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.invoice_label}>
                            Acc. Name
                        </Text>
                        <Text style={styles.invoice_value}>
                            PENYESA (PTY) LTD
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.invoice_label} >
                            Account No.
                        </Text>
                        <Text style={styles.invoice_value}>
                            62729554156
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.invoice_label} >
                        Branch Cde.
                        </Text>
                        <Text style={styles.invoice_value}>
                            250341 
                        </Text>
                    </View>
                </View>
                <View style={styles.InfoContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.invoice_label}>
                            Invoice No.
                        </Text>
                        <Text style={styles.invoice_value}>
                            {invoice.invoice_no}
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.invoice_label}>
                            Payment Ref.
                        </Text>
                        <Text style={styles.invoice_value}>
                            {invoice.id}
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.invoice_label} >
                            Date
                        </Text>
                        <Text style={styles.invoice_value}>
                            {invoice.trans_date}
                        </Text>
                    </View>
                </View>
               
            </View>








             {/* <View style={styles.invoiceRefContainer}>
                <Text style={styles.label}>Ref No:</Text>
                <Text style={styles.value}>{invoice.id}</Text>
            </View >
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Invoice No:</Text>
                <Text style={styles.value} >{invoice.invoice_no}</Text>
            </View >
           
            
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Date: </Text>
                <Text style={styles.value} >{invoice.trans_date}</Text>
            </View > */}
        </Fragment>
        
  );
  
  export default InvoiceNo