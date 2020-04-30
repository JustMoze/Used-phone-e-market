import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Registration from './components/Registration';
import Phones from './components/Phones';
import Footer from './components/footer';
import PhoneDetail from './components/PhoneDetail';
import NotFound from './common/notFound';
import Logout from './common/logout';
import auth from './services/authService';
import ProtectedRoute from './common/protectedRoute';
import EditPage from './components/EditPage';
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
        const user = auth.getCurrentUser();
        this.setState({ user });
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
        const { smallScreen, mainPage, user } = this.state;
        return (
            <Fragment>
                <Navbar user={user} />
                <main className="container-fluid" style={{ padding: '2%' }}>
                    <Switch>
                        <ProtectedRoute
                            path="/phones/edit/:id"
                            component={EditPage}
                        />
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
                        <Route path="/logout" component={Logout} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/phones" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
                {smallScreen && mainPage ? <Footer /> : null}
            </Fragment>
        );
    }
}

export default App;
