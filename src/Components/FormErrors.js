import React from 'react'

export const FormErrorsMessage = ({error,name}) => {
    if (error) {
        switch (error.type) {
          case "required":
            return <p className="errorParagraph">Please enter the required Field</p>;
          case "pattern":
            return <p  className="errorParagraph">{`Enter a valid ${name}`}</p>;
          default :
            return null
        }
      }    
    return null
}
