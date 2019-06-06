import React from 'react';
import Posts from './posts/Posts.js';
import { connect } from 'react-redux';
import { getPosts } from '../actions';


class Home extends React.Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <React.Fragment>
                <h2>Posts</h2>
                <div className='post-list'>
                    {this.props.posts.map((post, index) =>
                        <Posts
                            post={post}
                            key={index}
                            history={this.props.history}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }

};

function mapStateToProps({ projectsReducer }) {
    return {
        posts: projectsReducer.posts
    }
}

export default connect(
    mapStateToProps,
    {
        getPosts
    }
)(Home);