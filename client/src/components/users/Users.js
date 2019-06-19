import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/index";
import UserPosts from './UserPosts';
import {
    Button
} from "reactstrap";
import Favorites from "./FavoritePosts";

class Users extends Component {
    componentDidMount() {
        const id = (this.props.location.pathname.split("/")[2]);
        this.props.getUsers(id);
        console.log(
            "this.props.location.pathname",
            id
        );
    }

    render() {
        console.log("this.props.user:", this.props.user)
        return (
            <React.Fragment>
                <h2 className="account-header">{this.props.user.username}'s Posts</h2>
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

export default connect(
    mapStateToProps,
    {
        getUsers
    }
)(Users);
