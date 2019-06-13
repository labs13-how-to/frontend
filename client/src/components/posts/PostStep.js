import React from 'react';
import { connect } from 'react-redux';
import { deleteStep } from '../../actions/steps-tagsActions';
import { Card, CardText, CardBody, CardHeader, CardImg, Button } from 'reactstrap';

class PostStep extends React.Component {

  render() {
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
        <CardHeader>Step {this.props.index + 1}: {title}</CardHeader>
        <CardBody>
          <CardText>{instruction}</CardText>
        </CardBody>
        <Button onClick={() => this.props.deleteStep(post_id, id)}>X</Button>
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

export default connect(mapStateToProps, { deleteStep })(PostStep);