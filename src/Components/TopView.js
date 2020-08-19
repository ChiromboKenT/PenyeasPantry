import React, {useState} from 'react'
import Media from 'react-media';
import "../Styles/TopView.scss"
import DisplayInfo from "./DisplayInfo"

const info = {
    "About Us" : "Shopping has evolved globally and in keeping with our new world of convinience, Penyesa brings you effortless online shopping from anwhere in the world.\n Penyesa is a proudly African brand. We understand the value of family and want to help you support and provide for them from wherever you are.\nSend groceries and other household goods to your loved ones in Zimbabwe at their doorsteps    ",
    "How do I Pay": "Payment Systems available are: \n Online Visa/Mastercard Debit and Credit cards through Payfast.\n Offline Direct Eft",
    "Delivery" : "We provide free doorstep deliveries within Harare.\n As our service is online shopping with free delivery, our minimum purchase per order is R1000 or USD$70.\n Deliveries outside Harare will include an additional delivery fee",
    "Schedule" : "We deliver on Mondays, Wednesdays and Fridays.\n Cut off is 1700hrs any day before the delivery day"
}
                

const TopView = () => {
    const [infoState, setInfoState] = useState({
        info : false,
        title : "",
        text : "",
    })

    const handleHoverEnter = (event) => {
       
        setInfoState({
           info : true,
           title :  event.target.id,
           text : info[event.target.id]
        })
    }
    const handleHoverLeave = (event) => {
        setInfoState({
           info : false,
           title : "",
           text : ""
        })
    }
    return (
        <div className="TopView" onMouseLeave={handleHoverLeave}>
            <div className="TopView-tab">
                <img className="TopView-logo" onClick={handleHoverLeave} src="/penyesaLogoWhite.svg" alt="Penyesa Logo"/>
                <div className="TopView-tabContainer">
                    <span className={`TopView-tabKey ${infoState.title === "About Us" && "active-Tab"  }`} id="About Us" onMouseEnter={handleHoverEnter}>
                        About Us
                    </span>
                    <span className={`TopView-tabKey ${infoState.title === "How do I Pay" && "active-Tab"  }`}  id="How do I Pay" onMouseEnter={handleHoverEnter}>
                        How do I pay
                    </span>
                    <span className={`TopView-tabKey ${infoState.title === "Delivery" && "active-Tab"  }`}  id="Delivery" onMouseEnter={handleHoverEnter}>
                        Delivery
                    </span>
                    <span className={`TopView-tabKey ${infoState.title === "Schedule" && "active-Tab"  }`} id="Schedule" onMouseEnter={handleHoverEnter}>
                       Schedule
                    </span>
                </div>
            </div>

            {
                infoState.info ? <DisplayInfo text={infoState.text} title={infoState.title}/> : (
                <div className='TopView-main'>
                    <div className="main">
                        <Media query="(max-width : 425px)" render={() =>  <img className="TopView-Flogo" src="/penyesaLogoWhite.svg" alt="Penyesa Logo"/>} />
                        <span className="main-heading">Send Groceries Home</span>
                        <span className="main-text">Simply order one of our carefully packed baskets or shop your own selection from our online pantry</span>
                        <span className="main-footer">Delivered to any doorstep within Harare</span>
                    </div>
                    <div className="featuring">
            
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default TopView
