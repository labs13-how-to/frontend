import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
// import Register from "./components/users/Register";

import Home from "./components/Home";
import Nav from "./components/navbar/Nav";
import Users from "./components/users/Users";
import Post from "./components/posts/Post";
import CreatePost from "./components/posts/CreatePost.js";
import SearchResults from "./components/posts/SearchResults";
import TagsSearch from "./components/posts/TagsSearch";
import CreateStep from "./components/posts/CreatePostStep";
import EditPost from "./components/posts/EditPost";
import Favorites from './components/users/FavoritePosts';
import UserNav from './components/users/UserNav';
import PostList from './components/posts/PostList'

import { getTest, login } from "./actions";
import queryString from "query-string";

class App extends Component {
  componentDidMount() {
    this.setState({
      ...this.state
    });

    var query = queryString.parse(this.props.location.search);
    console.log("query:", query);
    if (query.token && query.user) {
      window.localStorage.setItem("jwt", query.token);
      window.localStorage.setItem("user_id", query.user);
      this.props.history.push("/");
    }

    this.props.getTest();
  }

  login = event => {
    event.preventDefault();
    this.props.login();
  };

  logOut = () => {
    console.log("logout");
    this.setState({
      ...this.state,
      token: null
    });
    localStorage.clear();
    //localStorage.removeItem('token')
    //props.history.push('/login)
    window.location.assign("/");
  };

  render() {
    console.log("PROPS", this.props);
    return (
      <div className="App">

        <header className="App-header">
          <div className="container">
            <Nav logOut={this.logOut} />
          </div>
        </header>
        <div className="container main-container">
          <Route exact path="/" render={props => <Home {...props} />} />

          <Route path="/user" render={props => <UserNav {...props} logOut={this.logOut} />} />
          <Route path="/user/:id" render={props => <Users {...props} />} />
          <Route path="/user/:id/favorites" render={props => <Favorites {...props} />} />

          <Route exact path="/posts" render={props => <PostList {...props} />} />
          <Route path="/posts/:id" render={props => <Post {...props} />} />

          <Route
            path="/forms/post/create"
            render={props => <CreatePost {...props} />}
          />

          <Route exact path="/forms/post/edit/:id" render={props => (
            <EditPost
              {...props}
            />
          )}
          />

          <Route
            path="/forms/post/edit/:id"
            render={props => <CreateStep {...props} />}
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
