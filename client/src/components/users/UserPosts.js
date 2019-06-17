import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Card, CardText, CardBody, CardHeader, CardImg, Button } from 'reactstrap';
import { getUserPosts } from '../../actions';

class UserPosts extends React.Component {

    componentDidMount() {
        console.log("this.props.match:", this.props.match)
        console.log("get user posts match:", this.props.getUserPosts(this.props.match.params.id))
        this.props.getUserPosts(this.props.match.params.id);
    };

    render() {
        return (
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
            </div>
        );
    };
};

function mapStateToProps({ projectsReducer }) {
    return {
        userPosts: projectsReducer.userPosts
    };
};




export default withRouter(connect(mapStateToProps, { getUserPosts })(UserPosts));