import React from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { updatePost, getPost } from '../../actions';

class EditPostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            img_url: '',
            description: '',
            difficulty: '',
            duration: '',
            skills: '',
            supplies: '',
            created_by: 0,
            id: Number(this.props.match.params.id)
        };
    }

    componentDidMount() {

        this.props.getPost(this.state.id)
        if (this.props.currPost.title) {
            const {
                title, img_url, description,
                difficulty, duration, skills,
                supplies, created_by
            } = this.props.currPost
            this.setState({
                title: title,
                img_url: img_url,
                description: description,
                difficulty: difficulty,
                duration: duration,
                skills: skills,
                supplies: supplies,
                created_by: created_by,
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currPost.title !== this.props.currPost.title) {
            const {
                title, img_url, description,
                difficulty, duration, skills,
                supplies, created_by
            } = this.props.currPost
            this.setState({
                title: title,
                img_url: img_url,
                description: description,
                difficulty: difficulty,
                duration: duration,
                skills: skills,
                supplies: supplies,
                created_by: created_by,
            })
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSumbit = async e => {
        e.preventDefault();
        const stateObj = { ...this.state };
        let updatedObj = {}
        for (var property in stateObj) {
            if (stateObj[property] !== this.props.currPost[property]) {
                updatedObj = { ...updatedObj, [property]: stateObj[property] }
            }
        }
        await this.props.updatePost(this.state.id, updatedObj)

        setTimeout(() => this.props.history.push(`/posts/${this.state.id}`), 400);
    }

    render() {

        return (
            <>
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
                        <Label>image</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='img_url'
                            value={this.state.img_url}
                            name='img_url'
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>description</Label>
                        <Input
                            type="textarea"
                            name='description'
                            onChange={this.handleChange}
                            value={this.state.description}
                            placeholder='content'></Input>

                    </FormGroup>
                    <FormGroup>
                        <Label>difficulty</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='difficulty'
                            value={this.state.difficulty}
                            name='difficulty'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>duration</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='duration'
                            value={this.state.duration}
                            name='duration'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>skills</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='skills'
                            value={this.state.skills}
                            name='skills'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>supplies</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='supplies'
                            value={this.state.supplies}
                            name='supplies'
                        />
                    </FormGroup>

                    <Button type='submit'>Save</Button>
                </Form>
                <Route path="/one" render={props => (
                    <>
                        <h1>New Route!!!</h1>
                    </>
                )}
                />
            </>
        )
    }
}

function mapStateToProps({ projectsReducer }) {
    return {
        error: projectsReducer.error,
        message: projectsReducer.message,
        currPost: projectsReducer.currPost
    }
}

export default connect(
    mapStateToProps,
    {
        updatePost,
        getPost
    }
)(EditPostForm);