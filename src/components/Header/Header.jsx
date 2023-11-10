import React, { useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import {LogoutOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
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
    path: "/taxicars",
    display: "Taxicars",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const nav = useNavigate();
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

  const logout=()=>{
    localStorage.clear();
    nav("/taxi-driver-login")
  }

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
{localStorage.getItem("userid")?(
  <div >
             <button onClick={()=>{logout()}} className="logout" style={{width:"100px", float:"Right", fontSize:"14px", background:"none"}}><LogoutOutlined /> Logout</button>
             </div>
           ):(
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
                      <Link to="/userlogin">Login as User</Link>
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
                      <Link to="/usersignin">Register as User</Link>
                      <br></br>
                      <Link to="/register/taxi-driver">Register as Taxi Driver</Link>
                    </div>
                  )}
                </div>
              </div>
            </Col>
)}
          </Row>
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
                <input type="text" placeholder="Search" style={{border:"none"}}/>
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
