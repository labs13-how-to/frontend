import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router";
// import Register from "./components/users/Register";
import { Button } from "reactstrap";

import Home from "./components/Home";
import Nav from "./components/navbar/Nav";
import Users from "./components/users/Users";
import Post from "./components/posts/Post";
import CreatePost from "./components/posts/CreatePost.js";
import SearchResults from "./components/posts/SearchResults";
import TagsSearch from "./components/posts/TagsSearch";
import CreateStep from "./components/posts/CreatePostStep";

import { getTest, login } from "./actions";
import queryString from "query-string";


class App extends Component {
  componentDidMount() {
    var query = queryString.parse(this.props.location.search);
    console.log("query:", query);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/");
    }

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

          <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
            <Button>Login with google</Button>
          </a>

          <NavLink to={"/user/:id"}>
            <Button>Account</Button>
          </NavLink>
        </header>
        <div className="container">
          <Route exact path='/' render={props => <Home {...props} />} />
          <Route
            path="/user/:id"
            render={props => (
              <Users
                {...props}
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
          <Route
            path="/categories/search"
            render={props => <TagsSearch {...props} />}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ projectsReducer, usersReducer }) {
  return {
    message: projectsReducer.message,
    token: usersReducer.token
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      getTest,
      login
    }
  )(App)
);
