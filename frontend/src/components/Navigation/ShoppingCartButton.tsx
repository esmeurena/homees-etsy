import { useState, useEffect, useRef } from "react";
import './Navigation.css'
import { useDispatch } from "react-redux";
import { FaBars, FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const ShoppingCartButton = ():JSX.Element => {
    return (
        <div>
            <button id='shopping-cart-button'>
                <FaShoppingCart />
            </button>
        </div>
    )

}

export default ShoppingCartButton;
