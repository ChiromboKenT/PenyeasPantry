import React from 'react';
import ShopApp from './Components/ShopApp'
import theme from './Components/themes'
import Checkout from './Components/Checkout'
import {ThemeProvider} from '@material-ui/core/styles'
import {CheckoutContextProvider} from './Context/Checkout.context'
import {Switch, Route} from 'react-router-dom'
import {CartContextProvider} from './Context/Cart.context'
import {ProductsContextProvider} from './Context/Products.context'
import {ControlContextProvider} from './Context/Control.context'
import {HamperContextProvider} from './Context/Hamper.context';
import {PaymentContextProvider} from './Context/Payment.context'
import InvoiceContextProvider from './Context/Invoice.Context';
import DummyApp from './Components/DummyApp';
import {PayFastSuccess} from './Components/PayfastSuccess'


function App() {
  return (
   
    <ThemeProvider theme= {theme}>
      <ControlContextProvider>
          <ProductsContextProvider>
          <HamperContextProvider>
          <CartContextProvider>
          <InvoiceContextProvider>
          <PaymentContextProvider>
            <Switch>
                <Route exact path="/" render={(routeProps) => <ShopApp {...routeProps}/>}  /> 
                <Route exact path="/checkout/invoice/success" render={(routeProps) => <DummyApp {...routeProps}/>}/> 
                <CheckoutContextProvider>
                <Route exact path="/checkout/successConfirmation/0/:Order_ID" render={(routeProps) => <PayFastSuccess {...routeProps}/>}/>
                <Route exact path = "/checkout/:routeName" render={(routeProps) => <Checkout {...routeProps}/>}/>
                </CheckoutContextProvider>
             </Switch>
          </PaymentContextProvider>
          </InvoiceContextProvider>
          </CartContextProvider>
          </HamperContextProvider>
          </ProductsContextProvider>
          </ControlContextProvider>
    </ThemeProvider>

  );
}

export default App;
