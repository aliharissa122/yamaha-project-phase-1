import React, { useState } from 'react';
import '../Styles/Navbar.css';
import logo1 from '../Assets/logo1.png';
import { Link } from 'react-router-dom';





const SearchIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);

const HeartIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M12.0007 10.5842L11.5363 10.9949C11.6917 11.1688 11.8422 11.3377 11.9976 11.5117C12.153 11.3377 12.3035 11.1688 12.4589 10.9949L12.0007 10.5842ZM12.0007 21L11.5323 21.4116C11.6905 21.5888 11.843 21.6782 12.0007 21.6782C12.1583 21.6782 12.3108 21.5888 12.469 21.4116L12.0007 21ZM3.00068 12.5838C2.07172 11.758 1.50068 10.5186 1.50068 9.20786C1.50068 6.50586 3.70653 4.3 6.40853 4.3C8.0152 4.3 9.5075 4.97543 10.5363 6.00424L13.465 8.93297C12.9122 9.5492 12.464 10.0601 12.0007 10.5842L10.5363 6.00424C11.1189 5.3411 11.5714 4.80931 11.9976 4.30543C12.5029 4.80931 12.9555 5.3411 13.538 6.00424L14.9976 10.5842C14.5343 10.0601 14.0862 9.5492 13.5334 8.93297L16.4621 6.00424C17.4909 4.97543 18.9832 4.3 20.5899 4.3C23.2919 4.3 25.5007 6.50586 25.5007 9.20786C25.5007 10.5186 24.9296 11.758 24.0007 12.5838C22.2478 14.1106 19.8335 16.0353 17.81 17.8C15.7864 19.5647 14.2881 20.867 12.469 21.4116L12.0007 21L11.5323 21.4116C9.71261 20.867 8.21425 19.5647 6.19068 17.8C4.16718 16.0353 1.75289 14.1106 3.00068 12.5838Z" stroke="#111111" strokeWidth="1.5"></path></svg>
);

const BagIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M8 8.4C8 6.2 9.79086 4.4 12 4.4C14.2091 4.4 16 6.2 16 8.4V9H8V8.4ZM7 9H17V19.8C17 20.9201 16.1201 21.8 15 21.8H9C7.87989 21.8 7 20.9201 7 19.8V9Z" stroke="#111111" strokeWidth="1.5"></path></svg>
);

const HamburgerIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M4 6H20M4 12H20M4 18H20" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);

const CloseIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);



const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    }

    return (
        <>



            <header className="nike-header">
                
                
                <nav className="main-nav">
                  
                    <div className="navbar-left">
    <img src={logo1} alt="Logo" className="logo" />
  </div>
                    <ul className="nav-links">


                        <li><a href="/">Home</a></li>
                        <li><a href="/Motorcycle">Motorcycle</a></li>
                        <li><a href="/SBS">Side-By-Side</a></li>
                        <li><a href="/Accessoires">Parts & Accessoires</a></li>
                       <li><a href="/ContactUs">Contact Us</a></li>

                       
                    </ul>
                    



               
                    <div className="nav-icons">
                        <div className="search-container">
                            <button className="search-icon">
                                <SearchIcon />
                            </button>
                            <input type="text" placeholder="Search" />
                        </div>
                       
                        <a href="#" className="icon-btn bag-icon">
                            <BagIcon />
                        </a>
                        
                        <button className="hamburger" onClick={toggleMobileMenu}>
                            <HamburgerIcon />
                        </button>
                    </div>
                </nav>
            </header>

            
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <button className="close-btn" onClick={closeMobileMenu}>
                    <CloseIcon />
                </button>
                <ul onClick={closeMobileMenu}>
                    <li><a href="#">New & Featured</a></li>
                    <li><a href="#">Men</a></li>
                    <li><a href="#">Women</a></li>
                    <li><a href="#">Kids</a></li>
                    <li><a href="#">Sale</a></li>
                    <li><a href="#">SNKRS</a></li>
                </ul>
                <div className="mobile-sub-links">
                    
                    <a href="#">Help</a>
                    <a href="#">Join Us</a>
                    <a href="#">Sign In</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;