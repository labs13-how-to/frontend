import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from "react-router-dom";
import { withRouter } from 'react-router';
import Home from './components/Home';
import Users from './components/users/Users';
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


        </header>

        <Route exact path="/" render={((props) => (
          <Home
            {...props.history}
            {...this.props}
          />
        ))}
        />

        <Route path="/user/:id" render={props => (
          <Users
            {...props}
            {...this.props}

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
