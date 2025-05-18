import { useState, useEffect, useRef } from "react";
import './ProfileButton.css';
import { useDispatch } from "react-redux";
import { FaBars, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useAppSelector } from "../../redux/store";
// import CreateProductPage from "../CreateProductPage";
import { useNavigate } from "react-router-dom";

function ProfileButton():JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useAppSelector((store) => store.session.user);
  const ulRef = useRef<any>();

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e:any) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    const goToCreateProduct = () => {
    navigate('/products/create');
  };

  return (
    <>
      <div className="button-and-info">
        <div id='nav-right'>
        <button onClick={toggleMenu} id="profile-button">
          <div style={{fontSize: '1.5rem', marginTop: '.4rem'}}><FaUserCircle /></div>
          <p style={{fontSize: '.8rem', margin: '.4rem 0 .5rem .2rem'}}>&#11206;</p>
        </button>

        </div>
        <div className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <div className="login-info">
                {user.username}
                <div>
                  {user.first_name} {user.last_name}
                </div>
                {user.email}
                <button className="profile-buttons" onClick={goToCreateProduct}>
                  Create a Product
                </button>
                <div>
                  <button onClick={logout} className="profile-buttons">Log Out</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='login-info'>
                <button className="profile-buttons">
                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                </button>
                <button className="profile-buttons">
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
