import React from 'react';
import { Card, CardText, CardBody, CardHeader, CardImg } from 'reactstrap';
import Reviews from "../reviews/Reviews";


class Post extends React.Component {
    state={
        id: Number(this.props.location.pathname.split('/')[2]),
    }
    componentDidMount() {
        this.props.getPost(this.state.id)
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
            <Card className='post'>
                <CardImg src={img_url} alt="Card image" />
                <CardHeader>{title}</CardHeader>
                <CardBody>
                    <CardText>{description}</CardText>
                    <CardText>Difficulty: {difficulty}</CardText>
                    <CardText>duration: {duration}</CardText>
                    <CardText>skills: {skills}</CardText>
                    <CardText>supplies: {supplies}</CardText>
                </CardBody>
                <Reviews 
                    post_id={this.state.id}
                />
            </Card>
        );
    }
};

export default Post;