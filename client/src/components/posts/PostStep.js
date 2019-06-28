import React from 'react';
import { connect } from 'react-redux';
import { deleteStep } from '../../actions/steps-tagsActions';
import { Card, CardText, CardImg, Button } from 'reactstrap';
import "./postSteps.scss";


class PostStep extends React.Component {
  state = {
    isForm: false
  }


  componentDidMount() {
    if (this.props.location) {
      let isForm = this.props.location.pathname.split('/')[1] === 'forms';
      this.setState({
        isForm: isForm
      })
    }


  }

  render() {
    const {
      title,
      instruction,
      img_url,
      id,
      post_id
    } = this.props.step;

    return (

      <div className='ps-card-container'>
        <Card className={this.props.isEdit ? 'ps-card' : 'ps-card p-page'}>
          <div className='ps-header'>
            <span>Step {this.props.index + 1}</span>
            {this.state.isForm && <Button className='ps-button' onClick={() => this.props.deleteStep(post_id, id)}>Delete</Button>}
          </div>
          <CardText className='ps-title' id="card"> {title}</CardText>
            <CardText className='ps-text'>{instruction}</CardText>
          {img_url && <CardImg className='ps-img' src={img_url} alt="Card image" />}
        </Card>
      </div>

    )
  }
}

function mapStateToProps({ projectsReducer }) {
  return {
    error: projectsReducer.error,
    refresh: projectsReducer.refresh
  }
}

export default connect(mapStateToProps, { deleteStep })(PostStep);