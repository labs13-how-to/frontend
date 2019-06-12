import React from "react";
import { connect } from "react-redux";
import { getReviews, getUsers, deleteReview } from "../../actions";
import { Card, CardText, CardBody, CardHeader, Button } from "reactstrap";
import ReviewForm from "./ReviewForm";
import StarRatingComponent from "react-star-rating-component";

//reviewsreviews!!!!

class Reviews extends React.Component {
  state = {
    review: 0,
    updating: false
  };
  componentDidMount() {
    this.props.getReviews(this.props.post_id);
    console.log(this.props.post_id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.refresh !== this.props.refresh) {
      this.props.getReviews(this.props.post_id);
    }
  }

  toggleUpdate = () => {
    this.setState({
      updating: true
    });
  };

  render() {
    console.log("THISPROPSREVIEWS!", this.props.reviews);
    return (
      <div>
        <ReviewForm id={this.props.post_id} />
        <div className="review-container">
          {this.props.reviews &&
            this.props.reviews.map((review, index) => {
              return (
                <Card key={index} className="review-cards">
                  <CardHeader>{review.username}</CardHeader>
                  <CardBody>
                    <StarRatingComponent
                      name="stars"
                      starCount={5}
                      value={review.rating}
                    />
                    <CardText>{review.review}</CardText>
                  </CardBody>
                  <Button onClick={() => this.props.deleteReview(review.id)}>
                    X
                  </Button>
                  {/* need something for up/down votes */}
                </Card>
              );
            })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ reviewsReducer, usersReducer }) {
  return {
    reviews: reviewsReducer.reviews,
    error: reviewsReducer.error,
    user: usersReducer.user,
    refresh: reviewsReducer.refresh
  };
}

export default connect(
  mapStateToProps,
  { getReviews, getUsers, deleteReview }
)(Reviews);