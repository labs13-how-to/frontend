import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addStep } from '../../actions/steps-tagsActions';
import { getPost, getPosts } from '../../actions/index';
import PostStep from './PostStep';

class CreateStepForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.match.params.id,
            step_num: 1,
            title: '',
            instruction: '',
            img_url: '',
            vid_url: ''
        };
    }

    componentDidMount() {
        this.props.getPost(this.state.post_id)
        console.log("CURR POST", this.props.currPost)
        if (this.props.currPost.length)
            this.setState({
                step_num: this.props.currPost.steps.length + 1
            })
    }
    componentDidUpdate(prevProps, prevS) {

        if (this.props.currPost)
            if (prevProps.currPost === undefined) {
                this.setState({
                    step_num: this.props.currPost.steps.length + 1
                })
            } else if (prevProps.currPost.steps !== this.props.currPost.steps) {
                this.setState({
                    step_num: this.props.currPost.steps.length + 1
                })
            }

            if (prevProps.refresh !== this.props.refresh) {
                this.props.getPost(this.state.post_id)
            };

    }

    handleChange = e => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        console.log("THIS STATE", this.state);
        console.log("THIS STATE POST ID", this.state.post_id);
        e.preventDefault();
        await this.props.addStep(this.state.post_id, this.state);

        this.setState({
            step_num: this.state.step_num + 1,
            title: '',
            instruction: '',
            img_url: '',
            vid_url: ''
        })

        console.log(this.props.currPost)
        setTimeout(() => this.props.getPost(this.state.post_id), 300);
    }

    render() {
        const {steps} = this.props.currPost;
        return (
            <>
                {steps && steps.map((step, index) => {
                    return (
                        <PostStep
                            key={index}
                            step={step}
                            index={index}
                            location={this.props.location}
                        />
                    )
                })}
                <h3 className='psf-section-header'>Add Steps, Instructions, and additional Photos/Videos here</h3>
                <div className='psf-container'>
                    <Form className='psf' onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label>Step Title</Label>
                            <Input
                                className="psf-title-input"
                                onChange={this.handleChange}
                                placeholder='What do you want to name this step?'
                                value={this.state.title}
                                name='title'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Instruction</Label>
                            <Input
                                type="textarea"
                                name='instruction'
                                onChange={this.handleChange}
                                value={this.state.instruction}
                                placeholder='Write your instructions here'
                                rows="4"
                            />
                        </FormGroup>
                        <div className="psf-media">
                            <FormGroup className="psf-img">
                                <Label>Image(optional)</Label>
                                <Input
                                    onChange={this.handleChange}
                                    placeholder='Image URL'
                                    value={this.state.img_url}
                                    name='img_url'
                                />
                            </FormGroup>
                            <FormGroup className="psf-vid">
                                <Label>Video(optional)</Label>
                                <Input
                                    onChange={this.handleChange}
                                    placeholder='Video Url'
                                    value={this.state.vid_url}
                                    name='vid_url'
                                />
                            </FormGroup>
                        </div>
                        <div className="psf-button-container">
                            <Button className="psf-button" type='submit'>Add Step</Button>
                            
                        </div>
                    </Form>
                </div>
                <div className='publish-button'>
                    <Button className="psf-button" onClick={() => this.props.history.push(`/posts/${this.state.post_id}`)}>Publish</Button>
                </div>
            </>
        )
    }
}

function mapStateToProps({ projectsReducer }) {
    return {
        error: projectsReducer.error,
        currPost: projectsReducer.currPost,
        posts: projectsReducer.posts,
        refresh: projectsReducer.refresh,
    }
}

export default connect(
    mapStateToProps,
    {
        addStep,
        getPost,
        getPosts
    }
)(CreateStepForm);