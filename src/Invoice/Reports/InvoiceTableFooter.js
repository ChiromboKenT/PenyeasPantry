import React from 'react';
import {Text, View, StyleSheet, Font } from '@react-pdf/renderer';



const borderColor = '#fe731e'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#fe731e',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 32,
        fontSize: 12,
        fontWeight : "ultrabold",
        leterSpacing : 6,
        backgroundColor : "#ecd4b9"
        
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
        color : "#284453",
        leterSpacing : 2
    },
    total: {
        width: '20%',
        textAlign: 'right',
        paddingRight: 8,
        color : "#284453",
        fontWeight : "ultrabold",
        leterSpacing : 2
    },
  });


const InvoiceTableFooter = ({items}) => {
    const total = items.map(item => item.qty * item.productPrice)
        .reduce((accumulator, currentValue) => accumulator + currentValue , 0).toFixed(2)
    const vat = (0.15 * total).toFixed(2);
    const subTotal = (0.85 * total).toFixed(2);
    return(
        <>
            <View style={styles.row}>
                <Text style={styles.description}>SUBTOTAL Exl. vat </Text>
                <Text style={styles.total}>R{subTotal}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.description}>VAT</Text>
            <Text style={styles.total}>R{vat}</Text>
            </View>    
            <View style={styles.row}>
                <Text style={styles.description}>TOTAL</Text>
                <Text style={styles.total}>R{total}</Text>
            </View>
        </>
    )
};
  
  export default InvoiceTableFooter