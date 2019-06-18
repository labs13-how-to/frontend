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


        this.state = {
            id: (this.props.location.pathname.split('/')[2])
        };
        console.log(
            "this.props.location.pathname",
            this.state.id
          );
    }

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
                   
                </Card>
                <div>
                    <Reviews
                        post_id={this.state.id}
                    />
                </div>
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

    }
)(Post);