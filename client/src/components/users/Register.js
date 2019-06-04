import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions';
import { Button, Form, Input } from 'reactstrap';

class Register extends Component {
    state = {
        username: '',
        password: '',
    };

    handleChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    };

    register = event => {
        event.preventDefault()
        this.props.register(this.state)
        this.props.history.push('/')
    };

    render() {
        return(
            <div>
                <h1>Register Your Account</h1>
                <Form>
                    <Input 
                        name = 'username'
                        placeholder = 'username'
                        type = 'text'
                        value = {this.state.username}
                        onChange = {this.handleChange}
                    />

                    <Input 
                        name = 'password'
                        placeholder = 'password'
                        type = 'password'
                        value = {this.state.password}
                        onChange = {this.handleChange}
                    />
                </Form>
                <Button onClick = {this.register}>Register</Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isRegistered: state.usersReducer.isRegistered,
    error: state.usersReducer.error,
})

export default connect(mapStateToProps, { register })(Register);