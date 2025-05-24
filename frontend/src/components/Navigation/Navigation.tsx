import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import ShoppingCartButton from "./ShoppingCartButton";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Navigation():JSX.Element {
  const navigate = useNavigate();
  return (
    <div id='nav-bar'>
      <div>
        <NavLink to="/" id='nav-logo'>Etsy</NavLink>
      </div>
      <div id='nav-right'>
        <button id='heart-button' onClick={() => navigate('/favorites')}>
            <FaHeart />
        </button>
        <ProfileButton />
        <button id='shopping-cart-button' onClick={() => navigate('/shoppingcart')}>
            <FaShoppingCart />
        </button>
      </div>
    </div>
  );
}

export default Navigation;
