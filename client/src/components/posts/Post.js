import React from 'react';
import { Card, CardText, CardBody, CardHeader, CardImg } from 'reactstrap';


class Post extends React.Component {

    componentDidMount() {
        const id = Number(this.props.location.pathname.split('/')[2]);
        this.props.getPost(id)
    }

    render() {
        const {
            title,
            description,
            img_url,
            difficulty,
            skills,
            supplies,
            duration
        } = this.props.post
        return (
            <Card>
                <CardImg src={img_url} alt="Card image" />
                <CardHeader>{title}</CardHeader>
                <CardBody>
                    <CardText>{description}</CardText>
                    <CardText>Difficulty: {difficulty}</CardText>
                    <CardText>duration: {duration}</CardText>
                    <CardText>skills: {skills}</CardText>
                    <CardText>supplies: {supplies}</CardText>
                </CardBody>

            </Card>
        );
    }
};

export default Post;