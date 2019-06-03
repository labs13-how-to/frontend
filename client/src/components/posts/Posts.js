import React from 'react';
import { Card, CardText, CardBody, CardHeader, CardImg, Button } from 'reactstrap';


const Posts = props => {
    const { title, description, img_url, id } = props.post
    return (
        <Card>
            <CardImg src={img_url} alt="Card image" />
            <CardHeader>{title}</CardHeader>
            <CardBody>
                <CardText>{description}</CardText>
                <Button onClick={() => props.history.push(`posts/${id}`, { id })}>
                    Learn More
                </Button>
            </CardBody>

        </Card>
    );
};

export default Posts;