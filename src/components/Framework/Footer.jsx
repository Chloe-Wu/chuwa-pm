import React from "react";
import "../../scripts/Framework/Footer.css";

function Footer(){
  return (
    <div className="footer">
      <div className="candleaf-all">©2024 All Rights Reserved.</div>
      <div className="icon-image-container">
        <img className="social-icons" alt="Social icons" src="/tiktok_icon.png" />
        <img className="social-icons" alt="Social icons" src="/facebook_icon.png" />
        <img className="social-icons" alt="Social icons" src="/ins_icon.png" />
        <img className="social-icons" alt="Social icons" src="/X_icon.png" />
      </div>
      <div className="group">
        <div className="text-wrapper">Contact us</div>
        <div className="div">Privacy Policies</div>
        <div className="candleaf-all-2">Help</div>
      </div>
    </div>
  );
};

export default Footer;


