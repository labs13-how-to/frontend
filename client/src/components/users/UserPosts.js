import React from 'react';
import { connect } from 'react-redux';
import { Card, CardText, CardBody, CardHeader, CardImg } from 'reactstrap';
import { getUserPosts } from '../../actions';

class UserPosts extends React.Component {

    componentDidMount() {
        this.props.getUserPosts();
    };

    render() {
        return(
            <div>
                <h2>Your Published Projects</h2>
               
                {this.props.posts.map(post => {
                    <Card>
                        <CardImg src={post.img_url} alt="Card Image"/>
                        <CardHeader>{post.title}</CardHeader>
                        <CardBody>
                            <CardText>{post.description}</CardText>
                            <CardText>difficulty: {post.difficulty}</CardText>
                            <CardText>duration: {post.duration} </CardText>
                            <CardText>skills: {post.skills}</CardText>
                            <CardText>supplies: {post.supplies}</CardText>
                        </CardBody>
                    </Card>
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