import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 18
    },
    reportTitle:{
        fontSize: 12,
        textAlign: 'Left',
        textTransform: 'uppercase',
        color : "#284453",
        fontWeight : "bold"
    }
  });


  const InvoiceThankYouMsg = () => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Shipping </Text>
    </View>
  );
  
  export default InvoiceThankYouMsg