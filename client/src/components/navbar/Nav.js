import React from "react";
import { NavLink as RouteLink } from "react-router-dom";
import NavSearch from "./NavSearch";
import {
  //Container
  // Collapse,
  Navbar,
  // NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

const NavComponent = props => {
  console.log("PROPS", props);

  return (
    <div className="nav-container">
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/">How-To</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavSearch {...props} />
          </NavItem>
        </Nav>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <RouteLink to="/forms/post/create/">Create Post</RouteLink>
          </NavItem>
        </Nav>

        <Nav className="mr-auto" navbar>
          <NavItem>
            <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
              Login with google
            </a>
          </NavItem>
        </Nav>
        <UncontrolledDropdown className="mr-auto" inNavbar>
          <DropdownToggle nav caret>
            Categories
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <RouteLink to={"/user/:id"}>
          <Button>Account</Button>
        </RouteLink>
        <RouteLink exact to="/" onClick={props.logOut}>
          Logout
        </RouteLink>
      </Navbar>
    </div>
  );
};

export default NavComponent;
