import React, { Fragment } from "react";
import { Progress } from "reactstrap";
import "./ReviewBars.scss";

const ReviewLabel = props => {
  if (props.stars === 1) {
    return <div className="review-label">1 star</div>;
  } else {
    return <div className="review-label">{props.stars} stars</div>;
  }
};

const ReviewCount = props => {
  return <div className="review-count">{props.ammount}</div>;
};

const ReviewBars = props => {
  const { stars, ammount, total } = props;
  return (
    <Fragment>
      <ReviewLabel stars={stars} />
      <Progress value={(ammount / total) * 100} color="orange" />
      <ReviewCount ammount={ammount} />
    </Fragment>
  );
};

export default ReviewBars;
