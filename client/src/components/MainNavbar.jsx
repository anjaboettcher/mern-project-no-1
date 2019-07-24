import React, { useState } from 'react'
import api from '../api'
import { Link, NavLink as NLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

function MainNavbar(props) {
  function handleLogoutClick(e) {
    api.logout()
  }

  const [isOpen, setIsOpen] = useState(false)

  function toggle() {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <Navbar color="danger" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          MERN Street Art
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={NLink} to="/list">
                List
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={NLink} to="#">
                Map
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={NLink} to="/new-street-arts">
                New Street Art
              </NavLink>
            </NavItem>
            <NavItem>
              {!api.isLoggedIn() && (
                <NavLink tag={NLink} to="/signup">
                  Signup
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {!api.isLoggedIn() && (
                <NavLink tag={NLink} to="/login">
                  Login
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {api.isLoggedIn() && (
                <NavLink tag={NLink} to="/" onClick={handleLogoutClick}>
                  Logout
                </NavLink>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default withRouter(MainNavbar)
