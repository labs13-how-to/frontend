import React from 'react';
import { Card, CardText, CardBody, CardHeader, CardImg } from 'reactstrap';
import StarRatingComponent from "react-star-rating-component";

class UserPosts extends React.Component {


    render() {

        return (
            <div className='post-list'>
                {this.props.userPosts.map((post, i) => {
                    const cardDate = post.created_at.split('T')[0].split('-')
                    return (
                        <Card className='display-posts' onClick={() => this.props.history.push(`/posts/${post.id}`)} key={i}>
                            <CardImg className="img-fluid" src={post.img_url} alt="Card Image" />
                            <CardHeader>{post.title && post.title.length > 40 ? post.title.slice(0, 40) + '...' : post.title}</CardHeader>
                            <CardBody>
                                <StarRatingComponent
                                    className="review-stars post-stars"
                                    name="stars"
                                    starCount={5}
                                    value={Math.round(post.review_avg)}
                                />
                                <CardText className='review-count'>{`• \xa0`}{post.review_count}</CardText>
                            </CardBody>
                            <CardBody>
                                <div className='post-footer'>
                                    {post.username}
                                    {`\xa0 • \xa0`}
                                    <CardText className='date-count'>{cardDate && `${cardDate[1][1]}/${cardDate[2]}/${cardDate[0]}`}</CardText>
                                </div>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
        );
    };
};

export default (UserPosts);