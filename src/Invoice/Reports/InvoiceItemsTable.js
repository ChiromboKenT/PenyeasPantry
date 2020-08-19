import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'
const tableRowsCount = 9;


const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#fe731e',
    },
});

  const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice.items} />
        <InvoiceTableBlankSpace rowsCount={ invoice.items.length < 7 ? (tableRowsCount - invoice.items.length ): 1} />
        <InvoiceTableFooter items={invoice.items} />
    </View>
  );
  
  export default InvoiceItemsTable