import React from 'react';
import "./Home.scss";
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import TagsSearch from './posts/TagsSearch';
import PostList from './posts/PostList.js';
import ExamplePost from '../images/example-post-img.png';


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
                    <div className='cta-text'>
                        <h2>Never made a How To post before? We'll help you learn how</h2>
                        <Button onClick={() => this.props.history.push('/posts/1')}>Learn How</Button>
                    </div>
                    <div className='cta-img'>
                        <img src={ExamplePost} alt='example'></img>
                    </div>

                </div>
                <div className='posts-section'>
                    <PostList history={this.props.history} isHome={true} />
                    <NavLink to='/posts' className='posts-button'>See More</NavLink>
                </div>
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