import React from 'react'
import "../Styles/TopView.scss"

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
        </div>
    )
}

export default DisplayInfo
