import React from 'react';
import queryString from 'query-string';
import Posts from './Posts.js';
import { connect } from 'react-redux';
import { getPosts } from '../../actions';
import { getTag } from '../../actions/steps-tagsActions';


class TagSearch extends React.Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        // Grabs query string out of URL params
        const query = queryString.parse(this.props.location.search).q;
        console.log(query.toLowerCase())
        console.log('POSTS', this.props.posts)
        return (
            <React.Fragment>
                <h2>"{query}" Posts</h2>
                <div className='post-list'>
                    {this.props.posts.reduce((posts, post, index) => {
                        // Checks if a post title exists w/ query string, ignoring case
                        return post.tags && post.tags.reduce((acc, tag) => tag.name.toLowerCase() === query.toLowerCase() ? true : acc, false)
                            ? [
                                ...posts,
                                (<Posts
                                    post={post}
                                    key={index}
                                    history={this.props.history}
                                />)
                            ]
                            : posts
                    }, []
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
        getPosts,
        getTag
    }
)(TagSearch);