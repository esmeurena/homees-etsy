import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import ShoppingCartButton from "./ShoppingCartButton";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCartShopping } from "react-icons/fa6";
import ShoppingCart from '../../../public/images/shopping-cart.svg'
import Heart from '../../../public/images/heart.svg'

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
          <button className='navigation-button' onClick={() => navigate('/favorites')}>
            <img src={Heart} className="navigation-icon" />
          </button>
          <ProfileButton />
          <button className='navigation-button' onClick={() => navigate('/shoppingcart')} style={{ color: 'black' }}>
            <img src={ShoppingCart} className="navigation-icon" />
          </button>
        </div>

      </div>
      <hr className="line-to-divide" />
    </div>

  );
}

export default Navigation;
