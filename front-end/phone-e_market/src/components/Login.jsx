import React, { Fragment } from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';
import BackButton from '../common/backButton';
import loginImage from '../images/loginPhoto.jpg';

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
        const { smallScreen } = this.props;
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-0 col-md-0 col-lg-6 parentDiv">
                        {smallScreen ? null : (
                            <img src={loginImage} alt="Log in" />
                        )}
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <div className="row action-btn-div">
                            {smallScreen && <BackButton />}
                        </div>
                        <h1>Login</h1>
                        <form onSubmit={this.handleOnSubmit}>
                            {this.renderInput('username', 'Username')}
                            {this.renderInput(
                                'password',
                                'Password',
                                'password'
                            )}
                            {this.renderButton('Login')}
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;
