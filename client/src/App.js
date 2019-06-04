import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from "react-router-dom";
import { withRouter } from 'react-router';
import Home from './components/Home';
import Users from './components/users/Users';
import Register from './components/users/Register';
import Post from './components/posts/Post';
import { Button } from 'reactstrap';

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
          <NavLink to={'/'}>
            <Button >
              Home
            </Button>
          </NavLink>

          <NavLink to={'/register'}>
            <Button >
              Register
            </Button>
          </NavLink>


        </header>

        <Route exact path="/" render={((props) => (
          <Home
            {...props}
            posts={this.props.posts}
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
