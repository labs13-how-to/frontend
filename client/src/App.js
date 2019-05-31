import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from "react-router-dom";
import Home from './components/Home';
import Users from './components/Users';
import { Card, CardTitle, Button } from 'reactstrap';

import { getPosts, getUsers } from './actions';


class App extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    console.log(this.props)

    return (
      <div className="App">
        <header className="App-header">

          <Card>
            <CardTitle >
              {this.props.message}
            </CardTitle>
            <Button>
              Get Started
            </Button>
          </Card>
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
            props
            {...this.props}

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
    user: usersReducer.user,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    getPosts,
    getUsers
  }
)(App));
