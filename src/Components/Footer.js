import React  from "react";
import '../Styles/Footer.css'
import { Link } from 'react-router-dom';



const Footer = () => {
    return(
        <div>
            
      
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-grid">

            <div className="footer-column">
              <li><a href="#">FIND A STORE</a></li>
              <li><a href="#">BECOME A MEMBER</a></li>
              <li><a href="#">SEND US FEEDBACK</a></li>
            </div>

            <div className="footer-column">
              <h4>GET HELP</h4>
              <ul>
                <li><a href="#">Order Status</a></li>
                <li><a href="#">Shipping and Delivery</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Payment Options</a></li>

              
              </ul>
            </div>

            <div className="footer-column">
              <h4>ABOUT YAMAHA</h4>
              <ul>
                <li><a href="#">SHOP</a></li>
                <li><a href="#">EXPERIENCE</a></li>
                <li><a href="#">CONNECT</a></li>
                <li><a href="#">CORPORATE</a></li>
              </ul>
            </div>

            <div className="footer-column footer-socials-container">
              <div className="footer-socials"></div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; © 2025 Yamaha Motor Corporation, USA. All rights reserved. (Project By Ali Harissa - 1 222 000 6)</p>
            <div className="footer-links">
              <a href="#">Guides</a>
              <a href="#">Terms of Sale</a>
              <a href="#">Terms of Use</a>
              <a href="#">YAMAHA Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
        </div>
    )
}
export default Footer;