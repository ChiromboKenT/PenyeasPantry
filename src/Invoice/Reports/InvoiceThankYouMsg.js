import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 5,
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 5
    },
    reportTitle:{
        fontSize: 10,

        textTransform: 'uppercase',
        color : "#284453",
        fontWeight : "bold"
    },message: {
        fontSize:10
    },message1: {
        fontSize : 10,
        paddingVertical: 10,
        paddingHorizontal : 4
    }
  });

 
  const InvoiceThankYouMsg = () => (
    <View>
        <Text style={styles.message1}>Order Is currently on hold, Please kindly send proof payment before we can continue processing it</Text>
        <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>Thank you for your business</Text>
            <Text style={styles.message}>Confirmation email has been sent</Text>
        </View>
    </View>
  );
  
  export default InvoiceThankYouMsg