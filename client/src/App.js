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
import { Button } from 'reactstrap';

import { getPosts, getUsers, getTest, getPost } from './actions';
import SearchResults from './components/posts/SearchResults';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        search: ''
    };
  }

  componentDidMount() {
    this.props.getPosts();
    this.props.getTest();
  }

  searchChanges = e => {
    this.setState({ search: e.target.value })
  }

  searchSubmit = e => {
    e.preventDefault();
    this.props.history.push(`/search?q=${this.state.search}`)
  }

  render() {
    console.log('PROPS',this.props)

    return (
      <div className="App">
        <header className="App-header">
          <h1>
            {this.props.message}
          </h1>
          <Nav
            handleSubmit={this.searchSubmit}
            handleChanges={this.searchChanges}
          />
        </header>
        <div className="container">
          <Route exact path="/" render={((props) => (
            <Home
              {...props}
            />
          ))}
          />

          <Route path="/user/:id" render={props => (
            <Users
              {...props}
              user={this.props.user}
              getUsers={this.props.getUsers}
            />
          )}
          />
          <Route exact path="/forms/post/create" render={props => (
            <CreatePost
              {...props}
              getPost={this.props.getPost}
              post={this.props.currPost}
            />
          )}
          />

          <Route path="/register" render={props => (
            <Register
              {...props}
            />
          )}
          />

          <Route path="/posts/:id" render={props => (
            <Post
              {...props}
              getPost={this.props.getPost}
              post={this.props.currPost}
            />)} />

          <Route path="/search" render={props => (
            <SearchResults {...props} />
          )} />

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

    user: usersReducer.user,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    getPosts,
    getUsers,
    getTest,
    getPost
  }
)(App));
