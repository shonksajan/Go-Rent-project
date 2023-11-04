import React, { useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/Taxi",
    display: "Taxicars",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  const toggleRegisterDropdown = () => {
    setShowRegisterDropdown(!showRegisterDropdown);
  };

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +91658554888
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <div className="login-dropdown" onClick={toggleLoginDropdown}>
                  <Link to="#" className="login-link">
                    <i className="ri-login-circle-line"></i> Login
                  </Link>
                  {showLoginDropdown && (
                    <div className="login-options">
                      <Link to="/login">Login as Admin</Link>
                      <br></br>
                      <Link to="/user-login">Login as User</Link>
                      <br></br>
                      <Link to="/taxi-driver-login">Login as Taxi Driver</Link>
                    </div>
                  )}
                </div>

                <div className="register-dropdown" onClick={toggleRegisterDropdown}>
                  <Link to="#" className="register-link">
                    <i className="ri-user-line"></i> Register
                  </Link>
                  {showRegisterDropdown && (
                    <div className="register-options">
                      <Link to="/register-as-user">Register as User</Link>
                      <br></br>
                      <Link to="/register-as-taxi-driver">Register as Taxi Driver</Link>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="header__middle">
        <Container>
          {/* ... (Rest of your code for the middle section) ... */}
        </Container>
      </div>

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
