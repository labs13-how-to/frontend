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
                <h3 className='ps-section-header'>Add Steps, Instructions, and additional Photos/Videos here</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='title'
                            value={this.state.title}
                            name='title'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>instruction</Label>
                        <Input
                            type="textarea"
                            name='instruction'
                            onChange={this.handleChange}
                            value={this.state.instruction}
                            placeholder='content'></Input>

                    </FormGroup>
                    <FormGroup>
                        <Label>image(optional)</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='img_url'
                            value={this.state.img_url}
                            name='img_url'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Video(optional)</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='vid_url'
                            value={this.state.vid_url}
                            name='vid_url'
                        />
                    </FormGroup>

                    <Button type='submit'>Save</Button>
                </Form>
                <Button onClick={() => this.props.history.push(`/posts/${this.state.post_id}`)}>Done</Button>
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