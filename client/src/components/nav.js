import React from 'react';
import { NavLink as RouteLink } from "react-router-dom";
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
    DropdownItem,
    Form,
    Input
} from 'reactstrap';

const NavComponent = props => {

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">How-To</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <Form onSubmit={props.handleSubmit}>
                        <Input
                            type="text"
                            id="search"
                            placeholder="Search"
                            onChange={props.handleChanges}
                        />
                    </Form>
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