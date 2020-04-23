import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import './App.css';
import Registration from './components/Registration';

function App() {
    return (
        <Fragment>
            <div className="container-fluid">
                <Navbar />
            </div>

            <div className="container-fluid secondContainer">
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                </Switch>
            </div>
        </Fragment>
    );
}

export default App;
