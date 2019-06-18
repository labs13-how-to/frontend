import React from "react";
import { NavLink as RouteLink } from "react-router-dom";
import NavSearch from "./NavSearch";
import { connect } from "react-redux";
import {
  // Collapse,
  Navbar,
  // NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import { getTag } from "../../actions/steps-tagsActions";

class NavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_id: "",
      user_id: null
    };
  }
  componentDidMount() {
    this.props.getTag();
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

  render() {
    // console.log("USER ID", this.state.user_id);
    return (
      <Navbar color="whitesmoke" light expand="md">
        <NavbarBrand href="/">How-To</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavSearch {...this.props} />
          </NavItem>
        </Nav>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <RouteLink to="/forms/post/create/">Create Post</RouteLink>
          </NavItem>
        </Nav>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
              Login with google
            </a>
          </NavItem>
        </Nav>
        <UncontrolledDropdown className="mr-auto" inNavbar>
          <DropdownToggle nav caret>
            Categories
          </DropdownToggle>
          <DropdownMenu>
            {this.props.allTags.map(tag => (
              <RouteLink to={`/categories/search?q=${tag.name}`} key={tag.id}>
                <DropdownItem>{tag.name}</DropdownItem>
              </RouteLink>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        <RouteLink to={`/user/${this.state.auth_id}`}>
          <Button className="navBtn">Account</Button>
        </RouteLink>
        <RouteLink exact to="/" onClick={this.props.logOut}>
          Logout
        </RouteLink>
      </Navbar>
    );
  }
}

function mapStateToProps({ projectsReducer }) {
  return {
    allTags: projectsReducer.allTags
  };
}

export default connect(
  mapStateToProps,
  {
    getTag
  }
)(NavComponent);
