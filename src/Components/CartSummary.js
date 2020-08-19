import React from 'react'
import "../Styles/Checkout.scss"

export  const CartSummary = ({cartProducts}) => {
    const Total = cartProducts.reduce((acc,current) => acc + current.qty * current.productPrice,0).toFixed(2)
    const vat = (0.15 * Total).toFixed(2);
    const SubTotal = (0.85 * Total).toFixed(2); 
    return (
        <div className="summary">
            <div className="summary-container">
                <div className="summary-heading">
                    Order Summary
                </div>
                <div className="summary-listContainer">
                    {
                        cartProducts.map(product => (
                            <div className="summary-listItem">
                                <img className="item-image" src ={`${product.productImage}`} alt= ""></img>
                                <div className="item-content">
                                    <span className="item-content-heading">{product.productTitle}</span>
                                    <span className="item-content-description">{product.qty}</span>
                                 </div>
                                <div className="item-Price">
                                    {`R${product.productPrice}`}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="summary-totals">
                    <div className="summary-totals-sub">
                        <div className="summary-totals-sub-list">
                            <span className="total-key">Subtotal</span>
                            <span className="total-value">R{SubTotal}</span>
                        </div>
                        <div className="summary-totals-sub-list">
                            <span className="total-key">Vat 15%</span>
                        <span className="total-value">R{vat}</span>
                        </div>
                        <div className="summary-totals-sub-list">
                            <span className="total-key">Shipping</span>
                            <span className="total-value">Incl.</span>
                        </div>

                    </div>
                    <div className="summary-totals-overal">
                            <span className="total-key">Total</span>
                            {/* <span className="total-price-currency">ZAR</span> */}
                            <span className="total-price-value">{`R${Total}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
