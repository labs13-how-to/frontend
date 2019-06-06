import React from 'react';
import queryString from 'query-string';
import Posts from './Posts.js';
import { connect } from 'react-redux';
import { getPosts } from '../../actions';


class Home extends React.Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const query = queryString.parse(this.props.location.search).q;
        console.log('QUERY',query)

        return (
            <React.Fragment>
                <h2>Search results for "{query}"</h2>
                <div className='post-list'>
                    {this.props.posts.reduce((posts, post, index) => {
                        return post.title && post.title.toLowerCase().includes(query.toLowerCase())
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
        getPosts
    }
)(Home);