import React from 'react';
import { connect } from 'react-redux';
import {
    Button, Form, FormGroup, Label, Input,
    DropdownToggle, DropdownMenu,
    DropdownItem, InputGroupButtonDropdown
} from 'reactstrap';
import { updatePost, getPost, uploadImageHandler, getRefresh } from '../../actions';
import { getTag, addTag, removeTag } from '../../actions/steps-tagsActions';
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register FilePond the plugins
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);

class EditPostForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
            title: '',
            img_url: '',
            vid_url: '',
            description: '',
            difficulty: '',
            duration: '',
            skills: '',
            supplies: '',
            created_by: 0,
            id: Number(this.props.match.params.id),
            dropdownOpen: false,
        };
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    componentDidMount() {

        this.props.getPost(this.state.id)
        if (this.props.currPost.title) {
            const {
                title, img_url, description,
                difficulty, duration, skills,
                supplies, created_by, vid_url
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
                vid_url: vid_url
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currPost.title !== this.props.currPost.title) {
            const {
                title, img_url, description,
                difficulty, duration, skills,
                supplies, created_by, vid_url
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
                vid_url: vid_url
            })
        }
        if (prevProps.refresh !== this.props.refresh || prevProps.submitRefresh !== this.props.submitRefresh) {
            this.props.getPost(this.state.id)
        };
        if (this.state.imageSubmitted) {
            this.setState({ imageSubmitted: false, img_url: this.props.uploadedImage })
            this.props.getRefresh();
        }
    }

    handleImageChange = e => {
        e.preventDefault();
        this.setState({ postImage: e.target.files[0] });
    };
    submitImage = e => {
        this.props.uploadImageHandler(this.state.postImage)
        setTimeout(() => this.setState({ imageSubmitted: true }), 900);
    }

    handleTagsChange = e => {
        this.setState({ tag: e.target.value });
        const tagId = this.props.allTags.filter((tag) => e.target.value === tag.name.toLowerCase() && tag.id)
        const isTagged = this.props.currPost.tags.filter(tag => e.target.value === tag.name.toLowerCase())
        const newTag = { post_id: this.state.id, tag_id: tagId[0].id };
        isTagged.length
            ? this.props.removeTag(newTag)
            : this.props.addTag(newTag);
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    handleSubmit = async e => {
        e.preventDefault();
        const {
            title, img_url, description,
            difficulty, duration, skills,
            supplies, created_by,
        } = this.state
        const vid_url = this.state.vid_url.split('&')[0];
        const stateObj = {
            title, img_url, description,
            difficulty, duration, skills,
            supplies, created_by, vid_url
        };
        let updatedObj = {}
        for (var property in stateObj) {
            if (stateObj[property] !== this.props.currPost[property]) {
                updatedObj = { ...updatedObj, [property]: stateObj[property] }
            }
        }
        await this.props.updatePost(this.state.id, updatedObj)

        setTimeout(() => this.props.history.push(`/posts/${this.state.id}`), 400);
    }

    handleInit() {
        console.log("FilePond instance has initialised", this.pond);
      }

    render() {
        return (
            <div className="pf-container">
                <Form className="post-form" onSubmit={this.handleSubmit}>
                    <FormGroup className="pf-title">
                        <Label>Title</Label>
                        <Input
                            className="pf-title-input"
                            onChange={this.handleChange}
                            placeholder='title'
                            value={this.state.title}
                            name='title'
                        />
                    </FormGroup>
                    <FormGroup className="pf-img">
                        <Label>Main Image</Label>
                        {/* <Input
                            onChange={this.handleChange}
                            placeholder='img_url'
                            value={this.state.img_url}
                            name='img_url'
                        /> */}
                        <img className='img-fluid' src={this.state.img_url} />
                        {/* <Input
                            type="file"
                            name="img_url"
                            id="img_url"
                            accept="image/png, image/jpeg"
                            onChange={this.handleImageChange}
                            disabled={this.state.disabled}
                        /> */}
                        <Label>Upload New Image</Label>
                        <FilePond
                            ref={ref => (this.pond = ref)}
                            name="image"
                            id="image"
                            acceptedFileTypes={["image/png", "image/jpeg"]}
                            disabled={this.state.disabled}
                            allowMultiple={false}
                            allowRevert={false}
                            server={{
                            // Sends image to be uploaded to cloudinary right after drag/dropped
                            process: {
                                url: `${process.env.REACT_APP_BE_URL}/upload`,
                                onload: response => {
                                const json = JSON.parse(response);
                                console.log(json);
                                this.setState({
                                    img_url: json.img_url.img_url
                                });
                                }
                            }
                            }}
                            oninit={() => this.handleInit()}
                            // allowFileEncode={true}
                            onupdatefiles={fileItems => {
                            console.log("FILE ITEMS", fileItems);
                            // Set current file object to this.state
                            this.setState({
                                postImage: fileItems[0].file
                            });
                            }}
                        />
                        {/* <Button className='pf-button image-button' onClick={() => this.submitImage()}>Save Image</Button> */}
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
                            {this.props.currPost.tags && this.props.currPost.tags.map(tag => <span key={tag.id}>{tag.name}</span>)}
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
                            placeholder='Please Provide an Introduction to this Project'
                            rows="8"
                        />
                    </FormGroup>
                    <FormGroup className="pf-difficulty">
                        <Label>Difficulty</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder='Select Difficulty'
                            value={this.state.difficulty}
                            name='difficulty'
                        />
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
                            placeholder='supplies'
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
        message: projectsReducer.message,
        currPost: projectsReducer.currPost,
        refresh: projectsReducer.refresh,
        allTags: projectsReducer.allTags,
        uploadedImage: projectsReducer.uploadedImage,
        submitRefresh: projectsReducer.submitRefresh
    }
}

export default connect(
    mapStateToProps,
    {
        updatePost,
        getPost,
        removeTag,
        addTag,
        getTag,
        uploadImageHandler,
        getRefresh
    }
)(EditPostForm);