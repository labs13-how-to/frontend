import React from 'react';


const Home = props => {
    return (
        <React.Fragment>
            <h2>Posts</h2>
            <div className="list">
                {props.posts.map((post, index) => (<div key={post}>{post}</div>))}
            </div>
        </React.Fragment>
    );
};

export default Home;