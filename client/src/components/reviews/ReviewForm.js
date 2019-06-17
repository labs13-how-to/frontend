import React from "react";
import { connect } from "react-redux";
import { addReview, getReviews } from "../../actions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      review: "",
      post_id: this.props.id,
      auth_id: "",
      user_id: null
    };
  }
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    // window.addEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );
  }
  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let user_id in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(user_id)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(user_id);
        try {
          console.log("VALUE", value);
          this.setState({ auth_id: `${value}` });
        } catch (e) {
          // handle empty string
          this.setState({ auth_id: `${value}` });
        }
      }
    }
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
    console.log("id1!!!!", this.props.id);
    await this.props.addReview(this.props.id, this.state);

    // this.setState({
    //   rating: 0,
    //   review: ""
    // });
    setTimeout(this.props.getReviews(this.state.post_id), 1000);
  };

  render() {
    //Star Rating Component
    const { rating } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <h2>Rating:</h2>
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
    error: reviewsReducer.error,
    reviews: reviewsReducer.reviews
  };
}

export default connect(
  mapStateToProps,
  { addReview, getReviews }
)(ReviewForm);
