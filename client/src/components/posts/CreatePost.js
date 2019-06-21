import React from 'react';
import { connect } from 'react-redux';
import {
    Button, Form, FormGroup, Label, Input,
    DropdownToggle, DropdownMenu,
    DropdownItem, InputGroupButtonDropdown
} from 'reactstrap';
import { addPost } from '../../actions';
import { addTag, getTag } from '../../actions/steps-tagsActions';
import "../../postform.scss";

class CreatePostForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleDifficulty = this.toggleDifficulty.bind(this);
        this.state = {
            title: '',
            img_url: '',
            vid_url: '',
            description: '',
            difficulty: '',
            duration: '',
            skills: '',
            supplies: '',
            created_by: '',
            dropdownOpen: false,
            difficultyDropdown: false,
            tags: [],
        };
    }
    componentDidMount() {
        this.hydrateStateWithLocalStorage();
        this.props.getTag();
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
    toggleDifficulty() {
        this.setState({
            difficultyDropdown: !this.state.difficultyDropdown
        });
    };

    handleChange = e => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };
    handleTagsChange = e => {
        // this.setState({ tag: e.target.value });
        const tagId = this.props.allTags.filter((tag) => e.target.value === tag.name.toLowerCase() && tag.id)
        const isTagged = this.state.tags.filter(tag => e.target.value === tag.name.toLowerCase())
        // const newTag = { post_id: this.state.id, tag_id: tagId[0].id };
        const newTag = { tag_id: tagId[0].id, name: e.target.value };
        console.log('isTagged', isTagged)
        console.log('newtag', newTag)
        if (!isTagged.length) {
            this.setState({ tags: [...this.state.tags, newTag] })
        } else {
            const filteredAry = this.state.tags.filter(tag => tag.tag_id !== newTag.tag_id)
            console.log(filteredAry)
            this.setState({ tags: filteredAry })
        }


    };

    handleSubmit = async e => {
        const newPost = {
            title: this.state.title,
            img_url: this.state.img_url,
            vid_url: this.state.vid_url,
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
            vid_url: '',
            description: '',
            difficulty: '',
            duration: '',
            skills: '',
            supplies: '',
            created_by: '',
        })

        console.log(this.props.addId)
        setTimeout(() => {
            this.state.tags.forEach((tag) => {
                const newTag = { tag_id: tag.tag_id, post_id: this.props.addId }
                this.props.addTag(newTag);
            })
            this.props.history.push(`/forms/post/edit/${this.props.addId}`)
        }, 300);
    }

    render() {
        console.log(this.state.tags)
        return (
            <div className="pf-container">
                <Form className="post-form" onSubmit={this.handleSubmit}>
                    <FormGroup className="pf-title">
                        <Label>Title</Label>
                        <Input
                            className="pf-title-input"
                            onChange={this.handleChange}
                            placeholder='What do you want to name your project?'
                            value={this.state.title}
                            name='title'
                        />
                    </FormGroup>
                    <FormGroup className="pf-img">
                        <Label>Main Image</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Image URL'
                            value={this.state.img_url}
                            name='img_url'
                        />
                    </FormGroup>
                    <FormGroup className="pf-img">
                        <Label>Youtube Video (optional)</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Include a YouTube video here'
                            value={this.state.vid_url}
                            name='vid_url'
                        />
                    </FormGroup>
                    <p>Category <span className='category-span'>(click the same category to unselect)</span></p>
                    <div className='tag-section'>
                        <p className='post-tags'>
                            {this.state.tags && this.state.tags.map(tag => <span key={tag.id}>{tag.name}</span>)}
                        </p>
                        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                            <DropdownToggle split outline >{'Add/Delete Tags\xa0'} </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>

                                    <FormGroup>
                                        <Label for="exampleSelectMulti">Select Tags</Label>
                                        <Input onChange={this.handleTagsChange} type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                            {this.props.allTags ? this.props.allTags.map(tag => <option key={tag.id} value={tag.name.toLowerCase()}>{tag.name}</option>) : null}
                                        </Input>
                                    </FormGroup>

                                </DropdownItem>

                            </DropdownMenu>
                        </InputGroupButtonDropdown >
                    </div>

                    <FormGroup className="pf-description">
                        <Label>Introduction</Label>
                        <Input
                            type="textarea"
                            name='description'
                            onChange={this.handleChange}
                            value={this.state.description}
                            placeholder='What do you want people to know about your project?'
                            rows="8"
                        />
                    </FormGroup>
                    <FormGroup className="pf-difficulty">
                        <Label>Difficulty</Label>
                        <InputGroupButtonDropdown addonType="append" isOpen={this.state.difficultyDropdown} toggle={this.toggleDifficulty}>
                            <DropdownToggle split outline >{this.state.difficulty ? `${this.state.difficulty} \xa0\xa0` : 'Select Difficulty\xa0'} </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>

                                    <FormGroup>
                                        <Label for="exampleSelectMulti">Select Difficulty</Label>
                                        <Input onChange={this.handleChange} type="select" name="difficulty" id="exampleSelectMulti" multiple>
                                            <option value={`Easy`}>Easy</option>
                                            <option value={`Intermediate`}>Intermediate</option>
                                            <option value={`Hard`}>Hard</option>
                                            <option value={`Very Hard`}>Very Hard</option>
                                            <option value={`Impossible`}>Impossible</option>
                                        </Input>
                                    </FormGroup>

                                </DropdownItem>

                            </DropdownMenu>
                        </InputGroupButtonDropdown >

                    </FormGroup>
                    <FormGroup className="pf-duration">
                        <Label>Duration</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Estimated Time to Complete'
                            value={this.state.duration}
                            name='duration'
                        />
                    </FormGroup>
                    <FormGroup className="pf-skills">
                        <Label>Prerequisite Skills</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Skills Needed for this Project'
                            value={this.state.skills}
                            name='skills'
                        />
                    </FormGroup>
                    <FormGroup className="pf-supplies">
                        <Label>Tools/Supplies</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Necessary Supplies'
                            value={this.state.supplies}
                            name='supplies'
                        />
                    </FormGroup>
                    <div className="pf-button-container">
                        <Button className="pf-button" type='submit'>Save</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

function mapStateToProps({ projectsReducer }) {
    return {
        error: projectsReducer.error,
        addId: projectsReducer.addId,
        allTags: projectsReducer.allTags,
    }
}

export default connect(
    mapStateToProps,
    {
        addPost,
        addTag,
        getTag
    }
)(CreatePostForm);