import React from 'react';
import { connect } from 'react-redux';
import {
    Card, CardText, CardBody, CardHeader, CardImg, Button,
    FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem, InputGroupButtonDropdown
} from 'reactstrap';
import { getTag } from '../../actions/steps-tagsActions';
import { getPost, deletePost } from '../../actions/index';

import PostStep from './PostStep';
import Reviews from "../reviews/Reviews";

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
            dropdownOpen: false,
            id: Number(this.props.location.pathname.split('/')[2])
        };
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    componentDidMount() {
        this.props.getPost(this.state.id)
        this.props.getTag();
        console.log("IDDD", this.state.id)
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.currPost.steps !== this.props.currPost.steps){
            this.props.getPost(this.state.id)
        };
    };
    delete(){
        this.props.deletePost(this.state.id);
        this.props.history.push("/");
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
                        <Button onClick={() => this.delete()}>X</Button>
                    </CardBody>

                    {!!steps && steps.map((step, index) => {
                        return (
                            <PostStep
                                key={index}
                                step={step}
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
        deletePost
    }
)(Post);