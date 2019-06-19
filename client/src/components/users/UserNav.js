import React, { Component } from "react";
import {
    Nav,
    NavItem,
} from "reactstrap";
import { NavLink as RouteLink } from "react-router-dom";
import "./account.scss";

class UserNav extends Component {
    render() {
        return (
            <div className="account-buttons">
                <Nav>
                    <NavItem>
                        <RouteLink to="/forms/post/create/">Create Post</RouteLink>
                    </NavItem>

                    {/* <NavItem>
                        <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
                            Login with google
                        </a>
                    </NavItem> */}
                    <RouteLink className="logout-button" exact to="/" onClick={this.props.logOut}>Logout</RouteLink>
                </Nav>
            </div>
        )
    }
};

export default UserNav;