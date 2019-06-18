import React, { Component } from "react";
import {
    Nav,
    NavItem,

} from "reactstrap";
import { NavLink as RouteLink } from "react-router-dom";


class UserNav extends Component {

    render() {
        return (
            <React.Fragment>
                <RouteLink exact to="/" onClick={this.props.logOut}>
                    Logout
                    </RouteLink>

                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <RouteLink to="/forms/post/create/">Create Post</RouteLink>
                    </NavItem>
                    <NavItem>
                        <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
                            Login with google
                        </a>
                    </NavItem>
                </Nav>
            </React.Fragment>
        )
    }
};

export default UserNav;