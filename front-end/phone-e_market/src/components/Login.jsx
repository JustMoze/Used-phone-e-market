import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';

class Login extends Form {
    // States ----------------------------------------------
    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    };
    // User schema front-end
    schema = {
        username: Joi.string().min(2).max(50).required().label('Username'),
        password: Joi.string().min(5).max(1024).required().label('Password')
    };

    doSubmit = () => {
        //call server
        console.log('Submit');
    };
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleOnSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default Login;
