import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from "react-router-dom";
import Home from './components/Home';
import { Card, CardTitle, Button } from 'reactstrap';

import { getPosts } from './actions';


class App extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
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

      </div>
    );
  }
}

function mapStateToProps({ projectsReducer }) {
  return {
    projects: projectsReducer.projects,
    message: projectsReducer.message,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    getPosts
  }
)(App));
