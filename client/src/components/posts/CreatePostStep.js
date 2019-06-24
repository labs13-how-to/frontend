import React from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addStep } from "../../actions/steps-tagsActions";
import { getPost, getPosts, uploadImageHandler } from "../../actions/index";
import PostStep from "./PostStep";
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

class CreateStepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: this.props.match.params.id,
      step_num: 1,
      title: "",
      instruction: "",
      img_url: "",
      vid_url: "",
      submit: false,
      postImage: undefined
    };
  }

  componentDidMount() {
    this.props.getPost(this.state.post_id);
    console.log("CURR POST", this.props.currPost);
    if (this.props.currPost.length)
      this.setState({
        step_num: this.props.currPost.steps.length + 1
      });
  }
  componentDidUpdate(prevProps, prevS) {
    //refresh steps
    if (this.props.currPost)
      if (prevProps.currPost === undefined) {
        this.setState({
          step_num: this.props.currPost.steps.length + 1
        });
      } else if (prevProps.currPost.steps !== this.props.currPost.steps) {
        this.setState({
          step_num: this.props.currPost.steps.length + 1
        });
      }

    //refresh post
    if (prevProps.refresh !== this.props.refresh) {
      this.props.getPost(this.state.post_id);
    }

    //handle submit after image upload
    if (prevProps.submitRefresh !== this.props.submitRefresh) {
      this.handleStepSubmit();
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = e => {
    e.preventDefault();
    this.setState({ postImage: e.target.files[0] });
  };

  handleSubmit = e => {
    this.setState({ submit: true });
    e.preventDefault();
    if (!this.state.postImage) {
      setTimeout(() => this.handleStepSubmit(), 100);
    } else {
      setTimeout(
        () => this.props.uploadImageHandler(this.state.postImage),
        100
      );
    }
  };

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  handleStepSubmit = async e => {
    if (this.state.submit) {
      this.setState({ submit: false });

      const newStep = {
        post_id: this.state.post_id,
        step_num: this.state.step_num,
        title: this.state.title,
        instruction: this.state.instruction,
        img_url: this.props.uploadedImage,
        vid_url: this.state.vid_url
      };
      await this.props.addStep(this.state.post_id, newStep);

      this.setState({
        step_num: this.state.step_num + 1,
        title: "",
        instruction: "",
        img_url: "",
        vid_url: "",
        postImage: null
      });
      document.getElementById("image").value = "";

      setTimeout(() => this.props.getPost(this.state.post_id), 300);
    }
  };

  render() {
    const { steps } = this.props.currPost;
    return (
      <>
        {steps &&
          steps.map((step, index) => {
            return (
              <PostStep
                key={index}
                step={step}
                index={index}
                location={this.props.location}
                isEdit={true}
              />
            );
          })}
        <h3 className="psf-section-header">
          Add Steps, Instructions, and additional Photos/Videos here
        </h3>
        <div className="psf-container">
          <Form className="psf" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Step Title</Label>
              <Input
                className="psf-title-input"
                onChange={this.handleChange}
                placeholder="What do you want to name this step?"
                value={this.state.title}
                name="title"
              />
            </FormGroup>
            <FormGroup>
              <Label>Instruction</Label>
              <Input
                type="textarea"
                name="instruction"
                onChange={this.handleChange}
                value={this.state.instruction}
                placeholder="Write your instructions here"
                rows="4"
              />
            </FormGroup>
            <div className="psf-media">
              <FormGroup className="psf-img">
                <Label>Image(optional)</Label>
                {/* <Input
                      onChange={this.handleChange}
                      placeholder='Image URL'
                      value={this.state.img_url}
                      name='img_url'
                  /> */}
                {/* <Input
                  type="file"
                  name="img_url"
                  id="img_url"
                  accept="image/png, image/jpeg"
                  onChange={this.handleImageChange}
                  disabled={this.state.disabled}
                  // value={this.state.postImage.name}
                />{" "}
                */}
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
                        this.setState({
                          img_url: json.img_url.img_url
                        });
                      }
                    }
                  }}
                  oninit={() => this.handleInit()}
                  // allowFileEncode={true}
                  onupdatefiles={fileItems => {
                    // Set current file object to this.state
                    this.setState({
                      postImage: fileItems[0].file
                    });
                  }}
                />
              </FormGroup>
              {/* <FormGroup className="psf-vid">
                                <Label>Video(optional)</Label>
                                <Input
                                    onChange={this.handleChange}
                                    placeholder='Video Url'
                                    value={this.state.vid_url}
                                    name='vid_url'
                                />
                            </FormGroup> */}
            </div>
            <div className="psf-button-container">
              <Button className="psf-button" type="submit">
                Add Step
              </Button>
            </div>
          </Form>
        </div>
        <div className="publish-button">
          <Button
            className="psf-button"
            onClick={() =>
              this.props.history.push(`/posts/${this.state.post_id}`)
            }
          >
            Publish
          </Button>
        </div>
      </>
    );
  }
}

function mapStateToProps({ projectsReducer }) {
  return {
    error: projectsReducer.error,
    currPost: projectsReducer.currPost,
    posts: projectsReducer.posts,
    refresh: projectsReducer.refresh,
    uploadedImage: projectsReducer.uploadedImage,
    submitRefresh: projectsReducer.submitRefresh
  };
}

export default connect(
  mapStateToProps,
  {
    addStep,
    getPost,
    getPosts,
    uploadImageHandler
  }
)(CreateStepForm);
