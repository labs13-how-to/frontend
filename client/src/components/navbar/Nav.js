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
  componentDidMount() {
    this.props.getTag();
  }

  render() {
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
        <RouteLink to={"/user/1"}>
          <Button className='navBtn'>Account</Button>
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
