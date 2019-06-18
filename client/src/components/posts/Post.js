import React from 'react';
import { connect } from 'react-redux';
import {
    Card, CardText, CardBody, CardHeader, CardImg, Button,
    FormGroup, Label, Input, DropdownToggle, DropdownMenu,
    DropdownItem, InputGroupButtonDropdown, Form
} from 'reactstrap';
import { getPost, deletePost } from '../../actions/index';
import { getTag, addTag, removeTag } from '../../actions/steps-tagsActions';


import PostStep from './PostStep';
import Reviews from "../reviews/Reviews";

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
            dropdownOpen: false,
            id: (this.props.location.pathname.split('/')[2])
        };
        console.log(
            "this.props.location.pathname",
            this.state.id
          );
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    componentDidMount() {
        this.props.getPost(this.state.id)
        this.props.getTag();
        console.log("IDDD", this.state.id)
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.refresh !== this.props.refresh) {
            this.props.getPost(this.state.id)
        };
    };
    delete() {
        this.props.deletePost(this.state.id);
        this.props.history.push("/");
    };


    handleChange = e => {
        this.setState({ tag: e.target.value });
        const tagId = this.props.allTags.filter((tag) => e.target.value === tag.name.toLowerCase() && tag.id)
        const isTagged = this.props.currPost.tags.filter(tag => e.target.value === tag.name.toLowerCase())
        const newTag = { post_id: this.state.id, tag_id: tagId[0].id };
        isTagged.length
            ? this.props.removeTag(newTag)
            : this.props.addTag(newTag);
    };

    render() {
        const {
            title,
            description,
            img_url,
            difficulty,
            skills,
            supplies,
            duration,
            tags,
            steps
        } = this.props.currPost
        return (
            <React.Fragment>
                <Card id='post'>

                    <CardImg className="img-fluid" src={img_url} alt="Card image" />
                    <CardBody>Tags:</CardBody>
                    <div className='tag-section'>
                        <p className='post-tags'>
                            {tags && tags.map(tag => <span key={tag.id}>{tag.name}</span>)}
                        </p>
                        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                            <DropdownToggle split outline />
                            <DropdownMenu>
                                <DropdownItem>
                                    <Form>
                                        <FormGroup>
                                            <Label for="exampleSelectMulti">Select Tags</Label>
                                            <Input onChange={this.handleChange} type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                                {this.props.allTags ? this.props.allTags.map(tag => <option key={tag.id} value={tag.name.toLowerCase()}>{tag.name}</option>) : null}
                                            </Input>
                                        </FormGroup>
                                    </Form>
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
                        <div className="btn-group" role="group">
                            <Button className="edit-button" onClick={() => this.props.history.push(`/forms/post/edit/${this.state.id}`)}>
                                Edit
                            </Button>
                            <Button className="edit-button" onClick={() => this.delete()}>X</Button>
                        </div>
                    </CardBody>

                    {!!steps && steps.map((step, index) => {
                        return (
                            <PostStep
                                key={index}
                                step={step}
                                index={index}
                            />
                        )
                    })}
                    <Button onClick={() => this.props.history.push(`/forms/post/${this.state.id}/steps`)}>
                        Add Steps
                    </Button>

                    <Reviews
                        post_id={this.state.id}
                    />
                </Card>
            </React.Fragment>
        );
    }
};
function mapStateToProps({ projectsReducer }) {
    return {
        error: projectsReducer.error,
        currPost: projectsReducer.currPost,
        allTags: projectsReducer.allTags,
        refresh: projectsReducer.refresh
    }
}

export default connect(
    mapStateToProps,
    {
        getTag,
        getPost,
        deletePost,
        removeTag,
        addTag
    }
)(Post);