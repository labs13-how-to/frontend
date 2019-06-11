import React from 'react';
import { Card, CardText, CardBody, CardHeader, CardImg, Button } from 'reactstrap';
import PostStep from './PostStep';
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
            duration,
            steps
        } = this.props.post
        console.log(this.props.post)
        return (
            <React.Fragment>
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
                </Card>
                {!!steps && steps.map((step, index) => {
                    return (
                        <PostStep
                            key={index}
                            step={step}
                        />
                    )
                })}
                <Button onClick={() => this.props.history.push(`/forms/post/${this.state.id}/steps`)}>
                    Add Steps
                </Button>
                <Reviews 
                    post_id={this.state.id}
                />
            </React.Fragment>
        );
    }
};

export default Post;