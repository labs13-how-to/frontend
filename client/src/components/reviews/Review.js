import React from 'react';
import { connect } from 'react-redux';
import { deleteReview, updateReview, getReviews } from "../../actions";
import { Card, CardText, CardBody, CardHeader, Button, Input } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

class Review extends React.Component {
    state = {
        reviews: [],
        newRating: this.props.review.rating,
        newReview: this.props.review.review,
        updating: false
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.refreshReview !== this.props.refreshReview) {
            this.props.getReviews(this.props.post_id);
            this.setState({ 
                newRating: this.props.review.rating,
                newReview: this.props.review.review
            });
        }
    };

    handleUpdate = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };
    
    toggleUpdate = () => {
       this.state.updating
        ? this.setState({ updating: false})
        : this.setState({updating: true})
    };

    update = id => {
        console.log("ID!", id);
        this.props.updateReview(id, {
          rating: this.state.newRating,
          review: this.state.newReview
        });
    
        this.setState({
          ...this.state,
            updating: false
        });
    };

    render(){
        return(
            <Card className="review-cards">
            <CardHeader>{this.props.review.username}</CardHeader>
                <CardBody>
                    {!this.state.updating ? (
                        <StarRatingComponent
                            name="stars"
                            starCount={5}
                            value={this.props.review.rating}
                        />
                    ) : (
                        <Input
                            type="text"
                            name="newRating"
                            value={this.state.newRating}
                            onChange={this.handleUpdate}
                        />
                    )}
                    {!this.state.updating ? (
                        <CardText>{this.props.review.review}</CardText>
                    ) : (
                        <Input
                            type="textarea"
                            name="newReview"
                            value={this.state.newReview}
                            onChange={this.handleUpdate}
                        />
                    )}
                </CardBody>
                {!this.state.updating ? (
                    <>
                        <Button onClick={() => this.toggleUpdate()}>Update</Button>
                        <Button onClick={() => this.props.deleteReview(this.props.review.id)}>X</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => this.update(this.props.review.id)}>Submit</Button>
                        <Button onClick={() => this.toggleUpdate()}>Cancel</Button>
                    </>
                )}
          </Card>
        )
    };
};

function mapStateToProps({ reviewsReducer }) {
    return {
      reviews: reviewsReducer.reviews,
      error: reviewsReducer.error,
      refreshReview: reviewsReducer.refreshReview
    };
};

export default connect(mapStateToProps, { deleteReview, updateReview, getReviews })(Review);