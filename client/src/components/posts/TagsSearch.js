import React from 'react';
import queryString from 'query-string';
import Posts from './Posts.js';
import { connect } from 'react-redux';
import { getPosts } from '../../actions';
import { getTag } from '../../actions/steps-tagsActions';
import { NavLink } from 'react-router-dom';


class TagSearch extends React.Component {
    state = {
        toLong: false
    }
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        // Grabs query string out of URL params
        const query = this.props.query ? this.props.query : queryString.parse(this.props.location.search).q;

        return (
            <div className='posts-section'>
                <h2 className='posts-head' onClick={() => this.props.history.push(`/categories/search?q=${query}`)}>{query}</h2>
                <div className='post-list'>
                    {this.props.posts.reduce((posts, post, index) => {

                        // Checks if a post title exists w/ query string, ignoring case
                        // if (this.props.isHome && posts == []) if (posts.length > 6) return null;
                        if (post.tags && post.tags.reduce((acc, tag, index) => tag.name.toLowerCase() === query.toLowerCase() ? true : acc, false)) {
                            if (this.props.isHome && posts.length > 5) {
                                this.state.toLong = true;
                                return posts;
                            }
                            return [
                                ...posts,
                                (<Posts
                                    post={post}
                                    key={index}
                                    history={this.props.history}
                                />)
                            ]
                        } else {
                            return posts
                        }

                    }, []
                    )}
                </div>
                {this.props.isHome && this.state.toLong ? <NavLink className='posts-button' to={`/categories/search?q=${query}`}>See More</NavLink> : null}
            </div>
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