import React, { Component } from 'react';


class Users extends Component {

    componentDidMount() {
        // console.log(this.props.match.params.id)
        this.props.getUsers(1);
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