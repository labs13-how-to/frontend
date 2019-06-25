import React from 'react';
import { Card, CardText, CardBody, CardHeader, CardImg } from 'reactstrap';
import StarRatingComponent from "react-star-rating-component";


class Posts extends React.Component {
    state = {
        id: this.props.post.id
    }
    getDate(cardDate) {
        if (cardDate) {
            let currDate = cardDate.split('T')[0];
            currDate = currDate.split('-');
            return currDate;
        }

    }


    render() {
        const { title, img_url, id } = this.props.post
        const cardDate = this.getDate(this.props.post.created_at);
        return (
            < Card className='display-posts' onClick={() => this.props.history.push(`/posts/${id}`)
            }>
                <CardImg className="img-fluid" src={img_url} alt="Card image" />
                <CardHeader>{title}</CardHeader>
                <CardBody>
                    <StarRatingComponent
                        className="review-stars post-stars"
                        name="stars"
                        starCount={5}
                        value={Math.round(this.props.post.review_avg)}
                    />
                    <CardText className='review-count'>{`• \xa0`}{this.props.post.review_count}</CardText>
                </CardBody>
                <CardBody>
                    <div className='post-footer'>
                        {this.props.post.username && this.props.post.username.length > 16 ? this.props.post.username.slice(0, 16) + '...' : this.props.post.username}
                        {`\xa0 • \xa0`}
                        <CardText className='date-count'>{cardDate && `${cardDate[1][1]}/${cardDate[2]}/${cardDate[0]}`}</CardText>
                    </div>
                </CardBody>
            </Card >
        );
    }
};

export default Posts;