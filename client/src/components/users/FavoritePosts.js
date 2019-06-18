import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Card, CardText, CardBody, CardHeader, CardImg, Button } from 'reactstrap';
import { getUserPosts } from '../../actions';

class FavoritePosts extends React.Component {

    componentDidMount() {
        this.props.getUserPosts(this.props.match.params.id);
    };

    render() {
        return (
            <>
                <h1> Favorites </h1>
                <div className='post-list'>

                    {this.props.userPosts.map((post, i) => {
                        return (
                            <Card key={i}>
                                <CardImg src={post.img_url} alt="Card Image" />
                                <CardHeader>{post.title}</CardHeader>
                                <CardBody>
                                    <CardText>{post.difficulty}</CardText>
                                    <Button onClick={() => this.props.history.push(`/posts/${post.id}`)}>
                                        Learn More
                                </Button>
                                </CardBody>
                            </Card>
                        )
                    })}
                </div></>
        );
    };
};

function mapStateToProps({ projectsReducer }) {
    return {
        userPosts: projectsReducer.userPosts
    };
};




export default withRouter(connect(mapStateToProps, { getUserPosts })(FavoritePosts));