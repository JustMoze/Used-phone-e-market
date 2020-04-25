import React from 'react';
import NavbarLink from './../common/navLinks';
import Logo from './../common/logo';
import UserIcon from '../common/userIcon';

function Navbar(props) {
    return (
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            <Logo
                                firstPart="Phones"
                                logo="e-"
                                secondPart="Market"
                            />
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <NavbarLink label="Phones" to="/phones" />
                </ul>
                <ul className="navbar-nav">
                    <NavbarLink label="Login" to="/login" />
                </ul>
                <ul className="navbar-nav">
                    <NavbarLink label="Register" to="/register" />
                </ul>
            </div>
            <div className="form-inline my-2 my-lg-0 navUserIcon">
                <ul className="navbar-nav">
                    <UserIcon user="Modestas" />
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
