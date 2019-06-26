import React from 'react';
import { connect } from 'react-redux';
import { deleteReview, updateReview, getReviews } from "../../actions";
import { Card, CardText, CardBody, Button, Input } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
import "./reviews.scss"

class Review extends React.Component {
    state = {
        reviews: [],
        newRating: this.props.review.rating,
        newReview: this.props.review.review,
        updating: false,
        getValues: false
    };
    componentDidMount() {
        this.setState({
            newRating: this.props.review.rating,
            newReview: this.props.review.review
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.refresh !== this.props.refresh) {

            this.setState({
                newRating: this.props.review.rating,
                newReview: this.props.review.review
            });
        }
        if (this.state.getValues) {

            this.setState({
                newRating: this.props.review.rating,
                newReview: this.props.review.review, getValues: false
            })
        }
    };

    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    toggleUpdate = () => {
        this.state.updating
            ? this.setState({ updating: false })
            : this.setState({ updating: true, getValues: true })
    };

    update = id => {
        this.props.updateReview(id, {
            rating: this.state.newRating,
            review: this.state.newReview
        });

        this.setState({
            ...this.state,
            updating: false
        });
    };

    render() {
        console.log(this.props.review)

        return (
            <Card className="r-cards">
                
                <CardBody className="r-content">
                    <h5 className="r-poster">{this.props.review.username}</h5>
                    {!this.state.updating ? (
                        <div className="stars-container">
                            <StarRatingComponent
                                className="review-stars"
                                name="stars"
                                starCount={5}
                                value={this.props.review.rating}
                            />
                        </div>
                    ) : (
                            <Input
                                type="text"
                                name="newRating"
                                value={this.state.newRating}
                                onChange={this.handleUpdate}
                            />
                        )}
                    {!this.state.updating ? (
                        <CardText className="r-text">{this.props.review.review}</CardText>
                    ) : (
                            <Input
                                type="textarea"
                                name="newReview"
                                value={this.state.newReview}
                                onChange={this.handleUpdate}
                                rows="5"
                            />
                        )}
                </CardBody>
                {this.props.review.auth_id === window.localStorage.getItem('user_id') &&
                    (!this.state.updating ? (
                        <div className="r-buttons">
                            <Button className="r-button" onClick={() => this.props.deleteReview(this.props.review.id)}>Delete</Button>
                            <Button className="r-button" onClick={() => this.toggleUpdate()}>Edit</Button>
                        </div>
                    ) : (
                            <div className="r-buttons">
                                <Button className="r-button" onClick={() => this.toggleUpdate()}>Cancel</Button>
                                <Button className="r-button" onClick={() => this.update(this.props.review.id)}>Save</Button>
                            </div>
                        ))}
            </Card>
        )
    };
};

function mapStateToProps({ reviewsReducer }) {
    return {
        reviews: reviewsReducer.reviews,
        error: reviewsReducer.error,
        refresh: reviewsReducer.refresh
    };
};

export default connect(mapStateToProps, { deleteReview, updateReview, getReviews })(Review);
