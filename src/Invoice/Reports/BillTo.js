import React from 'react';
import {Text, View, StyleSheet,Font } from '@react-pdf/renderer';
Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 10
    },
    billTo: {
        marginTop: 10,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    bill_value : {
        fontSize: 10,
        family: 'Oswald'
       
    },
  });


  const BillTo = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text style={styles.bill_value}>{invoice.billName}</Text>
        <Text style={styles.bill_value}>{invoice.billAddress}</Text>
        <Text style={styles.bill_value}>{invoice.billPhone}</Text>
        <Text style={styles.bill_value}>{invoice.billEmail}</Text>
    </View>
  );
  
  export default BillTo