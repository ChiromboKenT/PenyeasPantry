import React from 'react';
import ProductModal from './ProductModal';
import Paper from '@material-ui/core/Paper'
import Display from './Display'
import ProductsBody from './ProductsBody';
import TopView from "./TopView"
import Navbar from './Navbar';
import SideBarCart from './SideBarCart';
import Footer from './Footer';

const categories = [
  "Hampers"
]
function ShopApp() {

   
    return(
        <Paper >
           <Navbar/>
                <TopView/>
                    {/**
                     * <Display category={categories}/>
                     * <ButtonsGroup/>*/ }
                <ProductsBody/>
                <SideBarCart/>
                <ProductModal/>
            <Footer/>
        </Paper>

    )
}


export default ShopApp;