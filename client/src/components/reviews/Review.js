import React from "react";
import { connect } from "react-redux";
import Reviews from "./Reviews";
import ReviewForm from "./ReviewForm";
import StarRatingComponent from "react-star-rating-component";

import {
  getReviews,
  getUsers,
  deleteReview,
  updateReview
} from "../../actions";

import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  Button,
  Input
} from "reactstrap";

class Review extends React.Component {
  state = {
    reviews: []
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

  //  Austin's old project
  //   updateMessage = (id, message) => {
  //     console.log(id);
  //     this.props.updateMessage(id, message);
  //   };

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleUpdate = () => {
    this.setState({
      updating: true
    });
  };

  update = id => {
    console.log("ID!", id);
    this.props.updateReview(id, {
      newRating: this.state.newRating,
      newReview: this.state.neReview
    });

    this.setState({
      ...this.state,
      editing: false
    });
  };

  render() {
    return (
      <Card>
        <CardHeader>{this.props.review.username}</CardHeader>
        <CardBody>
          {!this.state.updating ? (
            <StarRatingComponent
              name="stars"
              starCount={5}
              value={review.rating}
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
            <CardText>{review.review}</CardText>
          ) : (
            <Input
              type="textarea"
              name="newReview"
              placeholder="Review"
              value={this.state.newReview}
              onChange={this.handleUpdate}
            />
          )}
        </CardBody>

        {!this.state.updating ? (
          <>
            <Button onClick={() => this.toggleUpdate(review.id)}>Update</Button>
            <Button onClick={() => this.props.deleteReview(review.id)}>
              delete
            </Button>
          </>
        ) : (
          <Button onClick={() => this.update(review.id)}>update</Button>
        )}
        {/* need something for up/down votes */}
      </Card>
    );
  }
}

const mapStateToProps = ({ reviewsReducer, usersReducer }) => {
  return {
    reviews: reviewsReducer.reviews,
    error: reviewsReducer.error,
    user: usersReducer.user,
    refresh: reviewsReducer.refresh,
    updating: reviewsReducer.updating
  };
};

export default connect(
  mapStateToProps,
  { getReviews, getUsers, deleteReview, updateReview }
)(Review);
