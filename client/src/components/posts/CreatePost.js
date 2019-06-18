import React from 'react';
import { connect } from 'react-redux';
import { 
    Button, Form, FormGroup, Label, Input,
    DropdownToggle, DropdownMenu,
    DropdownItem, InputGroupButtonDropdown } from 'reactstrap';
import { addPost } from '../../actions';
import "../../postform.scss";

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
            dropdownOpen: false,
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
    
    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    handleChange = e => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        const newPost = {
            title: this.state.title,
            img_url: this.state.img_url,
            description: this.state.description,
            difficulty: this.state.difficulty,
            duration: this.state.duration,
            skills: this.state.skills,
            supplies: this.state.supplies,
            created_by: this.state.created_by,
        }
        console.log('before submit', newPost);
        e.preventDefault();
        await this.props.addPost(newPost)

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

        console.log(this.props.addId)
        setTimeout(() => this.props.history.push(`/forms/post/edit/${this.props.addId}`), 2000);
    }

    render() {
        return (
            <>
                <Form className = "post-form" onSubmit={this.handleSubmit}>
                    <FormGroup className = "pf-title">
                        <Label>Title</Label>
                        <Input
                            className="pf-title-input"
                            onChange={this.handleChange}
                            placeholder='What do you want to name your project?'
                            value={this.state.title}
                            name='title'
                        />
                    </FormGroup>
                    <FormGroup className = "pf-img">
                        <Label>Main Image</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Image URL'
                            value={this.state.img_url}
                            name='img_url'
                        />
                    </FormGroup>
                    <p>Tags</p>
                    <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                        <DropdownToggle split outline />
                        <DropdownMenu>
                            <DropdownItem>
                                <FormGroup>
                                    <Label for="exampleSelectMulti">Select Tags</Label>
                                    <Input onChange={this.handleChange} type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                        {this.props.allTags ? this.props.allTags.map(tag => <option key={tag.id} value={tag.name.toLowerCase()}>{tag.name}</option>) : null}
                                    </Input>
                                </FormGroup>
                            </DropdownItem>
                        </DropdownMenu>
                    </InputGroupButtonDropdown>

                    <FormGroup className = "pf-description">
                        <Label>Introduction</Label>
                        <Input
                            type="textarea"
                            name='description'
                            onChange={this.handleChange}
                            value={this.state.description}
                            placeholder='Please Provide an Introduction to this Project'
                            rows="8"
                        />
                    </FormGroup>
                    <FormGroup className = "pf-difficulty">
                        <Label>Difficulty</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Select Difficulty'
                            value={this.state.difficulty}
                            name='difficulty'
                        />
                    </FormGroup>
                    <FormGroup className = "pf-duration">
                        <Label>Duration</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Estimated Time to Complete'
                            value={this.state.duration}
                            name='duration'
                        />
                    </FormGroup>
                    <FormGroup className = "pf-skills">
                        <Label>Prerequisite Skills</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Skills Needed for this Project'
                            value={this.state.skills}
                            name='skills'
                        />
                    </FormGroup>
                    <FormGroup className = "pf-supplies">
                        <Label>Tools/Supplies</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Necessary Supplies'
                            value={this.state.supplies}
                            name='supplies'
                        />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label></Label>
                        <Input
                            type="number"
                            placeholder='created_by'
                            value={this.state.created_by}
                            name='created_by'
                        />
                    </FormGroup> */}
                    <div className="pf-button-container">
                        <Button className="pf-button" type='submit'>Save</Button>
                    </div>
                </Form>
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