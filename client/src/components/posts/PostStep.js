import React from 'react';
import { Card, CardText, CardBody, CardHeader, CardImg } from 'reactstrap';

const PostStep = props => {
  const {
    title,
    instruction,
    img_url
  } = props.step;
  return (
    <Card className='post'>
        <CardImg src={img_url} alt="Card image" />
        <CardHeader>{title}</CardHeader>
        <CardBody>
            <CardText>{instruction}</CardText>
        </CardBody>
    </Card>
  )
}

export default PostStep;