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
  Button,
  Media,
  CardImg
} from "reactstrap";
import { getTag } from "../../actions/steps-tagsActions";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoImage from '../../images/logo.png';




class NavComponent extends React.Component {
  componentDidMount() {
    this.props.getTag();
  }

  render() {
    return (
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/"><img className='logo' src={LogoImage} /></NavbarBrand>
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
        <RouteLink to={"/user/1"}>
          {/* <Button className='navBtn'>Account</Button> */}
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
