import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Navbar.scss';

function NavBar() {
    return (
        <nav className='Navbar'>
            <ul className='Navbar-list'>
                <li className='Navbar-list-item'>
                    <NavLink activeClassName='NavLink-active' className='NavLink' to='/new'>New</NavLink>
                </li>
                <li className='Navbar-list-item'>
                    <NavLink activeClassName='NavLink-active' className='NavLink' to='/log'>Log</NavLink>
                </li>
                <li className='Navbar-list-item'>
                    <NavLink activeClassName='NavLink-active' className='NavLink' to='/calculator'>Calc</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
