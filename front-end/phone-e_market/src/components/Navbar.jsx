import React from 'react';
import NavbarLink from './../common/navLinks';
import Logo from './../common/logo';
import UserIcon from '../common/userIcon';

function Navbar(props) {
    return (
        <nav
            className="navbar navbar-expand-md fixed-top"
            style={{ backgroundColor: '#77c3f2' }}
        >
            <div className="col-10">
                <ul className="navbar-nav">
                    <Logo firstPart="Phones" logo="e-" secondPart="Market" />
                    <NavbarLink label="Phones" to="/phones" />
                    <NavbarLink label="Login" to="/login" />
                    <NavbarLink label="Register" to="/register" />
                </ul>
            </div>
            <div className="col-2 navUserIcon">
                <ul className="navbar-nav">
                    <UserIcon user="Modestas" />
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
