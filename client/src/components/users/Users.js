import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/index";
import UserPosts from "./UserPosts";

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

        <h2>{this.props.user.username}'s Posts</h2>
        <UserPosts history={this.props.history} />
      </React.Fragment>
    );
  }
}

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
