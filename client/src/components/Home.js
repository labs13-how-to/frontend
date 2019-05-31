import React from 'react';


const Home = props => {
    return (
        <React.Fragment>
            <h2>Projects</h2>
            <div className="list">
                {props.projects.map((project, index) => (<div key={project}>{project}</div>))}
            </div>
        </React.Fragment>
    );
};

export default Home;