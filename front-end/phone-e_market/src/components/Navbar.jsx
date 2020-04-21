/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NavbarLink from './../common/navLinks';
import Logo from './../common/logo';

function Navbar(props) {
    return (
        <nav
            className="navbar navbar-expand-md fixed-top"
            style={{ backgroundColor: '#77c3f2' }}
        >
            <div>
                <ul className="navbar-nav">
                    <Logo firstPart="Phones" logo="e-" secondPart="Market" />
                    <NavbarLink label="Phones" to="/phones" />
                    <NavbarLink label="Login" to="/login" />
                    <NavbarLink label="Register" to="/register" />
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
