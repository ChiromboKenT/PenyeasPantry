import React from 'react';
import './../Styles/Display.scss'
import './Categories.js'
import './ProductDisplay'
import Categories from './Categories.js';
import ProductDisplay from './ProductDisplay';
import FlashBar from './FlashBar';
import Media from 'react-media';
const Display = ({category}) =>{
    return(
        <div className ="Display">
            <Media query="(min-width : 600px)" render={() => <Categories  category={category}/>} />
            <ProductDisplay/>
            <Media query="(min-width : 600px)" render={() => <FlashBar/>} />
        </div>
    )
}

            
            

export default Display;