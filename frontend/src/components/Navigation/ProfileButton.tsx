import { useState, useEffect, useRef } from "react";
import './ProfileButton.css';
import { useDispatch } from "react-redux";
import { FaBars, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useAppSelector } from "../../redux/store";

function ProfileButton():JSX.Element {
  const dispatch = useDispatch();
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

  // return (
  //   <>
  //     <button onClick={(e) => toggleMenu(e)}>
  //       <FaUserCircle />
  //     </button>
  //     {showMenu && (
  //       <ul className={"profile-dropdown"} ref={ulRef}>
  //         {user ? (
  //           <>
  //             <li>{user.username}</li>
  //             <li>{user.email}</li>
  //             <li>
  //               <button onClick={(e) => logout(e)}>Log Out</button>
  //             </li>
  //           </>
  //         ) : (
  //           <>
  //             <OpenModalMenuItem
  //               itemText="Log In"
  //               onItemClick={closeMenu}
  //               modalComponent={<LoginFormModal />}
  //             />
  //             <OpenModalMenuItem
  //               itemText="Sign Up"
  //               onItemClick={closeMenu}
  //               modalComponent={<SignupFormModal />}
  //             />
  //           </>
  //         )}
  //       </ul>
  //     )}
  //   </>
  // );

  return (
    <>
      <div className="button-and-info">
        <div id='nav-right'>
        <button onClick={toggleMenu} id="profile-button">
          <div style={{fontSize: '1.5rem'}}><FaUserCircle /></div>
          <p style={{fontSize: '.8rem', margin: '0 0 .5rem .2rem'}}>&#11206;</p>
        </button>

        </div>
        <div className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <div className="login-info">
                {user.username}
                <div>
                  {user.firstName} {user.lastName}
                </div>
                {user.email}
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
