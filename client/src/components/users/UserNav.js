import React, { Component } from "react";
import {
    Nav,
    Button
} from "reactstrap";
import "./account.scss";

class UserNav extends Component {
    render() {
        return (
            <div className="account-buttons">
                <Nav>
                    <Button className="create-button" onClick={() => this.props.history.push("/forms/post/create/")}>Create post</Button>
                    {/* <NavItem>
                        <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
                            Login with google
                        </a>
                    </NavItem> */}
                    <Button className="logout-button" onClick={this.props.logOut}>Logout</Button>
                </Nav>
            </div>
        )
    }
};

export default UserNav;