import React from 'react';
import { Button } from 'reactstrap';
import './Protected.scss';

const PostList = (props) => {


    return (
        <>
            <h1>this is a Restricted Route</h1>
            {window.localStorage.getItem('user_id') && window.localStorage.getItem('jwt') ?
                <div className='join-btn-div-mobile'>
                    <Button className="join-btn join-btn-mobile" href={`/`}>Home</Button>
                </div>
                : <div className='join-btn-div-mobile'>
                    <Button className="join-btn join-btn-mobile" href={`${process.env.REACT_APP_BE_URL}/auth/google`}>Join Now</Button>
                </div>
            }

        </>
    );

};

export default PostList;