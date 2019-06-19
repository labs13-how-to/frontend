import React from 'react';
import Posts from './posts/Posts.js';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { Button } from "reactstrap";
import bathroomImg from '../images/checker-bathroom.png'
import iphone from '../images/iphone-img.png'
import austin from '../images/austin.png'
import patrick from '../images/patrick.png'
import meera from '../images/meera.png'
import angel from '../images/angel.png'
import nick from '../images/nick.png'
import matt from '../images/matt.png'
import MobileStoreButton from 'react-mobile-store-button';
import "../landingpage.scss"


class LandingPage extends React.Component {

    render() {
        const iOSurl = 'https://apps.apple.com/us/app/wikihow/id309209200'

        return (
            <React.Fragment>

                <div className='cta-content'>
                    <div className='p-and-btn'>
                        <p className='cta-text1'>Looking for the perfect DIY project?</p>
                        <p className='cta-text2'>Whether you’re looking to fix your toilet or to learn how to keep bees, you can find highly-rated solutions reviewed and tested by people like you.</p>
                        <div className='join-btn-div'>
                            <Button className="join-btn" href={`${process.env.REACT_APP_BE_URL}/auth/google`}>Join Now</Button>
                        </div>
                    </div>

                    <img className='bathroom-img' src={bathroomImg} alt='Checkered Bathroom'></img>
                </div>

                <div className='upper-content'>
                    <div className='upper-content-section'>
                        <h3>Browse</h3>
                        <p>Looking for a good project to take on? Browse highly-rated projects by category, or search and browse through tags and users!</p>
                    </div>
                    <div className='upper-content-section'>
                        <h3>Rate</h3>
                        <p>Here at <b>Review It Yourself</b>, we know it can be hard to find good DIY posts. Luckily our rating scale makes it easy for you to find the best projects reviewed and tested by people like you!</p>
                        <div className='join-btn2-div'>
                            <Button className="join-btn2" href={`${process.env.REACT_APP_BE_URL}/auth/google`}>Join Now</Button>
                        </div>
                    </div>
                    <div className='upper-content-section'>
                        <h3>Create</h3>
                        <p>Have an amazing project you want to share, or think you can do a better job than someone else?  Post it here and see how well it does!</p>
                        <div className='join-btn3-div'>
                            <Button className="join-btn3" href={`${process.env.REACT_APP_BE_URL}/auth/google`}>Join Now</Button>
                        </div>
                    </div>
                </div>

                <div className="middle-content">
                    <h2>Browse From Your Phone</h2>
                    <div className="middle-content-main">
                        <img className='iphone-img' src={iphone} alt='iPhone'></img>
                        <div className='middle-content-main2'>
                            <div className='middle-content-section'></div>
                            <h3>Easy Access</h3>
                            <p>Why stay tied down to your computer when you can keep your projects in your pocket? Our mobile applications lets you do just that. Click the button below to download our mobile app!</p>
                            <div className='middle-content-section'></div>
                            <h3>Browse From Your Phone</h3>
                            <p>Whether you’re commuting to work, or hanging out at the park, you can browse for new projects on our mobile app. Click the button below to download our mobile app!</p>
                            <div className='mobile-store'>
                                <MobileStoreButton
                                    store="ios"
                                    height='36px'
                                    width='131px'
                                    url={iOSurl}
                                    linkProps={{ title: 'iOS Store Button' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom-content">
                    <h2>Our Team</h2>
                    <div className="bottom-content-main">

                        <div className='bottom-content-section'>
                            <img className='angel-img' src={angel} alt='angel picture'></img>
                            <h3>Angel Buenrostro</h3>
                            <h4>iOS Developer</h4>
                            <p><b>Strengths</b>: Autolayout, Core Data, Networking I</p>
                            <p><b>Hobbies</b>: Photography, Videography, and After Effects Plugins</p>

                        </div>
                        <div className='bottom-content-section'>
                            <img className='patrick-img' src={patrick} alt='patrick picture'></img>
                            <h3>Patrick Steveson</h3>
                            <h4>Web Developer</h4>
                            <p><b>Strengths</b>: Backend Dev and Design Animations</p>
                            <p><b>Hobbies</b>: Backpacking and Canoeing</p>

                        </div>
                        <div className='bottom-content-section'>
                            <img className='nick-img' src={nick} alt='nick picture'></img>
                            <h3>Nick Stricker</h3>
                            <h4>Web Developer</h4>
                            <p><b>Strengths</b>: Databases, React, and being a Project Manager </p>
                            <p><b>Hobbies</b>: Playing the Piano, Dabbling with Virtual Reality</p>

                        </div>
                        <div className='bottom-content-section'>
                            <img className='matt-img' src={matt} alt='matt picture'></img>
                            <h3>Matt Poloni</h3>
                            <h4>Web Developer</h4>
                            <p><b>Strengths</b>: Designing Relational Databases, Backend Middleware, Refactoring code</p>
                            <p><b>Hobbies</b>: Reading nonfiction (mostly), and Playing Grand Strategy Games</p>

                        </div>
                        <div className='bottom-content-section'>
                            <img className='austin-img' src={austin} alt='austin picture'></img>
                            <h3>Austin James</h3>
                            <h4>Web Developer</h4>
                            <p><b>Strengths</b>: HTML, CSS, JavaScript, and Design</p>
                            <p><b>Hobbies</b>: Playing the Drums, Hanging at the Beach</p>

                        </div>
                        <div className='bottom-content-section'>
                            <img className='meera-img' src={meera} alt='meera picture'></img>
                            <h3>Meera Andersen</h3>
                            <h4>UX Designer</h4>
                            <p><b>Strengths</b>: User Research, User Testing, Prototyping</p>
                            <p><b>Hobbies</b>: Rock Climbing, Skiing, and Plant Keeping</p>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
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
)(LandingPage);