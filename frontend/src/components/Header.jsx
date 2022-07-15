import React from 'react'
import {Navbar, Nav} from "react-bootstrap";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="primary" className='header'>
        <Navbar.Brand className="brand" href="/">
            QuizHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto links">
                
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header