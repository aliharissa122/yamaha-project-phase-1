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
              <li><a href="https://www.google.com/maps/place/Yamaha+Lebanon+-+ITANI+MOTOR/@33.8936149,35.4760057,17z/data=!3m1!4b1!4m6!3m5!1s0x151f10d30bd87daf:0xf2b617e3adb6f776!8m2!3d33.8936149!4d35.4760057!16s%2Fg%2F11c1tzjhz9?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D">FIND A STORE</a></li>
              <li><Link to="/ContactUs">SEND US FEEDBACK</Link></li>
            </div>



            <div className="footer-column">
              <h4>ABOUT YAMAHA</h4>
              <ul>
                 <li><Link to="/Motorcycle">SHOP</Link></li>
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
              <a href="https://global.yamaha-motor.com/copyright/">Terms of Use</a>
              <a href="#">YAMAHA Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
        </div>
    )
}
export default Footer;