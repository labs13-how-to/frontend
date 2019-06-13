import React from "react";
import { connect } from "react-redux";
import { getReviews } from "../../actions";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

class Reviews extends React.Component {

  componentDidMount() {
    this.props.getReviews(this.props.post_id);
    console.log(this.props.post_id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.refresh !== this.props.refresh) {
      this.props.getReviews(this.props.post_id);
    }
  }

  render() {
    return (
      <div>
        <ReviewForm id={this.props.post_id} />
        <div className="review-container">
          {this.props.reviews &&
            this.props.reviews.map((review, index) => (
              <Review 
                review={review}
                key={index}
                post_id={this.props.post_id}
              />
            ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ reviewsReducer }) {
  return {
    reviews: reviewsReducer.reviews,
    error: reviewsReducer.error,
    refresh: reviewsReducer.refresh
  };
}

export default connect(
  mapStateToProps,
  { getReviews }
)(Reviews);