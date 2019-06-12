import React, { Component } from 'react';
import UserPosts from './UserPosts';

class Users extends Component {

    componentDidMount() {
        const id = Number(this.props.location.pathname.split('/')[2]);
        this.props.getUsers(id);
    }

    render() {
        return (
            <React.Fragment>
                <h2>{this.props.user.username}'s Posts</h2>
                <UserPosts history={this.props.history} />
            </React.Fragment>
        )
    }
};

export default Users;