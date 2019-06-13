import React from 'react';
import { connect } from 'react-redux';
import { deleteStep } from '../../actions/steps-tagsActions';
import { getPost } from '../../actions/index';
import { Card, CardText, CardBody, CardHeader, CardImg, Button } from 'reactstrap';

class PostStep extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.refresh !== this.props.refresh) {
      this.props.getPost(this.props.post_id);
    }
  }

  render(){
    const {
      step_num,
      title,
      instruction,
      img_url,
      id,
      post_id
    } = this.props.step;
    return (
      <Card className='post'>
          <CardImg src={img_url} alt="Card image" />
          <CardHeader>Step {step_num}: {title}</CardHeader>
          <CardBody>
              <CardText>{instruction}</CardText>
          </CardBody>
          <Button onClick={() => this.props.deleteStep( post_id, id)}>X</Button>
      </Card>
    )
  }
}

function mapStateToProps({ projectsReducer }) {
  return {
    error: projectsReducer.error,
    refresh: projectsReducer.refresh
  }
}

export default connect(mapStateToProps, { deleteStep, getPost })(PostStep);