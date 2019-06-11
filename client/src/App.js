import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import Home from "./components/Home";
import Nav from "./components/navbar/Nav";
import Users from "./components/users/Users";
// import Register from "./components/users/Register";
import Post from "./components/posts/Post";
import CreatePost from "./components/posts/CreatePost.js";
import { Button } from "reactstrap";
import SearchResults from "./components/posts/SearchResults";
import CreateStep from "./components/posts/CreatePostStep";
import { getPosts, getUsers, getTest, getPost, login } from "./actions";
import queryString from "query-string";


class App extends Component {
  componentDidMount() {
    var query = queryString.parse(this.props.location.search);
    console.log("query:", query);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/");
    }

    this.props.getPosts();
    this.props.getTest();
  }

  login = event => {
    event.preventDefault();
    this.props.login();
  };

  render() {
    console.log("PROPS", this.props);
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.props.message}</h1>

          <Nav />

          <NavLink to={"/"}>
            <Button>Home</Button>
          </NavLink>

          <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
            <Button>Login with google</Button>
          </a>

          <NavLink to={"/user/:id"}>
            <Button>Account</Button>
          </NavLink>
        </header>
        <div className="container">
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
          <Route path="/forms/post/create" render={props => (
            <CreatePost
              {...props}
            />
          )}
          />

          {/* <Route path="/register" render={props => <Register {...props} />} /> */}

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

          <Route path="/forms/post/:id/steps" render={props => (
            <CreateStep
              {...props}
            />
          )}
          />

          <Route
            path="/search"
            render={props => <SearchResults {...props} />}
          />
        </div>
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
