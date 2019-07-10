import React from "react";
import { NavLink as RouteLink } from "react-router-dom";
import NavSearch from "./NavSearch";
import { connect } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { getTag } from "../../actions/steps-tagsActions";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoImage from "../../images/logo.png";

class NavComponent extends React.Component {
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
          this.setState({ auth_id: `${value}` });
        } catch (e) {
          // handle empty string
          this.setState({ auth_id: `${value}` });
        }
      }
    }
  }

  render() {
    const isLogged =
      window.localStorage.getItem("user_id") &&
      window.localStorage.getItem("jwt");
    return (
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/">
          <div className="logo-container">
            <img className="logo" src={LogoImage} alt="logo" />
          </div>
        </NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavSearch {...this.props} />
          </NavItem>
        </Nav>
        <div className="nav-section">
          <div className="categories">
            <div className="desktop-dropdown">
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
            </div>
            <div className="mobile-dropdown">
              <UncontrolledDropdown className="mr-auto" inNavbar>
                <DropdownToggle nav>
                  <FontAwesomeIcon className="bars" icon={faBars} />
                </DropdownToggle>
                <DropdownMenu>
                  {this.props.allTags.map(tag => (
                    <RouteLink to={`/categories/search?q=${tag.name}`} key={tag.id}>
                      <DropdownItem>{tag.name}</DropdownItem>
                    </RouteLink>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="profile">
            {isLogged ? (
              <RouteLink to={`/user/${this.props.auth_id}`}>
                <FontAwesomeIcon icon={faUser} />
              </RouteLink>
            ) : (
                <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
                  <FontAwesomeIcon icon={faUser} />
                </a>
              )}
          </div>
        </div>
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
