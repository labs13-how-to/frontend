import React from 'react';
import { NavLink as RouteLink } from "react-router-dom";
import NavSearch from "./NavSearch";
import {
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
    DropdownItem
} from 'reactstrap';

const NavComponent = props => {

    return (
        <Navbar color="light" light expand="md">
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
                    <RouteLink to="/register/">Register</RouteLink>
                </NavItem>
            </Nav>

            <UncontrolledDropdown className="mr-auto" inNavbar>
                <DropdownToggle nav caret>
                    Categories
                </DropdownToggle>
                <DropdownMenu >
                    <DropdownItem>
                        Option 1
                    </DropdownItem>
                    <DropdownItem>
                        Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        Reset
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown >
        </Navbar>
    )
}

export default NavComponent;