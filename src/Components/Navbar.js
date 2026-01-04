import React, { useState } from "react";
import "../Styles/Navbar.css";
import logo1 from "../Assets/logo1.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const SearchIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
    <path
      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
      stroke="#111111"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);



const HamburgerIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="#111111"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const CloseIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="#111111"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, isAdmin, logout, user } = useAuth();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const getSearchTargetPath = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("accessoires")) return "/Accessoires";
    return "/Motorcycle";
  };

const doSearch = () => {
  const q = search.trim();
  if (!q) return;
  navigate(`/search?q=${encodeURIComponent(q)}`);
};


  const handleKeyDown = (e) => {
    if (e.key === "Enter") doSearch();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="nike-header">
        <nav className="main-nav">
          <div className="navbar-left" onClick={() => navigate("/")}>
            <img
              src={logo1}
              alt="Logo"
              className="logo"
              style={{ cursor: "pointer" }}
            />
          </div>

          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/Motorcycle">Motorcycle</a></li>
            <li><a href="/SBS">Side-By-Side</a></li>
            <li><a href="/Accessoires">Parts & Accessoires</a></li>
            <li><a href="/ContactUs">Contact Us</a></li>

            {/* Auth links (desktop menu) */}
            {!isLoggedIn ? (
              <>
                <li><a href="/login">Sign In</a></li>
                <li><a href="/signup">Sign Up</a></li>
              </>
            ) : (
              <>
                {isAdmin && (
                  <>
                    <li><a href="/admin">Admin Products</a></li>
                    <li><a href="/admin/messages">Admin Messages</a></li>
                  </>
                )}

                <li>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      font: "inherit",
                      padding: 0,
                    }}
                  >
                    Logout {user?.name ? `(${user.name})` : ""}
                  </button>
                </li>
              </>
            )}
          </ul>

          <div className="nav-icons">
            <div className="search-container">
              <button
                className="search-icon"
                onClick={doSearch}
                type="button"
                aria-label="Search"
              >
                <SearchIcon />
              </button>

              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>


            <button className="hamburger" onClick={toggleMobileMenu}>
              <HamburgerIcon />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={closeMobileMenu}>
          <CloseIcon />
        </button>

        <ul onClick={closeMobileMenu}>
          <li><a href="/">Home</a></li>
          <li><a href="/Motorcycle">Motorcycle</a></li>
          <li><a href="/SBS">Side-By-Side</a></li>
          <li><a href="/Accessoires">Parts & Accessoires</a></li>
          <li><a href="/ContactUs">Contact Us</a></li>

          {!isLoggedIn ? (
            <>
              <li><a href="/login">Sign In</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </>
          ) : (
            <>
              {isAdmin && (
                <>
                  <li><a href="/admin">Admin Products</a></li>
                  <li><a href="/admin/messages">Admin Messages</a></li>
                </>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                    padding: 0,
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
