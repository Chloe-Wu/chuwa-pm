import React, { useMemo } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import "../../scripts/Framework/Footer.css";

import tiktok_icon from '../../assets/tiktok_icon.png'
import facebook_icon from "../../assets/facebook_icon.png"
import ins_icon from "../../assets/ins_icon.png"
import twitter_icon from "../../assets/X_icon.png"

function Footer() {
  const isMobile = useMediaQuery("(max-width: 450px)");

  const textStyle = useMemo(() => ({
    color: "white",
    fontFamily: "Inter-Medium Helvetica",
    fontSize: isMobile ? "12px" : "16px",
    position: "relative",
    whiteSpace: "nowrap",
    width: "fit-content",
  }), [isMobile]);

  return (
    <footer className={isMobile ? "footer-mobile" : "footer"}>
      {!isMobile && <div style={{ ...textStyle, marginLeft: '5vw' }}>©2024 All Rights Reserved.</div>}
      <div className={isMobile ? "icon-image-container-mobile" : "icon-image-container"}>
        {[twitter_icon, tiktok_icon, ins_icon, facebook_icon].map((icon, index) => (
          <img key={index} className={isMobile ? "social-icons-mobile" : "social-icons"} alt="Social icons" src={icon} />
        ))}
      </div>
      <div className={isMobile ? "group-mobile" : "group"}>
        {["Contact us", "Privacy Policies", "Help"].map((text, index) => (
          <div key={index} style={textStyle}>{text}</div>
        ))}
      </div>
      {isMobile && <div style={textStyle}>©2024 All Rights Reserved.</div>}
    </footer>
  );
}

export default Footer;