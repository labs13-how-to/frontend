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
import ProtectedRoute from '../ProtectedRoute.js';
import CreateStep from './CreatePostStep.js';
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
            supplyList: [],
            successAlert: false,
            difficultyDropdown: false,
        };
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    toggleDifficulty = () => {
        console.log(this.state)
        this.setState({
            difficultyDropdown: !this.state.difficultyDropdown
        });
    }

    componentDidMount() {
        window.scrollTo(0, 600);

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
                supplyList: supplies && supplies.split(' _ '),
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
                supplyList: supplies && supplies.split(' _ '),
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
        if (this.state.successAlert) this.setState({ successAlert: false })
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSupplies = e => {
        if (e.key === 'Enter') {
            this.setState({ supplyList: [...this.state.supplyList, this.state.supplies] });
            this.setState({ supplies: '' });
        }
    }


    handleSubmit = async e => {
        e.preventDefault();
        const {
            title, img_url, description,
            difficulty, duration, skills,
            created_by,
        } = this.state
        const vid_url = this.state.vid_url.split('&')[0];
        const stateObj = {
            title, img_url, description,
            difficulty, duration, skills,
            supplies: this.state.supplyList && this.state.supplyList.join(' _ '), created_by, vid_url
        };
        let updatedObj = {}
        let hasUpdatedObj = false;
        for (var property in stateObj) {
            if (stateObj[property] !== this.props.currPost[property]) {
                updatedObj = { ...updatedObj, [property]: stateObj[property] }
                hasUpdatedObj = true;
            }
        }
        if (hasUpdatedObj) {
            this.setState({ successAlert: true })
            await this.props.updatePost(this.state.id, updatedObj)
        }


        // setTimeout(() => this.props.history.push(`/posts/${this.state.id}`), 400);
    }

    handleInit() {
        console.log("FilePond instance has initialised", this.pond);
    }

    render() {
        return (
            <>{this.state.created_by === window.localStorage.getItem('user_id') ?
                <>

                    <div className="pf-container">
                        <Form className="post-form" >
                            <FormGroup className="pf-title">
                                <Label className='form-start'>Title</Label>
                                <Input
                                    className="pf-title-input"
                                    onChange={this.handleChange}
                                    placeholder='title'
                                    value={this.state.title}
                                    name='title'
                                />
                            </FormGroup>
                            <FormGroup className="pf-img">
                                <Label className="main-img-label">Main Image</Label>
                                <img className='img-fluid' src={this.state.img_url} alt="upload" />
                                <FormGroup>
                                    <Label className='new-img'>Upload New Image</Label>
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
                                                    this.pond.removeFiles();
                                                }
                                            }
                                        }}
                                        oninit={() => this.handleInit()}
                                        onupdatefiles={fileItems => {
                                            // Set current file object to this.state
                                            if (fileItems[0]) {
                                                this.setState({ postImage: fileItems[0].file })
                                            };
                                        }}
                                    />
                                </FormGroup>
                            </FormGroup>
                            <FormGroup className="pf-img">
                                <Label>Youtube Video <span className="video-span">(Optional)</span></Label>
                                <Input
                                    onChange={this.handleChange}
                                    placeholder='Include a YouTube video here'
                                    value={this.state.vid_url}
                                    name='vid_url'
                                />
                            </FormGroup>
                            <FormGroup>
                                <p>Category</p>
                                <div className='tag-section'>
                                    <p className='post-tags'>
                                        {this.props.currPost.tags && this.props.currPost.tags.map((tag, index) => <span key={index}>{tag.name}<span id={'tag-delete'} onClick={() => this.handleTagsChange({ target: { value: tag.name.toLowerCase() } })} >x</span></span>)}
                                    </p>
                                    <InputGroupButtonDropdown className='desktop-select' addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                                        <DropdownToggle split outline >{'Select Categories\xa0'} </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                <FormGroup>
                                                    <Input onChange={this.handleTagsChange} type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                                        {this.props.allTags ? this.props.allTags.map(tag => <option key={tag.id} value={tag.name.toLowerCase()}>{tag.name}</option>) : null}
                                                    </Input>
                                                </FormGroup>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </InputGroupButtonDropdown >
                                    <select
                                        className='form-control mobile-select '
                                        multiple={false}
                                        onChange={this.handleTagsChange}
                                        name="taginput"
                                        id="exampleSelectMulti"
                                    >
                                        <option value={""}>&nbsp;Select Categories&nbsp;</option>
                                        {this.props.allTags
                                            ? this.props.allTags.map(tag => (
                                                <option key={tag.id} value={tag.name.toLowerCase()}>
                                                    {tag.name}
                                                </option>
                                            ))
                                            : null}
                                    </select>
                                </div>
                            </FormGroup>
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
                                <InputGroupButtonDropdown
                                    className='desktop-select'
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
                                                <Input
                                                    className="form-control"
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
                                <select
                                    className='form-control mobile-select'
                                    multiple={false}
                                    onChange={this.handleChange}
                                    name="difficulty"
                                    value={this.state.difficulty}
                                    id="exampleSelectMulti"
                                >
                                    <option value={`Very Easy`}>Very Easy</option>
                                    <option value={`Easy`}>Easy</option>
                                    <option value={`Moderate`}>Moderate</option>
                                    <option value={`Hard`}>Hard</option>
                                    <option value={`Very Hard`}>Very Hard</option>
                                </select>
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
                                <Label>Prerequisite Skills{" "}<span className="video-span">(Optional)</span></Label>
                                <Input
                                    onChange={this.handleChange}
                                    placeholder='Skills Needed for this Project'
                                    value={this.state.skills}
                                    name='skills'
                                />
                            </FormGroup>
                            <FormGroup className="pf-supplies">
                                <Label>Tools/Supplies{" "}<span className="video-span">(Optional)</span>{" "}
                                    <span className="category-span">
                                        (Type your item and press Enter)
                            </span>
                                </Label>
                                <div className='supplies-tags'>
                                    <p className='post-tags'>
                                        {this.state.supplyList && this.state.supplyList.map((sup, index) => {
                                            let currSup = sup.split('');
                                            currSup[0] = currSup[0].toUpperCase();
                                            currSup = currSup.join('')
                                            return <span key={index} id={index}>{currSup}<span id={'tag-delete'} onClick={() => {
                                                let supList = this.state.supplyList;
                                                supList.splice(index, 1)
                                                this.setState({ supplyList: supList })
                                            }} >x</span></span>
                                        })}
                                    </p>

                                    <Input
                                        className="supply-input"
                                        onKeyDown={this.handleSupplies}
                                        onChange={this.handleChange}
                                        placeholder='supplies'
                                        value={this.state.supplies}
                                        name='supplies'
                                    />
                                </div>
                            </FormGroup>

                            <div className="pf-button-container">
                                <Button className="pf-button" onClick={this.handleSubmit}>Save</Button>
                            </div>
                            <div class={`alert alert-success${this.state.successAlert ? " show-alert" : ""}`} role="alert">
                                Your Post info has been successfully edited!
                            </div>
                        </Form>
                    </div>
                    <CreateStep history={this.props.history} match={this.props.match} location={this.props.location} />
                </>
                :
                <ProtectedRoute />
            }
            </>

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
)(EditPostForm)