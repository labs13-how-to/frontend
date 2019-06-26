import React from "react";
import { connect } from "react-redux";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroupButtonDropdown
} from "reactstrap";
import { addPost, uploadImageHandler } from "../../actions";
import { addTag, getTag } from "../../actions/steps-tagsActions";
import "./postform.scss";
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

import ProtectedRoute from '../ProtectedRoute.js';


registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
);

class CreatePostForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleDifficulty = this.toggleDifficulty.bind(this);
        this.state = {
            title: "",
            img_url: "",
            vid_url: "",
            description: "",
            difficulty: "",
            duration: "",
            skills: "",
            supplies: "",
            created_by: "",
            dropdownOpen: false,
            difficultyDropdown: false,
            tags: [],
            postImage: null,
            submit: false,
            supplyList: [],
            showAlert: false,
        };
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
        this.props.getTag();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.submitRefresh !== this.props.submitRefresh) {
            this.handlePostSubmit();
        }
    }

    hydrateStateWithLocalStorage() {
        // if the key exists in localStorage
        if (!this.state.created_by) {
            // get the key's value from localStorage
            const id = localStorage.getItem("user_id");
            try {
                this.setState({ created_by: `${id}` });
            } catch (e) {
                // handle empty string
                this.setState({ created_by: `${id}` });
            }
        }
    }

    //toggle functions
    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    toggleDifficulty() {
        this.setState({
            difficultyDropdown: !this.state.difficultyDropdown
        });
    }

    handleChange = e => {
        if (this.state.showAlert) this.setState({ showAlert: false })
        this.setState({ [e.target.name]: e.target.value });
    };

    handleTagsChange = e => {
        // grabs tag id, then checks if its already tagged to the post
        const tagId = this.props.allTags.filter(
            tag => e.target.value === tag.name.toLowerCase() && tag.id
        );
        const isTagged = this.state.tags.filter(
            tag => e.target.value === tag.name.toLowerCase()
        );
        const newTag = { tag_id: tagId[0].id, name: e.target.value };
        if (!isTagged.length) {
            this.setState({ tags: [...this.state.tags, newTag] });
        } else {
            const filteredAry = this.state.tags.filter(
                tag => tag.tag_id !== newTag.tag_id
            );
            this.setState({ tags: filteredAry });
        }
    };

    handleSupplies = e => {
        if (e.key === 'Enter') {
            this.setState({ supplyList: [...this.state.supplyList, this.state.supplies] });
            this.setState({ supplies: '' });
        }
    }

    // handles file change for image
    handleImageChange = e => {
        e.preventDefault();
        this.setState({ postImage: e.target.files[0] });
    };

    // submit image and form
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.created_by
            && this.state.title
            && this.state.postImage
            && this.state.description
            && this.state.duration
            && this.state.difficulty
            && this.state.tags[0]) {

            this.props.uploadImageHandler(this.state.postImage);
            this.setState({ submit: true, showAlert: false });
        } else {
            this.setState({ showAlert: true })
        }
    };

    //submit post after image
    handlePostSubmit = async () => {
        if (this.state.submit) {
            this.setState({ submit: false });
            const newPost = {
                title: this.state.title,
                img_url: this.props.uploadedImage,
                vid_url: this.state.vid_url.split("&")[0],
                description: this.state.description,
                difficulty: this.state.difficulty,
                duration: this.state.duration,
                skills: this.state.skills,
                supplies: this.state.supplyList.join(' _ '),
                created_by: this.state.created_by
            };


            await this.props.addPost(newPost);

            this.setState({
                title: "",
                img_url: "",
                vid_url: "",
                description: "",
                difficulty: "",
                duration: "",
                skills: "",
                supplies: "",
                supplyList: [],
                created_by: ""
            });

            setTimeout(() => {
                this.state.tags.forEach(tag => {
                    const newTag = { tag_id: tag.tag_id, post_id: this.props.addId };
                    this.props.addTag(newTag);
                });
                this.props.history.push(`/forms/post/edit/${this.props.addId}`);
            }, 300);




        }
    };

    handleInit() {
        console.log("FilePond instance has initialised", this.pond);
    }

    render() {
        const hasLoggedIn = localStorage.hasOwnProperty('user_id') && localStorage.hasOwnProperty('jwt');
        return hasLoggedIn ?
            (<div className="pf-container">
                <Form className="post-form" onSubmit={this.handleSubmit}>
                    <FormGroup className="pf-title">
                        <Label className='form-start'>Title</Label>
                        <Input
                            className="pf-title-input"
                            onChange={this.handleChange}
                            placeholder="What do you want to name your project?"
                            value={this.state.title}
                            name="title"
                        />
                    </FormGroup>
                    <FormGroup className="pf-img">
                        <Label>Main Image</Label>
                        {/* <Input
                                type="file"
                                // name="img_url"
                                // id="img_url"
                                accept="image/png, image/jpeg"
                                onChange={this.handleImageChange}
                                disabled={this.state.disabled}
                            /> */}
                        <div className="filepond-container">
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
                        </div>
                    </FormGroup>

                    <FormGroup className="pf-img">
                        <Label>Youtube Video <span className="video-span">(Optional)</span></Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder="Include a YouTube video here"
                            value={this.state.vid_url}
                            name="vid_url"
                        />
                    </FormGroup>
                    <FormGroup>
                        <p>Category</p>
                        <div className="tag-section">
                            <p className="post-tags form-tags">
                                {this.state.tags && this.state.tags.map((tag, index) => {
                                    let currTag = tag.name.split('');
                                    currTag[0] = currTag[0].toUpperCase();
                                    currTag = currTag.join('')
                                    return <span key={index}>{currTag}<span id={'tag-delete'} onClick={() => this.handleTagsChange({ target: { value: tag.name } })} >🗴</span></span>
                                })}
                            </p>
                            <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={this.state.dropdownOpen}
                                toggle={this.toggleDropDown}
                            >
                                <DropdownToggle split outline>
                                    {"Select Categories\xa0"}{" "}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <FormGroup>
                                            {/* <Label for="exampleSelectMulti">Select Tags</Label> */}
                                            <Input
                                                onChange={this.handleTagsChange}
                                                type="select"
                                                name="selectMulti"
                                                id="exampleSelectMulti"
                                                multiple
                                            >
                                                {this.props.allTags
                                                    ? this.props.allTags.map(tag => (
                                                        <option key={tag.id} value={tag.name.toLowerCase()}>
                                                            {tag.name}
                                                        </option>
                                                    ))
                                                    : null}
                                            </Input>
                                        </FormGroup>
                                    </DropdownItem>
                                </DropdownMenu>
                            </InputGroupButtonDropdown>
                        </div>
                    </FormGroup>

                    <FormGroup className="pf-description">
                        <Label>Introduction</Label>
                        <Input
                            type="textarea"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.description}
                            placeholder="What do you want people to know about your project?"
                            rows="8"
                        />
                    </FormGroup>
                    <FormGroup className="pf-difficulty">
                        <Label>Difficulty</Label>
                        <InputGroupButtonDropdown
                            addonType="append"
                            isOpen={this.state.difficultyDropdown}
                            toggle={this.toggleDifficulty}
                        >
                            <DropdownToggle split outline>
                                {this.state.difficulty
                                    ? `${this.state.difficulty} \xa0\xa0`
                                    : "Select Difficulty\xa0"}{" "}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <FormGroup>
                                        <Label for="exampleSelectMulti">Select Difficulty</Label>
                                        <Input
                                            onChange={this.handleChange}
                                            type="select"
                                            name="difficulty"
                                            id="exampleSelectMulti"
                                            multiple
                                        >
                                            <option value={`Very Easy`}>Very Easy</option>
                                            <option value={`Easy`}>Easy</option>
                                            <option value={`Moderate`}>Moderate</option>
                                            <option value={`Hard`}>Hard</option>
                                            <option value={`Very Hard`}>Very Hard</option>
                                        </Input>
                                    </FormGroup>
                                </DropdownItem>
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </FormGroup>
                    <FormGroup className="pf-duration">
                        <Label>Duration</Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder="How long did it take to complete this project?"
                            value={this.state.duration}
                            name="duration"
                        />
                    </FormGroup>
                    <FormGroup className="pf-skills">
                        <Label>Prerequisite Skills{" "}<span className="video-span">(Optional)</span></Label>
                        <Input
                            onChange={this.handleChange}
                            placeholder="Are there any skills needed to complete this project?"
                            value={this.state.skills}
                            name="skills"
                        />
                    </FormGroup>
                    <FormGroup className="pf-supplies">
                        <Label>Tools/Supplies{" "}<span className="video-span">(Optional)</span>{" "}
                            <span className="category-span">
                                (Type your item and press Enter)
                            </span>

                        </Label>
                        <p className='post-tags'>
                            {this.state.supplyList && this.state.supplyList.map((sup, index) => {
                                let currSup = sup.split('');
                                currSup[0] = currSup[0].toUpperCase();
                                currSup = currSup.join('')
                                return <span key={index} id={index}>{currSup}<span id={'tag-delete'} onClick={() => {
                                    let supList = this.state.supplyList;
                                    supList.splice(index, 1)
                                    this.setState({ supplyList: supList })
                                }} >🗴</span></span>
                            })}

                        </p>
                        <Input
                            onKeyDown={this.handleSupplies}
                            onChange={this.handleChange}
                            placeholder='What tools or supplies did you use for this project?'
                            value={this.state.supplies}
                            name='supplies'
                        />
                    </FormGroup>
                    <div class={`alert alert-danger${this.state.showAlert ? " show-alert" : ""}`} role="alert">
                        * You Must Fill in the required fields to submit a post! *
                    </div>
                    <div className="pf-button-container">
                        <Button className="pf-button" onClick={this.handleSubmit}>Save</Button>
                    </div>
                </Form>
            </div>
            ) :
            (<ProtectedRoute />)
            ;
    }
}

function mapStateToProps({ projectsReducer }) {
    return {
        error: projectsReducer.error,
        addId: projectsReducer.addId,
        allTags: projectsReducer.allTags,
        uploadedImage: projectsReducer.uploadedImage,
        submitRefresh: projectsReducer.submitRefresh
    };
}


export default connect(
    mapStateToProps,
    {
        addPost,
        addTag,
        getTag,
        uploadImageHandler
    }
)(CreatePostForm)
