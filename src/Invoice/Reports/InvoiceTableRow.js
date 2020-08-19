import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#fe731e'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#fe731e',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 28,
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( item => 
        <View style={styles.row} key={item.id}>
            <Text style={styles.description}>{item.productTitle}</Text>
            <Text style={styles.qty}>{item.qty}</Text>
            <Text style={styles.rate}>R{item.productPrice}</Text>
            <Text style={styles.amount}>R{(item.qty * item.productPrice).toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableRow