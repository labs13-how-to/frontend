import React from 'react';
import "./animation.scss"

const Animation = (props) => {
    const source = props.vid_url && props.vid_url.split("v=")[1]

    return (
        <div className="video-container">
            <iframe 
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${source}`}
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            />
        </div>
    )
};

export default Animation;