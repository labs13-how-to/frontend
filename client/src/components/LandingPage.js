import React from 'react';
// import Posts from './posts/Posts.js';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { Button } from "reactstrap";
import bathroomImg from '../images/checker-bathroom.png'
import mobileLogo from '../images/mobile-logo.jpg'
import categoryExample from '../images/category-example.jpg'
import postExample from '../images/post-example.jpg'
import reviewExample from '../images/review-example.jpg'
import iphone from '../images/iphone-img.png'
import austin from '../images/austin.png'
import patrick from '../images/patrick.png'
import meera from '../images/meera.png'
import angel from '../images/angel.png'
import nick from '../images/nick.png'
import matt from '../images/matt.png'
import MobileStoreButton from 'react-mobile-store-button';
// import NavSearchMobile from './navbar/NavSearch.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
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
                    <img className='checkered-bathroom-img' src={bathroomImg} alt='Checkered Bathroom'></img>
                </div>

                <div className='cta-content-mobile'>

                    <div className='p-and-btn-mobile'>
                        <h1>- Review It Yourself -</h1>
                        <h2>The easiest way to find highly-rated DIY Projects</h2>
                        <div className='join-btn-div-mobile'>
                            <Button className="join-btn-mobile" href={`${process.env.REACT_APP_BE_URL}/auth/google`}>Join Now</Button>
                        </div>
                    </div>
                </div>

                <div className='upper-content'>
                    <img className='mobile-logo' src={mobileLogo} alt='Mobile Logo'></img>
                    <div className='upper-content-section' id='one'>
                        <div className='img-content'>
                            <img className='category-example' src={categoryExample} alt='category'></img>
                        </div>
                        <div className='text-content'>
                            <h3>Browse</h3>
                            <p>Looking for a good project to take on? Browse highly-rated projects by category, or search and browse through tags and users!</p>
                        </div>
                    </div>
                    <div className='upper-content-section' id='two'>
                        <div className='img-content'>
                            <img className='review-example' src={reviewExample} alt='review'></img>
                        </div>
                        <div className='text-content'>
                            <h3>Rate</h3>
                            <p>Here at <b>Review It Yourself</b>, we know it can be hard to find good DIY posts. Luckily our rating scale makes it easy for you to find the best projects reviewed and tested by people like you!</p>
                        </div>
                    </div>
                    <div className='upper-content-section' id="three">
                        <div className='img-content'>
                            <img className='post-example' src={postExample} alt='post'></img>
                        </div>
                        <div className='text-content'>
                            <h3>Create</h3>
                            <p>Have an amazing project you want to share, or think you can do a better job than someone else?  Post it here and see how well it does!</p>
                        </div>
                    </div>

                    <div className='join-btn2-div'>
                        <Button className="join-btn2" href={`${process.env.REACT_APP_BE_URL}/auth/google`}>Join Now</Button>
                    </div>
                    <div className='join-btn3-div'>
                        <Button className="join-btn3" href={`${process.env.REACT_APP_BE_URL}/auth/google`}>Join Now</Button>
                    </div>
                </div>

                <div className="middle-content">
                    <h2>Browse From Your Phone</h2>
                    <div className="middle-content-main">
                        <div className="iphone-div">
                        <img className='iphone-img' src={iphone} alt='iPhone'></img>
                        </div>
                        <div className='middle-content-main2'>
                            <div className='middle-content-section'></div>
                            <h3>Easy Access When You Need It</h3>
                            <p>Why stay tied down to your computer when you can keep your projects in your pocket? Our mobile applications lets you do just that. Click the button below to download our mobile app!</p>
                            <div className='middle-content-section'></div>
                            <h3>Browse From Your Phone</h3>
                            <p>Whether you’re commuting to work, or hanging out at the park, you can browse for new projects on our mobile app. Click the button below to download our mobile app!</p>
                            <div className='mobile-store'>
                                <MobileStoreButton
                                    className="mobile-store-btn"
                                    store="ios"
                                    height={36}
                                    width={131}
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

                        <div className='bottom-content-section' id="angel">
                            <div className='about-img'>
                            <img className='profile-img' src={angel} alt='angel'></img>
                            </div>
                            <div className="about-info">
                            <h3>Angel Buenrostro</h3>
                            <h4>iOS Developer</h4>
                            <a href="https://github.com/angelbuenrostro">
                            <FontAwesomeIcon icon={faGithubSquare} size={'2x'} style={{marginRight: '20px'}} />
                            </a>
                            <FontAwesomeIcon icon={faLinkedin} size={'2x'} color="#0073ae" />
                            </div>
                            

                        </div>
                        <div className='bottom-content-section' id="patrick">
                            <div className='about-img'>
                            <img className='profile-img' src={patrick} alt='patrick'></img>
                            </div>
                             <div className="about-info">
                            <h3>Patrick Steveson</h3>
                            <h4>Web Developer</h4>
                            <a href="https://github.com/Mrsteveson">
                            <FontAwesomeIcon icon={faGithubSquare} size={'2x'} style={{marginRight: '20px'}} />
                            </a>
                            <FontAwesomeIcon icon={faLinkedin} size={'2x'} color="#0073ae" />
                            </div>

                        </div>
                        <div className='bottom-content-section' id="nick">
                            <div className='about-img'>
                            <img className='profile-img' src={nick} alt='nick'></img>
                            </div>
                             <div className="about-info">
                            <h3>Nick Stricker</h3>
                            <h4>Web Developer</h4>
                            <a href="https://github.com/NickStrick">
                            <FontAwesomeIcon icon={faGithubSquare} size={'2x'} style={{marginRight: '20px'}}  />
                            </a>
                            <FontAwesomeIcon icon={faLinkedin} size={'2x'} color="#0073ae" />
                            </div>

                        </div>
                        <div className='bottom-content-section' id="matt">
                            <div className='about-img'>
                            <img className='profile-img' src={matt} alt='matt'></img>
                            </div>
                             <div className="about-info">
                            <h3>Matt Poloni</h3>
                            <h4>Web Developer</h4>
                            <a href="https://github.com/matt-poloni">
                            <FontAwesomeIcon icon={faGithubSquare} size={'2x'} style={{marginRight: '20px'}}/>
                            </a>
                            <FontAwesomeIcon icon={faLinkedin} size={'2x'} color="#0073ae" />
                            </div>

                        </div>
                        <div className='bottom-content-section' id="austin">
                            <div className='about-img'>
                            <img className='profile-img' src={austin} alt='austin'></img>
                            </div>
                             <div className="about-info">
                            <h3>Austin James</h3>
                            <h4>Web Developer</h4>
                            <a href="https://github.com/AJLambda">
                            <FontAwesomeIcon icon={faGithubSquare} size={'2x'} style={{marginRight: '20px'}} />
                            </a>
                            <FontAwesomeIcon icon={faLinkedin} size={'2x'} color="#0073ae" />
                            </div>

                        </div>
                        <div className='bottom-content-section'>
                            <div className='about-img'>
                            <img className='profile-img' src={meera} alt='meera'></img>
                            </div>
                             <div className="about-info">
                            <h3>Meera Andersen</h3>
                            <h4>UX Designer</h4>
                            <a href="https://github.com/meera-andersen">
                            <FontAwesomeIcon icon={faGithubSquare} size={'2x'} style={{marginRight: '20px'}} />
                            </a>
                            <a href="https://www.linkedin.com/in/meera-andersen-6a57a0178/">
                            <FontAwesomeIcon icon={faLinkedin} size={'2x'} color="#0073ae" />
                            </a>
                            </div>

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