import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers, getPosts } from "../../actions/index";
import UserPosts from './UserPosts';
import {
    Button
} from "reactstrap";
import Favorites from "./FavoritePosts";

class Users extends Component {
    componentDidMount() {
        this.props.getPosts();
        const id = (this.props.location.pathname.split("/")[2]);
        this.props.getUsers(id);
        console.log(
            "this.props.location.pathname",
            id
        );
    }

    render() {
        const userPosts = this.props.posts.filter((post) => post.created_by === this.props.match.params.id)
        const posts_count = userPosts && userPosts.length
        return (
            <React.Fragment>
                <h2>{this.props.user.username}'s Posts</h2>
                <p>{posts_count}</p>

                <UserPosts history={this.props.history} userPosts={userPosts} />
                <Button onClick={() => this.props.history.push(`/user/${this.props.match.params.id}/favorites`)}>Favorites</Button>
            </React.Fragment>
        )
    }
};

function mapStateToProps({ usersReducer, projectsReducer }) {
    return {
        user: usersReducer.user,
        posts: projectsReducer.posts
    };
}

export default connect(
    mapStateToProps,
    {
        getUsers,
        getPosts
    }
)(Users);
