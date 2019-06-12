import React from 'react';
import { connect } from "react-redux";
import { addReview } from "../../actions";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: '',
            review: '',
        };
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault()
        await this.props.addReview(this.state)

        this.setState({
            rating: '',
            review: '',
        })
        // setTimeout(() => this.props.history.push('/'), 500) (need to adjust this to send back to specific post)
    };

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label>Rating</Label>
                    <Input
                        name='rating'
                        placeholder='rating'
                        onChange={this.handleChange}
                        value={this.state.rating}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Review</Label>
                    <Input 
                        type='textarea'
                        name='review'
                        placeholder='Review'
                        onChange={this.handleChange}
                        value={this.state.review}
                    />
                </FormGroup>
            </Form>
        );
    };
};

function mapStateToProps({ reviewsReducer }) {
    return {
        error: reviewsReducer.error
    };
};

export default connect(mapStateToProps, { addReview })(ReviewForm);