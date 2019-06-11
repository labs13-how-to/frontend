import React from "react";
import { connect } from "react-redux";
import { addReview } from "../../actions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      review: ""
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.addReview(this.props.id, this.state);

    this.setState({
      rating: 0,
      review: ""
    });
  };

  render() {
    //Star Rating Component
    const { rating } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <h2>Rating from state: {rating}</h2>
          <StarRatingComponent
            name="stars"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Review</Label>
          <Input
            type="textarea"
            name="review"
            placeholder="Review"
            onChange={this.handleChange}
            value={this.state.review}
          />
        </FormGroup>
        <Button type="submit">Post</Button>
      </Form>
    );
  }
}

function mapStateToProps({ reviewsReducer }) {
  return {
    error: reviewsReducer.error
  };
}

export default connect(
  mapStateToProps,
  { addReview }
)(ReviewForm);
