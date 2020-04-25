import React from 'react';
import Joi from 'joi-browser';
import Form from './../common/form';

class Registration extends Form {
    state = {
        data: {
            username: '',
            email: '',
            password: ''
        },
        errors: {}
    };
    schema = {
        username: Joi.string().min(2).max(50).required().label('Username'),
        email: Joi.string().min(5).max(255).required().email().label('Email'),
        password: Joi.string().min(5).max(1024).required().label('Password')
    };

    doSubmit = () => {
        console.log('Registered');
    };
    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleOnSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('email', 'Email', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}
export default Registration;
