import React, { useMemo } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import "../../scripts/Framework/Footer.css";

import tiktok_icon from '../../assets/tiktok_icon.png'
import facebook_icon from "../../assets/facebook_icon.png"
import ins_icon from "../../assets/ins_icon.png"
import twitter_icon from "../../assets/X_icon.png"

function Footer() {
  const isMobile = useMediaQuery("(max-width: 450px)");

  const textStyle = useMemo(
    () => ({
      color: "white",
      fontFamily: "Inter-Medium Helvetica",
      fontSize: isMobile ? "12px" : "16px",
      position: "relative",
      whiteSpace: "nowrap",
      width: "fit-content",
    }),
    [isMobile]
  );

  if (isMobile) {
    return (
      <div className="footer-mobile">
        <div className="icon-image-container-mobile">
          <img
            className="social-icons-mobile"
            alt="Social icons"
            src={twitter_icon}
          />
          <img
            className="social-icons-mobile"
            alt="Social icons"
            src={tiktok_icon}
          />
          <img
            className="social-icons-mobile"
            alt="Social icons"
            src={ins_icon}
          />
          <img
            className="social-icons-mobile"
            alt="Social icons"
            src={facebook_icon}
          />
        </div>
        <div className="group-mobile">
          <div style={textStyle}>Contact us</div>
          <div style={textStyle}>Privacy Policies</div>
          <div style={textStyle}>Help</div>
        </div>
        <div style={textStyle}>©2024 All Rights Reserved.</div>
      </div>
    );
  } else {
    return (
      <footer className="footer">
        <div style={{...textStyle, marginLeft: '5vw'}}>©2024 All Rights Reserved.</div>
        <div className="icon-image-container">
          <img
            className="social-icons"
            alt="Social icons"
            src={twitter_icon}
          />
          <img
            className="social-icons"
            alt="Social icons"
            src={tiktok_icon}
          />
          <img
            className="social-icons"
            alt="Social icons"
            src={ins_icon}
          />
          <img
            className="social-icons"
            alt="Social icons"
            src={facebook_icon}
          />
        </div>
        <div className="group">
          <div style={textStyle}>Contact us</div>
          <div style={textStyle}>Privacy Policies</div>
          <div style={textStyle}>Help</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
