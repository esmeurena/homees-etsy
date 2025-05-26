import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import ShoppingCartButton from "./ShoppingCartButton";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Navigation(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div>
      <div id='nav-bar'>
        <div id="nav-left">
          <NavLink to="/" id='nav-logo'>Etsy</NavLink>
        </div>

        <div id="search-bar-test">
          <input
            type="text"
            placeholder="Search here!"
            id="search"
          />
        </div>

        <div id='nav-right'>
          <button id='heart-button' onClick={() => navigate('/favorites')}>
            <img src="/images/question_logo.png" style={{ width: "80px", height: "40px", marginRight: '1.5rem' }} />
          </button>
          <button id='heart-button' onClick={() => navigate('/favorites')}>
            <img src="/images/heart_logo.png" style={{ width: "40px", height: "40px" }} />
          </button>
          <ProfileButton />
          <button id='shopping-cart-button' onClick={() => navigate('/shoppingcart')}>
            <img src="/images/shopping_cart_logo.png" style={{ width: "40px", height: "40px" }} />
          </button>
        </div>

      </div>
      <hr className="line-to-divide" />
    </div>

  );
}

export default Navigation;
