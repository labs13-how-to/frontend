import React from 'react';
import "./Home.scss";
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import TagsSearch from './posts/TagsSearch';
import PostList from './posts/PostList.js';
import ExamplePost from '../images/bike_cta.png';
import Fade from 'react-reveal/Fade';



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardAmount: 5,
            isDesktop: false,
        }
        this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentDidMount() {
        this.setState({ isDesktop: window.innerWidth > 768 })
        this.props.getPosts();
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.refresh !== this.props.refresh) {
            this.props.getPosts();
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 768 });
        setTimeout(() => {
            if (this.state.isDesktop) {
                this.setState({ cardAmount: 5 })
            } else {
                this.setState({ cardAmount: 1 })
            }
        }, 10);

    }

    render() {
        console.log(this.state.cardAmount)
        const isDesktop = this.state.isDesktop;
        return (

            <React.Fragment>

                <div className='cta'>
                    <div className='cta-text'>

                        <h2>Never made a how to post before? We'll help you learn how</h2>

                        <Button onClick={() => this.props.history.push('/posts/1')}>Learn How</Button>
                    </div>


                    <div className='cta-img'>
                        <Fade>
                            <img src={ExamplePost} alt='example'></img>
                        </Fade>
                    </div>


                </div>

                <div className='posts-section'>
                    <PostList history={this.props.history} isHome={true} cardAmount={this.state.cardAmount} />
                    <NavLink to='/posts' className='posts-button'>See More</NavLink>
                </div>
                <TagsSearch history={this.props.history} query={'Apparel'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Appliances'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Art'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Automotive'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Baby'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Beauty'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Cooking'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Crafts'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Electronics'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Furniture'} isHome={true} cardAmount={this.state.cardAmount} />
                <TagsSearch history={this.props.history} query={'Gardening'} isHome={true} cardAmount={this.state.cardAmount} />
                {isDesktop && <TagsSearch history={this.props.history} query={'Home Improvement'} isHome={true} cardAmount={this.state.cardAmount} />}
                {isDesktop && <TagsSearch history={this.props.history} query={'Outdoors'} isHome={true} cardAmount={this.state.cardAmount} />}
                {isDesktop && <TagsSearch history={this.props.history} query={'Pets'} isHome={true} cardAmount={this.state.cardAmount} />}
                {isDesktop && <TagsSearch history={this.props.history} query={'Toys'} isHome={true} cardAmount={this.state.cardAmount} />}
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