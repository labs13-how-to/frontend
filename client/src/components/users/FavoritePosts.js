import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Card, CardText, CardBody, CardHeader, CardImg } from 'reactstrap';
import { getUserPosts, getPosts } from '../../actions';
import StarRatingComponent from "react-star-rating-component";

class FavoritePosts extends React.Component {

    componentDidMount() {
        this.props.getPosts();
    };

    render() {
        const userPosts = this.props.posts.filter((post) => post.created_by === this.props.match.params.id)
        return (
            <div className='post-list'>
                {userPosts.map((post, i) => {
                    const cardDate = post.created_at.split('T')[0].split('-')
                    return (
                        <Card className='display-posts' onClick={() => this.props.history.push(`/posts/${post.id}`)} key={i}>
                            <CardImg className="img-fluid" src={post.img_url} alt="Card Image" />
                            <CardHeader>{post.title}</CardHeader>
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

function mapStateToProps({ projectsReducer }) {
    return {
        userPosts: projectsReducer.userPosts,
        posts: projectsReducer.posts,
    };
};


export default withRouter(connect(mapStateToProps, { getUserPosts, getPosts })(FavoritePosts));