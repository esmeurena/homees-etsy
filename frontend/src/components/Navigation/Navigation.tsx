import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import ShoppingCartButton from "./ShoppingCartButton";
import { FaShoppingCart } from "react-icons/fa";

function Navigation():JSX.Element {
  return (
    <div id='nav-bar'>
      <div>
        <NavLink to="/" id='nav-logo'>Etsy</NavLink>
      </div>

      <div id='nav-right'>
        <ProfileButton />
        <button id='shopping-cart-button'>
            <FaShoppingCart />
        </button>
      </div>
    </div>
  );
}

export default Navigation;
