import React from "react";
import { connect } from "react-redux";
import { getReviews, getUsers } from "../../actions";
import { Card, CardText, CardBody, CardHeader } from "reactstrap";
import ReviewForm from "./ReviewForm";
import StarRatingComponent from "react-star-rating-component";

class Reviews extends React.Component {
  state = {
    rating: this.props.reviews.rating
  };
  componentDidMount() {
    this.props.getReviews(this.props.post_id);
  }

  render() {
    return (
      <div>
        <ReviewForm id={this.props.post_id} />
        {this.props.reviews.map((review, index) => {
          return (
            <Card key={index}>
              <CardHeader>{review.username}</CardHeader>
              <CardBody>
                <StarRatingComponent
                  name="stars"
                  starCount={5}
                  value={this.state.rating}
                />
                <CardText>{review.review}</CardText>
              </CardBody>
              {/* need something for up/down votes */}
            </Card>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({ reviewsReducer, usersReducer }) {
  return {
    reviews: reviewsReducer.reviews,
    error: reviewsReducer.error,
    user: usersReducer.user
  };
}

export default connect(
  mapStateToProps,
  { getReviews, getUsers }
)(Reviews);
