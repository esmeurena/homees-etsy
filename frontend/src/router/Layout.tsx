import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import FooterLinks from "../components/FooterLinks";

export default function Layout(): JSX.Element {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <ModalProvider>
      <div id="layout-wrapper">
        <Navigation />
        <main>{isLoaded && <Outlet />}</main>
        <div><FooterLinks /></div>
        <Modal />
      </div>
    </ModalProvider>
  );
}
