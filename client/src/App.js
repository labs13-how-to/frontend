import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { withRouter } from 'react-router';
import Home from './components/Home';
import Nav from './components/nav';
import Users from './components/users/Users';
import Register from './components/users/Register';
import Post from './components/posts/Post';
import CreatePost from './components/posts/CreatePost.js';
import CreateStep from './components/posts/CreatePostStep';

import { getPosts, getUsers, getTest, getPost } from './actions';


class App extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getTest();
  }

  render() {
    console.log(this.props)

    return (
      <div className="App">
        <header className="App-header">
          <h1>
            {this.props.message}
          </h1>
          <Nav />
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
          <Route path="/forms/post/create" render={props => (
            <CreatePost
              {...props}
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

          <Route path="/forms/post/:id/steps" render={props => (
            <CreateStep
              {...props}
            />
          )}
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
