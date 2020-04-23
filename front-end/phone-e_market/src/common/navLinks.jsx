import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavbarLink(props) {
    const [mouseOver, setMouseOver] = useState(false);
    const { to, label } = props;
    const styleMouseOver = 'nav-item nav-link roolNavLink';
    const styleMouseOut = 'nav-item nav-link navLinks';
    function handleMouseOver() {
        setMouseOver(true);
    }
    function handleMouseOut() {
        setMouseOver(false);
    }
    return (
        <NavLink
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className={mouseOver ? styleMouseOver : styleMouseOut}
            to={to}
            style={{ color: mouseOver ? '#ffcd38' : '#1a2526' }}
        >
            {label}
        </NavLink>
    );
}

export default NavbarLink;