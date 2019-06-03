import React, { Component } from 'react';


class Users extends Component {

    componentDidMount() {
        const id = Number(this.props.location.pathname.split('/')[2]);
        this.props.getUsers(id);
    }

    render() {
        console.log(this.props.user)
        return (
            <React.Fragment>
                <h2>User</h2>
                <div>
                    <p>{this.props.user.username}</p>
                    <p>is a: {this.props.user.role}</p>
                </div>
            </React.Fragment>
        )
    }
};

export default Users;