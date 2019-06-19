import React from "react";
import { connect } from "react-redux";
import {
    Card, CardText, CardBody, CardImg, Button,
} from "reactstrap";
import { getPost, deletePost } from "../../actions/index";
import { getTag } from "../../actions/steps-tagsActions";
import PostStep from "./PostStep";
import Reviews from "../reviews/Reviews";
import "../../post.scss";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.location.pathname.split("/")[2])
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
                <Card className="post-card" id="post">
                    <CardImg className="img-fluid" src={img_url} alt="Card image" />
                    <CardBody>
                        <div className="p-header">
                            <CardText className="p-title">{title}</CardText>
                            <div className="p-buttons">
                                <Button className="edit-button" onClick={() => this.delete()}>Delete</Button>
                                <Button className="edit-button" onClick={() => this.props.history.push(`/forms/post/edit/${this.state.id}`)}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                        <CardText className="p-description">{description}</CardText>
                        <div className="p-content-container">
                            <div className="p-content-section">
                                <span className="p-content-label">Difficulty</span>
                                <CardText>{difficulty}</CardText>
                            </div>
                            <div className="p-content-section">
                                <span className="p-content-label">Duration</span>
                                <CardText>{duration}</CardText>
                            </div>
                            <div className="p-content-section">
                                <span className="p-content-label">Supplies</span>
                                <CardText>{supplies}</CardText>
                            </div>
                            <div className="p-content-section">
                                <span className="p-content-label">Pre-Requisite Skills</span>
                                <CardText>{skills}</CardText>
                            </div>
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

                   <CardBody className="post-category">Categories</CardBody>
                    <div className="tag-section">
                        <p className="post-tags post-page">
                            {tags && tags.map(tag => <span key={tag.id}>{tag.name}</span>)}
                        </p>
                    </div>
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