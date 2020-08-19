import React from 'react'

const bodyStyle = {
    width: '100%',
    margin: 0,
    padding: 0,
    WebkitTextSizeAdjust: '100%',
    MsTextSizeAdjust: '100%',
  }
const Email = (props) => {
    return (
        (<body style={bodyStyle}>
            <h1>{props.title}</h1>
        <div>
            <div>
                <p>Your password is:</p>
                <p>Jenny Pee</p>
            </div>
            <p>
                Regards,
                Penyesa Pantry.
            </p>
        </div>
        </body>
        )
    )
}

export default Email
