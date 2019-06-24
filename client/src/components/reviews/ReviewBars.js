import React from "react";
import ReviewBar from "./ReviewBar";
import "./ReviewBars.scss";

const calcRev = arr => {
  const result = [];
  for (let i = 0; i <= 5; i++) {
    result.push(arr.filter(review => review.rating === i).length);
  }
  return result;
};

const ReviewBars = props => {
  const { reviews } = props;
  const calcd = calcRev(reviews);

  return (
    <div className="bar-container">
      <div className="bar-grid">
        <ReviewBar stars={5} total={reviews.length} ammount={calcd[5]} />
        <ReviewBar stars={4} total={reviews.length} ammount={calcd[4]} />
        <ReviewBar stars={3} total={reviews.length} ammount={calcd[3]} />
        <ReviewBar stars={2} total={reviews.length} ammount={calcd[2]} />
        <ReviewBar stars={1} total={reviews.length} ammount={calcd[1]} />
      </div>
    </div>
  );
};

export default ReviewBars;
