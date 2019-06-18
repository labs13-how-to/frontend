import React from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addPost } from '../../actions';

class CreatePostForm extends React.Component {
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
            created_by: '',
        };
    }
    componentDidMount() {
        this.hydrateStateWithLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        // if the key exists in localStorage
        if (!this.state.created_by) {
            // get the key's value from localStorage
            const id = localStorage.getItem('user_id');
            console.log("ID:", id)
            try {
                console.log("ID", id);
                this.setState({ created_by: `${id}` });
            } catch (e) {
                // handle empty string
                this.setState({ created_by: `${id}` });
            }
        }

    }


    handleChange = e => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        console.log(this.state);
        e.preventDefault();
        await this.props.addPost(this.state)
        this.setState({
            title: '',
            img_url: '',
            description: '',
            difficulty: '',
            duration: '',
            skills: '',
            supplies: '',
            created_by: '',
        })


        setTimeout(() => this.props.history.push(`/forms/post/${this.props.addId}/steps`), 600);
    }

    render() {
        return (
            <>
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
                    <FormGroup>
                        <Label></Label>
                        <Input
                            type="number"
                            onChange={this.handleChange}
                            placeholder='created_by'
                            value={this.state.created_by}
                            name='created_by'
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
        addId: projectsReducer.addId
    }
}

export default connect(
    mapStateToProps,
    {
        addPost
    }
)(CreatePostForm);