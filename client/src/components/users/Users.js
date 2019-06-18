import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from "../../actions/index";
import UserPosts from './UserPosts';
import {

    Nav,
    NavItem,
    Button
} from "reactstrap";
import { Route, NavLink as RouteLink } from "react-router-dom";
import Favorites from "./FavoritePosts";

class Users extends Component {

    componentDidMount() {
        const id = Number(this.props.location.pathname.split('/')[2]);
        this.props.getUsers(id);
    }

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
                    {/* </Nav> */}

                    {/* <Nav className="mr-auto" navbar> */}
                    <NavItem>
                        <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
                            Login with google
                        </a>
                    </NavItem>
                </Nav>
                <h2>{this.props.user.username}'s Posts</h2>

                <UserPosts history={this.props.history} />
                <Button onClick={() => this.props.history.push(`/user/${this.props.match.params.id}/favorites`)}>Favorites</Button>
            </React.Fragment>
        )
    }
};

function mapStateToProps({ usersReducer }) {
    return {
        user: usersReducer.user
    };
}

export default
    connect(
        mapStateToProps,
        {
            getUsers,
        }
    )(Users);
