import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";

//Components
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Nav from "./components/navbar/Nav";
import Users from "./components/users/Users";
import Post from "./components/posts/Post";
import CreatePost from "./components/posts/CreatePost.js";
import SearchResults from "./components/posts/SearchResults";
import TagsSearch from "./components/posts/TagsSearch";
import EditPost from "./components/posts/EditPost";
import Favorites from "./components/users/FavoritePosts";
import UserNav from "./components/users/UserNav";
import PostList from "./components/posts/PostList";
import Footer from "./components/Footer.js";

//SearchBar
import { getTest, login } from "./actions";
import queryString from "query-string";

import { animations } from 'react-animation'
import 'react-animation/dist/keyframes.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_id: "",
      user_id: null,
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state
    });

    var query = queryString.parse(this.props.location.search);
    if (query.token && query.user) {
      window.localStorage.setItem("jwt", query.token);
      window.localStorage.setItem("user_id", query.user);
      this.props.history.push("/");
    }

    this.props.getTest();
    this.hydrateStateWithLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let user_id in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(user_id)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(user_id);
        try {
          console.log("VALUE", value);
          this.setState({ auth_id: `${value}` });
        } catch (e) {
          // handle empty string
          this.setState({ auth_id: `${value}` });
        }
      }
    }
  }

  login = event => {
    // event.preventDefault();
    this.props.login();
  };

  logOut = () => {
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
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <Nav
              logOut={this.logOut}
              auth_id={this.state.auth_id}
              user_id={this.state.user_id}
            />
          </div>
        </header>
        <div className="container main-container">
          {localStorage.hasOwnProperty('jwt') ?
            (<Route exact path="/" render={props => <Home {...props} />} />)
            : (<Route exact path="/" render={props => <LandingPage {...props} />} />)}

          <Route path="/user" render={props => <UserNav {...props} logOut={this.logOut} />} />
          <Route path="/user/:id" render={props => <Users {...props} />} />
          <Route
            path="/user/:id/favorites"
            render={props => <Favorites {...props} />}
          />

          <Route
            exact
            path="/posts"
            render={props => <PostList {...props} />}
          />
          <Route path="/posts/:id" render={props => <Post {...props} />} />

          <Route
            path="/forms/post/create"
            render={props => <CreatePost {...props} />}
          />

          <Route
            exact
            path="/forms/post/edit/:id"
            render={props => <EditPost {...props} />}
          />

          {/* <Route
            path="/forms/post/edit/:id"
            render={props => <CreateStep {...props} />}
          /> */}

          <Route
            path="/search"
            render={props => <SearchResults {...props} />}
          />

          <Route
            path="/categories/search"
            render={props => <TagsSearch {...props} />}
          />
        </div>
        <Footer />
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
