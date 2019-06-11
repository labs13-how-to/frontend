import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addStep } from '../../actions/steps-tagsActions';

class CreateStepForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post_id: 0,
            step_num: 0,
            title: '',
            instruction: '',
            img_url: '',
            vid_url: ''
        };
    }



    handleChange = e => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSumbit = async e => {
        console.log(this.state);
        e.preventDefault();
        await this.props.addStep(this.state);

        this.setState({
            step_num: 0,
            title: '',
            instruction: '',
            img_url: '',
            vid_url: ''
        })
        // setTimeout(() => this.props.history.push(`/posts/${this.props.id}`), 300);
    }

    render() {
        return (
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
        )
    }
}

function mapStateToProps({ projectsReducer }) {
    return {
        error: projectsReducer.error
    }
}

export default connect(
    mapStateToProps,
    {
        addStep
    }
)(CreateStepForm);