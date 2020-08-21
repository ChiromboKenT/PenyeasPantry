import React from 'react'
import PayfastLogo from '../Icons/payfastlogo.png'
import PaypalLogo from  '../Icons/paypallogo.png'
import EftLogo from  '../Icons/eftlogo.jpg'
import "../Styles/TopView.scss"

const imageStyle = {
    display : "flex",
    width : "50%",
    justifyContent : 'space-between'
}
const DisplayInfo = ({text,title}) => {
    return (
        <div className="Info">
            <h3 className="Info-title">{title}</h3>
            {
                text.split('\n').map((txt, indx) => (
                    <React.Fragment key={`Tex-${indx}`}>
                        <p className="Info-text">{txt}</p>
                    </React.Fragment>
                ))
            }
            {
                title === "How do I Pay" && 
                    <div style={imageStyle}> 
                        <img src={PaypalLogo} alt="paypallogo" width="97px" height="37px"/>
                        <img src={PayfastLogo} alt="payfastlogo" width="100px" height="37px"/>
                        <img src={EftLogo} alt="eftlogo"  width="97px" height="37px" />
                    </div>
            }
        </div>
    )
}

export default DisplayInfo
