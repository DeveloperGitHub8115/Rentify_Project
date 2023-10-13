
import { useState } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import '../App.css';
export function NavigationBar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  return (
    <nav className="nav">
      <a href="#" className="nav__brand">
        Rentify
      </a>
      <ul className={active}>
          <LinkContainer to="/">
          <li className="nav__item">
          <a href="#" className="nav__link">
            Home
          </a>
        </li>
          </LinkContainer>
        <LinkContainer to="/about">
        <li className="nav__item">
          <a href="#" className="nav__link">
            About
          </a>
        </li>
        </LinkContainer>
        <LinkContainer to="/services">
        <li className="nav__item">
          <a href="#" className="nav__link">
            Services
          </a>
        </li>
        </LinkContainer>
        <LinkContainer to="/contact">
        <li className="nav__item">
          <a href="#" className="nav__link">
            Contact
          </a>
        </li>
        </LinkContainer>
        <LinkContainer to="/signup">
        <li className="nav__item">
          <Button className="btn btn-danger">
             <h4 className="text-center pt-1">Register</h4>
          </Button>
        </li>
        </LinkContainer>
      </ul>
      <div onClick={() => {
        if (active === "nav__menu") {
          setActive("nav__menu nav__active");
        } else setActive("nav__menu");


        if (icon === "nav__toggler") {
          setIcon("nav__toggler toggle");
        } else setIcon("nav__toggler");
      }} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
