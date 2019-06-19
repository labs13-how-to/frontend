import React from 'react';
import Posts from './Posts.js';
import { connect } from 'react-redux';
import { getPosts } from '../../actions';


class PostList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.getPosts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.refresh !== this.props.refresh) {
            this.props.getPosts();
        }
    }

    render() {
        console.log(this.props)
        return (
            <>
                <h2 className='posts-head' onClick={() => this.props.history.push('/posts')}>{this.props.isHome ? 'Trending' : 'Posts'}</h2>
                <div className='post-list'>
                    {this.props.posts.sort((a, b) => (a.review_count > b.review_count) ? -1 : 1).map((post, index) => {
                        if (this.props.isHome && index > 5) return null;

                        return <Posts
                            post={post}
                            key={index}
                            history={this.props.history}
                        />

                    })}

                </div>
            </>
        );
    }
};

function mapStateToProps({ projectsReducer }) {
    return {
        posts: projectsReducer.posts,
        refresh: projectsReducer.refresh
    }
}

export default connect(
    mapStateToProps,
    {
        getPosts
    }
)(PostList);