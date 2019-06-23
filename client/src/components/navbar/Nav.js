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
  DropdownItem,
} from "reactstrap";
import { getTag } from "../../actions/steps-tagsActions";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoImage from '../../images/logo.png';




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
    return (
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/"><img className='logo' src={LogoImage} alt ='logo'/></NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavSearch {...this.props} />
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
          <FontAwesomeIcon icon={faUser} />
        </RouteLink>
      </Navbar >
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
