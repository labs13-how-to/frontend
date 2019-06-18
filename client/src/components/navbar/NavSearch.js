import React from "react";
import { withRouter } from "react-router";
import { Form, Input } from "reactstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class NavSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  searchChanges = e => {
    this.setState({ search: e.target.value });
  };

  searchSubmit = e => {
    e.preventDefault();
    this.props.history.push(`/search?q=${this.state.search}`);
  };

  render() {
    return (
      <Form onSubmit={this.searchSubmit} className='nav-search'>
        <Input
          type="text"
          id="search"
          placeholder={`🔍 Search`}
          size="50"
          onChange={this.searchChanges}
        />
      </Form>
    );
  }
}

export default withRouter(NavSearch);
