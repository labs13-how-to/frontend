import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, Button } from 'reactstrap';
import Home from './components/Home';
import { Route, withRouter } from "react-router-dom";

class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">

          <Card>
            <CardTitle >
              Hello How To
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

function mapStateToProps(state) {
  return {
    projects: state.projects,
  }
}

export default withRouter(connect(
  mapStateToProps, {}
)(App));
