import React from "react";
import { connect } from "react-redux";
import {
    Card, CardText, CardBody, CardImg, Button,
} from "reactstrap";
import { getPost, deletePost, getUsers, getRefresh } from "../../actions/index";
import { getTag } from "../../actions/steps-tagsActions";
import PostStep from "./PostStep";
import Reviews from "../reviews/Reviews";
import StarRatingComponent from "react-star-rating-component";
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
        if (prevProps.refreshUser !== this.props.refreshUser) {
            this.props.getUsers(this.props.currPost.created_by)

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
            steps,
            reviews,
            created_at
        } = this.props.currPost
        const review_avg = reviews && reviews.reduce((res, review) => res + review.rating, 0) / reviews.length
        const review_count = reviews && reviews.length
        const postDate = created_at && created_at.split("T")[0].split("-")
        // split supplies into array list
        const supplyList = supplies && supplies.split(" ")
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
                        <div className="p-rating">
                            <StarRatingComponent
                                className="review-stars post-stars"
                                name="stars"
                                starCount={5}
                                value={Math.round(review_avg)}
                            />
                            <CardText className="review-count post-review">{`• \xa0`}{review_count} Reviews</CardText>
                        </div>
                        <div className="p-created">
                            <CardText className="p-user">{this.props.user.username}</CardText>
                            <CardText className="date-count">{postDate && `${postDate[1][1]}/${postDate[2]}/${postDate[0]}`}</CardText>
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
                                {/* loop through supplyList and display each item */}
                                {supplyList && supplyList.map((item, index) => <li key={index}>{item}</li>)}

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
function mapStateToProps({ projectsReducer, usersReducer }) {
    return {
        error: projectsReducer.error,
        currPost: projectsReducer.currPost,
        allTags: projectsReducer.allTags,
        refresh: projectsReducer.refresh,
        user: usersReducer.user,
        refreshUser: projectsReducer.refreshUser
    }
}

export default connect(
    mapStateToProps,
    {
        getTag,
        getPost,
        deletePost,
        getUsers,
        getRefresh

    }
)(Post);