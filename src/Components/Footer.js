import React from 'react'
import "../Styles/Footer.scss"

const Footer = () => {
    return (
        <div className="Footer-container">
            <div className="Footer-main">
                <div className="Footer-main-colContainer">
                    <div className="Footer-main-col">
                        <h3 className="Footer-heading">
                            Connect
                        </h3>
                        <hr/>
                        <div className="Footer-connect">
                            <a  className="Footer-links" href="https://www.facebook.com/PenyesaSA/"><i class="fab fa-facebook-f"></i></a>
                            <a  className="Footer-links" href="https://twitter.com/PenyesaSA"><i class="fab fa-twitter"></i></a>
                            <a  className="Footer-links" href="https://www.instagram.com/PenyesaSA/"><i class="fab fa-instagram"></i></a>
                            <a  className="Footer-links" href="http://www.pinterest.com/PenyesaSA"><i class="fab fa-pinterest-p"></i></a>
                        </div>
                    </div>
                    <div className="Footer-main-col">
                    <h3 className="Footer-text">
                           Email : info@penyesa.co.za
                    </h3>
                    <h3 className="Footer-text">
                           Phone :  +27 65 808 7492
                    </h3>
                    </div>
                </div>
                <div className="Footer-main-logo">

                </div>

            </div>
            <div className="Footer-bottom">
                &copy;{new Date().getFullYear()} Penyesa
            </div>
        </div>
    )
}

export default Footer
