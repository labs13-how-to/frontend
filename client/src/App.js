import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from "react-router-dom";
import { withRouter } from 'react-router';
import Home from './components/Home';
import Nav from './components/nav';
import Users from './components/users/Users';
import Register from './components/users/Register';
import Post from './components/posts/Post';
import CreatePost from './components/posts/CreatePost.js';
import CreateStep from './components/posts/CreatePostStep';
import { Button } from "reactstrap";
import SearchResults from "./components/posts/SearchResults";

import { getPosts, getUsers, getTest, getPost, login } from "./actions";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    this.props.getPosts();
    this.props.getTest();
  }

  login = event => {
    event.preventDefault();
    this.props.login();
  };

  searchChanges = e => {
    this.setState({ search: e.target.value });
  };

  searchSubmit = e => {
    e.preventDefault();
    this.props.history.push(`/search?q=${this.state.search}`);
  };

  render() {
    console.log("PROPS", this.props);
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.props.message}</h1>

          <Nav
            handleSubmit={this.searchSubmit}
            handleChanges={this.searchChanges}
          />

          <NavLink to={"/register"}>
            <Button>Register</Button>
          </NavLink>

          <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
            <Button className="btn btn-block btn-social btn-large btn-google-plus">
              Login with google
            </Button>
          </a>
        </header>
        <div className="container">
          <Route exact path="/" render={props => <Home {...props} />} />

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

          <Route path="/register" render={props => <Register {...props} />} />

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
