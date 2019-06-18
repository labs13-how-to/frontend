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
            created_by: 0,
            dropdownOpen: false,
        };
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

    handleSumbit = async e => {
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
            created_by: 0,
        })
        console.log(this.props.addId);

        setTimeout(() => this.props.history.push(`/forms/post/edit/${this.props.addId}`), 600);
    }

    render() {
        return (
            <>
                <Form className = "post-form" onSubmit={this.handleSumbit}>
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
                                    <Form>
                                        <FormGroup>
                                            <Label for="exampleSelectMulti">Select Tags</Label>
                                            <Input onChange={this.handleChange} type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                                {this.props.allTags ? this.props.allTags.map(tag => <option key={tag.id} value={tag.name.toLowerCase()}>{tag.name}</option>) : null}
                                            </Input>
                                        </FormGroup>
                                    </Form>
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
                            onChange={this.handleChange}
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