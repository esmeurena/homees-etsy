import React from "react";
import "./FooterBottomBar.css";

const FooterBottomBar = () => {
    return (
        <div className="footer-bottom-bar">
            <div className="footer-bottom-container">
                <div className="footer-bottom-left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                        alt="USA Flag"
                        className="usa-flag"
                    />
                    <span>United States</span>
                    <span className="divider">|</span>
                    <span>English (US)</span>
                    <span className="divider">|</span>
                    <span>$ (USD)</span>
                </div>

                <div className="footer-bottom-right">
                    <span>© 2025 Etsy, Inc.</span>
                    <a href="#" className="footer-link">Terms of Use</a>
                    <a href="#" className="footer-link">Privacy</a>
                    <a href="#" className="footer-link">Interest-based ads</a>
                    <a href="#" className="footer-link">Local Shops</a>
                    <a href="#" className="footer-link">Regions</a>
                </div>
            </div>
        </div>
    );
};

export default FooterBottomBar;
