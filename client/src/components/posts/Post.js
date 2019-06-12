import React from 'react';
import { connect } from 'react-redux';
import {
    Card, CardText, CardBody, CardHeader, CardImg,
    FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem, InputGroupButtonDropdown
} from 'reactstrap';
import { getTag } from '../../actions/steps-tagsActions';
import { getPost } from '../../actions/index';



class Post extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    componentDidMount() {
        const id = Number(this.props.location.pathname.split('/')[2]);
        this.props.getPost(id)
        this.props.getTag();
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const {
            title,
            description,
            img_url,
            difficulty,
            skills,
            supplies,
            duration,
            tags
        } = this.props.currPost
        return (
            <Card className='post'>
                <CardImg src={img_url} alt="Card image" />
                <CardBody>Tags:</CardBody>
                <div className='tag-section'>
                    <p className='post-tags'>
                        {tags && tags.map(tag => <span key={tag.id}>{tag.name}</span>)}
                    </p>
                    <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                        <DropdownToggle split outline />
                        <DropdownMenu>
                            <DropdownItem>
                                <FormGroup>
                                    <Label for="exampleSelectMulti">Select Tags</Label>
                                    <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                        {this.props.allTags ? this.props.allTags.map(tag => <option key={tag.id}>{tag.name}</option>) : null}
                                    </Input>
                                </FormGroup>

                            </DropdownItem>

                        </DropdownMenu>
                    </InputGroupButtonDropdown >
                </div>

                <CardHeader>{title}</CardHeader>
                <CardBody>
                    <CardText>{description}</CardText>
                    <CardText>Difficulty: {difficulty}</CardText>
                    <CardText>duration: {duration}</CardText>
                    <CardText>skills: {skills}</CardText>
                    <CardText>supplies: {supplies}</CardText>
                </CardBody>

            </Card>
        );
    }
};
function mapStateToProps({ projectsReducer }) {
    return {
        error: projectsReducer.error,
        currPost: projectsReducer.currPost,
        allTags: projectsReducer.allTags
    }
}

export default connect(
    mapStateToProps,
    {
        getTag,
        getPost
    }
)(Post);