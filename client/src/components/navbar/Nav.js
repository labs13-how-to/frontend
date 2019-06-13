import React from 'react';
import { NavLink as RouteLink } from "react-router-dom";
import NavSearch from "./NavSearch";
import { connect } from 'react-redux';
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
    DropdownItem
} from 'reactstrap';
import { getTag } from '../../actions/steps-tagsActions';

class NavComponent extends React.Component {

    componentDidMount() {
        this.props.getTag();
    }

    render() {
        return (
            <Navbar color="light" light expand="md">
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
                        <RouteLink to="/register/">Register</RouteLink>
                    </NavItem>
                </Nav>

                <UncontrolledDropdown className="mr-auto" inNavbar>
                    <DropdownToggle nav caret>
                        Categories
                </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem>
                            Option 1
                    </DropdownItem>
                        {this.props.allTags.map(tag => <RouteLink to={`/categories/search?q=${tag.name}`} key={tag.id}><DropdownItem >{tag.name}</DropdownItem></RouteLink>)}
                    </DropdownMenu>
                </UncontrolledDropdown >
            </Navbar>
        )
    }
}

function mapStateToProps({ projectsReducer }) {
    return {
        allTags: projectsReducer.allTags
    }
}

export default connect(
    mapStateToProps,
    {
        getTag
    }
)(NavComponent);