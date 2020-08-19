import React,{useContext,useState} from 'react';
import {ProductsContext} from '../Context/Products.context'
import {HamperContext} from "../Context/Hamper.context"
import CardProduct from './CardProduct'
import CardDisplay from './CardDisplay'
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FastfoodSharpIcon from '@material-ui/icons/FastfoodSharp';
import LocalPharmacySharpIcon from '@material-ui/icons/LocalPharmacySharp';
import LocalLaundryServiceSharpIcon from '@material-ui/icons/LocalLaundryServiceSharp';
import EmojiFoodBeverageSharpIcon from '@material-ui/icons/EmojiFoodBeverageSharp';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Button from '@material-ui/core/Button';
import './../Styles/util.scss'
import Media from 'react-media';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    fontSize: "1em",
    minHeight : "5rem",
    boxShadow : "0px 2px 8px 4px #5b4e03a3",
    borderRadius : "7px",
    overflow : "hidden",
    
    
    
    
  },
  tabs: {
    paddingTop: "3rem",
   
    borderRight: `1px solid ${theme.palette.divider}`,
    
  },
  tabText : {
    "font-weight": "200",
    textAlign : "left",
    alignItems : "flex-start"
    
  },
  gridContainer : {
      
        flex : "1",
      display : "grid",
      backgroundColor : "#bdc3c7",
      padding :"2rem",
      gridTemplateColumns : "repeat(auto-fill, minmax(10rem,1fr))",
      gap : " 2rem"

  },
  header : {
      backgroundColor: "white",
      textAlign : "center",
      borderBottom : "3px solid rgba(0,0,0,.4) ",
      height : "3.5rem",
      position : "relative",
      
  },displayContainer :{
    flex : "1",
    display : "flex",
    flexDirection :"column"
  }, viewAll : {
    position : "absolute",
    "right" : "1.8rem",
    top : "0rem"


  }

}));
const useStylesA = makeStyles((theme) => ({
    root : {
        alignItems : "flex-start",
        textTransform : "initial",
        textAlign : "left",
    },
    loadBar : {
      width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    }
}))


export default function VerticalTabs() {
  
  const values = ["Baskets", "Food", "Health", "Household"];

  //Load the Variables from the Products Context
  const {Error,isLoading, productData} = useContext(ProductsContext);
   const {hamperData} = useContext(HamperContext);
  const [value, setValue] = useState("All");
  const classes = useStyles();
  const classesA = useStylesA();
  const icons = {
      Basket : (<ShoppingBasketIcon style={{marginRight:"1rem"}}/>),
      Food : (<FastfoodSharpIcon style={{marginRight:"1rem"}}/>),
      Essentials : (<LocalPharmacySharpIcon style={{marginRight:"1rem"}}/>),
      Toiletries : (<LocalLaundryServiceSharpIcon style={{marginRight:"1rem"}}/>),
      Snacks : (<EmojiFoodBeverageSharpIcon style={{marginRight:"1rem"}}/>),
     
  }
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };
 
  return (
    <div className={classes.root}>
      <Media query="(min-width:425px) "render={() =>(
          <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
           <Tab label="Baskets" icon={icons.Snacks} className={classesA.root} value={0} wrapped/>
          <Tab label="Food Pantry" className={classesA.root} icon={icons.Food} value={1} wrapped/>
          <Tab label="Health & Beauty" icon={icons.Essentials} className={classesA.root}  value={2} wrapped />
          <Tab label="Household & Cleaning" icon={icons.Toiletries} className={classesA.root}  value={3}  wrapped/>
         
       
        </Tabs>
      )}/>
      <div className={classes.displayContainer}>
      <div className={classes.header}>
      {
          isLoading && 
           (
           <div className={classes.loadBar}>
              <LinearProgress color="secondary"/>
              <LinearProgress color="secondary" />
            </div>
           )
        }
        <h2 style={{"position" : "relative"}}>{ value === "All" ? "Shop Products" : values[value]}
          {
           value !== "All" && <div className={classes.viewAll}><Button onClick={() => setValue("All")} variant="outlined"size="small">See All</Button></div>
           }
          </h2>
       
      </div>  
     <div className={classes.gridContainer}>
        {

          !isLoading && <>
            { 
              hamperData.filter(item => {
                if(value === "All"){
                  return item;
                }else{
                  return item.category === values[value] 
                }
              }).map(hamper => (
                <CardDisplay 
                
                id={hamper.id}
                   title= {hamper.title} price={hamper.price}
                   description= {hamper.description}
                   imageURL = {hamper.imageURL}
                   category={hamper.category} key={hamper.id}
                   isInCart={hamper.isInCart}
                />
               )
            )
            }  
            {
              productData.filter(item => {
                if(value === "All"){
                  return item;
                }else{
                  return item.category === values[value] 
                }
                
              }).map(product => (
                <CardProduct title={product.title} imageURL={product.imageURL} price={product.price} description={product.description} 
                  id={product.id} isInCart={product.isInCart} stock_qty={product.stock_qty}
                  key={product.id} special={product.special}/>
              ))
            }
          </>

        }
     </div>

     </div>
    </div>
  );
}
