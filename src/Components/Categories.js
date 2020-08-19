import React, {useContext} from 'react';
import './../Styles/Display.scss';
import {HamperContext} from '../Context/Hamper.context'
import FastfoodSharpIcon from '@material-ui/icons/FastfoodSharp';
import LocalPharmacySharpIcon from '@material-ui/icons/LocalPharmacySharp';
import LocalLaundryServiceSharpIcon from '@material-ui/icons/LocalLaundryServiceSharp';
import EmojiFoodBeverageSharpIcon from '@material-ui/icons/EmojiFoodBeverageSharp';
import CardGiftcardSharpIcon from '@material-ui/icons/CardGiftcardSharp';
import createUID from 'create-unique-id';

const Categories = ({category}) =>{
    const {dispatch} = useContext(HamperContext)
    const icons = {
        Hampers : (<FastfoodSharpIcon style={{marginRight:"1rem"}}/>),
        Essentials : (<LocalPharmacySharpIcon style={{marginRight:"1rem"}}/>),
        Toiletries : (<LocalLaundryServiceSharpIcon style={{marginRight:"1rem"}}/>),
        Snacks : (<EmojiFoodBeverageSharpIcon style={{marginRight:"1rem"}}/>),
        Gift : (<CardGiftcardSharpIcon style={{marginRight:"1rem"}}/>)
    }

    const handleClick = (e) => {
        dispatch({type: "Filter", load : e.target.id})
    }
    return(
        <div className="Categories">
                <div className="Categories-heading">Shop By Category</div>
                {
                    category.map(cat => (
                        <button id={cat} key={createUID(4)} onClick={handleClick} className="Categories-text" style={{"border" : "none"}}>
                            {icons[cat]}
                            {cat}
                        </button>
                    ))
                }
    
        </div>
    )
}

export default Categories