import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import Home from "./components/Home";
import Nav from "./components/navbar/Nav";
import Users from "./components/users/Users";
// import Register from "./components/users/Register";
import Post from "./components/posts/Post";
import CreatePost from "./components/posts/CreatePost.js";
import SearchResults from "./components/posts/SearchResults";
import CreateStep from "./components/posts/CreatePostStep";
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
        <div className="container">
          <header className="App-header">
            <Nav logOut={this.logOut} />
          </header>

          <Route exact path="/" render={props => <Home {...props} />} />
          <Route path="/user/:id" render={props => <Users {...props} />} />
          <Route
            path="/forms/post/create"
            render={props => <CreatePost {...props} />}
          />

          <Route path="/posts/:id" render={props => <Post {...props} />} />

          <Route
            path="/forms/post/:id/steps"
            render={props => <CreateStep {...props} />}
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
