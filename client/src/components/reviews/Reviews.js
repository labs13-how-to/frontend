import React from "react";
import { connect } from "react-redux";
import { getReviews, getUsers } from "../../actions";
import { Card, CardText, CardBody, CardHeader } from "reactstrap";


class Reviews extends React.Component {
   
    componentDidMount() {
        this.props.getReviews(this.props.post_id);
    };

    render() {
        return (
            <div>
                {this.props.reviews.map((review, index) => {
                    return (
                        <Card key={index}>
                            <CardHeader>{review.username}</CardHeader>
                            <CardBody>
                                <CardText>{review.rating}</CardText>
                                <CardText>{review.review}</CardText>
                            </CardBody>
                            {/* need something for up/down votes */}
                        </Card>)
                })}
            </div>
            
        );
    };
};

function mapStateToProps({ reviewsReducer, usersReducer }) {
    return {
        reviews: reviewsReducer.reviews,
        error: reviewsReducer.error,
        user: usersReducer.user
    };
};

export default connect(mapStateToProps, {getReviews, getUsers})(Reviews);