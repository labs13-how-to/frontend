import React from 'react';
import Posts from './posts/Posts.js';


const Home = props => {
    return (
        <React.Fragment>
            <h2>Posts</h2>
            <div className='post-list'>
                {props.posts.map((post, index) =>
                    <Posts
                        post={post}
                        key={index}
                        history={props.history}
                        match={props.match}
                        getPost={props.getPost}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export default Home;