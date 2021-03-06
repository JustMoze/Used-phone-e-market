import React from 'react';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import Form from './../common/form';
import registrationPhoto from '../images/reginPhoto.jpg';
import BackButton from '../common/backButton';
import * as userService from '../services/userService';
import auth from '../services/authService';
import 'react-toastify/dist/ReactToastify.css';
import SaveDialog from '../common/dialog';

class Registration extends Form {
    state = {
        data: {
            username: '',
            email: '',
            password: ''
        },
        open: false,
        errors: {}
    };
    schema = {
        username: Joi.string().min(2).max(50).required().label('Username'),
        email: Joi.string().min(5).max(255).required().email().label('Email'),
        password: Joi.string().min(5).max(1024).required().label('Password')
    };

    doSubmit = async () => {
        try {
            this.handleClickOpen();
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token']);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
                toast.error('User is already registered');
            }
        }
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { smallScreen } = this.props;
        const { open } = this.state;
        var text =
            'Please go to your email address and click on email verification link that we send to you';
        if (auth.getCurrentUser()) return <Redirect to="/" />;
        return (
            <div className="row">
                <div className="col-sm-0 col-md-0 col-lg-6 parentDiv">
                    {smallScreen ? null : (
                        <img src={registrationPhoto} alt="Registration" />
                    )}
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                    <ToastContainer />
                    <div className="row action-btn-div">
                        {smallScreen && <BackButton />}
                    </div>
                    <h1>Register</h1>
                    <SaveDialog
                        handleClose={this.handleClose}
                        open={open}
                        title="Email validation!"
                        text={text}
                        show={false}
                        handleClickSave={this.handleClose}
                    />
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
