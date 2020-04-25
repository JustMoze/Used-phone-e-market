import React from 'react';
import Joi from 'joi-browser';
import Form from './../common/form';
import registrationPhoto from '../images/reginPhoto.jpg';
import BackButton from '../common/backButton';

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
        const { smallScreen } = this.props;
        return (
            <div className="row">
                <div className="col-sm-0 col-md-0 col-lg-6 parentDiv">
                    {smallScreen ? null : (
                        <img src={registrationPhoto} alt="Registration" />
                    )}
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="row action-btn-div">
                        {smallScreen && <BackButton />}
                    </div>
                    <h1>Register</h1>
                    <form onSubmit={this.handleOnSubmit}>
                        {this.renderInput('username', 'Username')}
                        {this.renderInput('email', 'Email', 'email')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderButton('Register')}
                    </form>
                </div>
            </div>
        );
    }
}
export default Registration;
