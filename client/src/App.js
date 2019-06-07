import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import Home from "./components/Home";
import Users from "./components/users/Users";
import Register from "./components/users/Register";
import Post from "./components/posts/Post";
import { Button } from "reactstrap";

import { getPosts, getUsers, getTest, getPost, login } from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getTest();
  }

  login = event => {
    event.preventDefault();
    this.props.login();
  };

  render() {
    console.log(this.props);
    console.log("url", process.env);

    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.props.message}</h1>
          <NavLink to={"/"}>
            <Button>Home</Button>
          </NavLink>

          <NavLink to={"/register"}>
            <Button>Register</Button>
          </NavLink>

          <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
            <Button className="btn btn-block btn-social btn-large btn-google-plus">
              Login with google
            </Button>
          </a>
        </header>

        <Route
          exact
          path="/"
          render={props => <Home {...props} posts={this.props.posts} />}
        />

        <Route
          path="/user/:id"
          render={props => (
            <Users
              {...props}
              user={this.props.user}
              getUsers={this.props.getUsers}
            />
          )}
        />

        <Route path="/register" render={props => <Register {...props} />} />

        <Route path="/login" render={props => <Register {...props} />} />

        <Route
          path="/posts/:id"
          render={props => (
            <Post
              {...props}
              getPost={this.props.getPost}
              post={this.props.currPost}
            />
          )}
        />
      </div>
    );
  }
}

function mapStateToProps({ projectsReducer, usersReducer }) {
  return {
    posts: projectsReducer.posts,
    message: projectsReducer.message,
    currPost: projectsReducer.currPost,
    token: usersReducer.token,
    user: usersReducer.user
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      getPosts,
      getUsers,
      getTest,
      getPost,
      login
    }
  )(App)
);
