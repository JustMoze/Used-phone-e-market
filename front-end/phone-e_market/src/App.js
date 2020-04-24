import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Registration from './components/Registration';
import Phones from './components/Phones';
import './App.css';

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
                    <Route path="/phones" component={Phones} />
                </Switch>
            </div>
        </Fragment>
    );
}

export default App;
