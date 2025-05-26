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
                    <a href="https://www.etsy.com/legal/terms-of-use?ref=ftr" className="footer-link">Terms of Use</a>
                    <a href="https://www.etsy.com/legal/privacy/?ref=ftr" className="footer-link">Privacy</a>
                    <a href="https://www.etsy.com/legal/cookies/#marketing-services" className="footer-link">Interest-based ads</a>
                    <a href="https://www.etsy.com/search/shops" className="footer-link">Local Shops</a>
                    <a href="https://help.etsy.com/hc/en-us/articles/115015306687-How-to-Change-Your-Location-Settings-on-Etsy" className="footer-link">Regions</a>
                </div>
            </div>
        </div>
    );
};

export default FooterBottomBar;
