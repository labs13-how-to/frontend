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
        console.log(this.props.currPost)
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

    }



    handleChange = e => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSumbit = async e => {
        console.log(this.state);
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
        return (
            <>
            <PostStep/>
                <Form onSubmit={this.handleSumbit}>
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
        posts: projectsReducer.posts
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