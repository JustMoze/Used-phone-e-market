import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Registration from './components/Registration';
import Phones from './components/Phones';
import Footer from './components/footer';
import PhoneDetail from './components/PhoneDetail';

import './App.css';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            smallScreen: false,
            mainPage: false
        };
    }
    componentDidMount() {
        window.addEventListener('resize', this.reportWindowSize);
    }
    reportWindowSize = () => {
        let smallScreen = window.innerWidth <= 900;
        if (smallScreen) {
            this.setState({ smallScreen: true });
        } else {
            this.setState({ smallScreen: false });
        }
        const path = window.location.href.slice(-1);
        if (path === '0' || path === '/') this.setState({ mainPage: true });
        else this.setState({ mainPage: false });
    };
    componentDidUpdate() {
        window.addEventListener('resize', this.reportWindowSize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.reportWindowSize);
    }
    render() {
        const { smallScreen, mainPage } = this.state;
        return (
            <Fragment>
                <Navbar />
                <div className="container-fluid" style={{ padding: '2%' }}>
                    <Switch>
                        <Route
                            path="/phones/:id"
                            render={(props) => <PhoneDetail {...props} />}
                        />
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login {...props} smallScreen={smallScreen} />
                            )}
                        />
                        <Route
                            path="/register"
                            render={(props) => (
                                <Registration
                                    {...props}
                                    smallScreen={smallScreen}
                                />
                            )}
                        />
                        <Route
                            path="/phones"
                            render={(props) => (
                                <Phones {...props} smallScreen={smallScreen} />
                            )}
                        />
                    </Switch>
                </div>
                {smallScreen && mainPage ? <Footer /> : null}
            </Fragment>
        );
    }
}

export default App;
