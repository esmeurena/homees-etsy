import React from "react";
import { Link } from "react-router-dom";
import "./FooterLinks.css";
import FooterBottomBar from "./FooterBottomBar";
import { FaInstagram, FaFacebookF, FaPinterestP, FaYoutube } from "react-icons/fa";

const FooterLinks = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">

                <div className="footer-column">
                    <strong className="footer-heading">About Our Project</strong>
                    <a href="https://github.com/users/esmeurena/projects/6">Our KanBan Board</a>
                    <a href="https://github.com/esmeurena/homees-etsy">Our Project</a>
                </div>


                <div className="footer-column">
                    <strong className="footer-heading">About Us</strong>
                    <div className="about-us-columns">
                        <div>
                            <a href="https://github.com/esmeurena">Esme</a>
                            <a href="https://github.com/koderny">Harold</a>
                            <a href="https://github.com/eippy">Michael</a>
                        </div>
                        <div>
                            <a href="https://github.com/elliotmoffitt">Elliot</a>
                            <a href="https://github.com/highhigh3">Oscar</a>
                            <a href="https://github.com/SeymaErcan">Seyma</a>
                        </div>
                    </div>
                </div>


                <div className="footer-column">
                    <strong className="footer-heading">Help</strong>
                    <a href="https://github.com/AnthonyBronca">Help Center</a>
                </div>
            </div>
            <FooterBottomBar />
        </footer>
    );
};

export default FooterLinks;
