import React, {useState, useContext} from 'react';
import {HamperContext} from '../Context/Hamper.context'
import {Tab,Tabs} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import {makeStyles,IconButton} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CardDisplay from './CardDisplay'
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp'
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import './../Styles/Display.scss'
const hamper1= "standard";
const hamper2 = "essentials";
const hamper3 = "deluxe";

const useStyles = makeStyles({
   root: {
      "minHeight" : "2.6rem",
      "height" : "2.6rem",
      "width" : "100%"
   },
   wrapper :{
      "fontSize": "1em",
      "fontWeight": "900",
      "color" : "black",
      

   },
   divHeight: {
      "max-height": "2rem",
      "margin-top" : ".4rem",
      "color": "#284453;",
      "marginRight" : "0",
      "marginLeft": "0"

   }
})

const progress = {
   "width" : "100%",
   "display" : "flex",
   "justifyContent" : "space-around",
   "alignItems" : "center",

}


const ProductDisplay = () =>{
   
   const classes = useStyles()

   const {hamperData, isLoading,dispatch} = useContext(HamperContext);
   const [selectedHamper, setSelectedHamper] = useState("standard");

   const handleChange = (event, newValue) =>{
      console.log(newValue)
         
   }
   const handleClick = (event) => {
      setSelectedHamper(event.target.name)
   }
   const limit = hamperData.length;
   
   return(
      <div className="ProductDisplay">
      <div className="Tab-horizontal">
         {
            hamperData.map(hamper => 
            <button className={`Tab-button ${selectedHamper === hamper.title && `active`} `} name={hamper.title} onClick={handleClick} key={`but${hamper.id}`}>
               {hamper.title}</button>)
         }
      </div>
         <div className="ProductDisplay--products">
           
           {
              isLoading === true? 
              <div style={progress}> 
                  <CircularProgress color="secondary"/>
                  <CircularProgress color="secondary"/>
                  <CircularProgress color="secondary" />
              </div> : (
                  hamperData.filter(
                     hamper => {
                       return hamper.title === selectedHamper
                     }
                  ).map(hamper => (
                     <CardDisplay 
                     
                     id={hamper.id}
                        title= {hamper.title} price={hamper.price}
                        products= {hamper.products}
                        imageURL = {hamper.imageURL}
                        category={hamper.category} key={hamper.id}
                        isInCart={hamper.isInCart}
                     />
                    )
                 )
              )  
           }
   
             
   
         </div>
         
      </div>
   )
}
export default ProductDisplay;