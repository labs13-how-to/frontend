import React from 'react';
import "./Home.scss";
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import TagsSearch from './posts/TagsSearch';
import PostList from './posts/PostList.js';


class Home extends React.Component {

    componentDidMount() {
        this.props.getPosts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.refresh !== this.props.refresh) {
            this.props.getPosts();
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='cta'>

                </div>
                <PostList history={this.props.history} isHome={true} />
                <TagsSearch history={this.props.history} query={'Gardening'} isHome={true} />
                <TagsSearch history={this.props.history} query={'Outdoors'} isHome={true} />
                <TagsSearch history={this.props.history} query={'Automotive'} isHome={true} />
            </React.Fragment>
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
)(Home);