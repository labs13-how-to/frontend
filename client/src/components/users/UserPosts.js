import React from 'react';
import { connect } from 'react-redux';
import { Card, CardText, CardBody, CardHeader, CardImg, Button } from 'reactstrap';
import { getUserPosts } from '../../actions';

class UserPosts extends React.Component {

    componentDidMount() {
        this.props.getUserPosts();
    };

    render() {
        return(
            <div className='post-list'>
                {this.props.posts.map(post => {
                    return (
                        <Card>
                            <CardImg src={post.img_url} alt="Card Image"/>
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

            </div>
        );
    };
};

function mapStateToProps({ projectsReducer }) {
    return {
        posts: projectsReducer.posts
        
    };
};




export default connect(mapStateToProps, { getUserPosts })(UserPosts);