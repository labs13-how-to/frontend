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
                <h2>User</h2>
                <div>
                    <p>{this.props.user.username}</p>
                    <p>is a: {this.props.user.role}</p>
                </div>
                <UserPosts history={this.props.history} />
            </React.Fragment>
        )
    }
};

export default Users;