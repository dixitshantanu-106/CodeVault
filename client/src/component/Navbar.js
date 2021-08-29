import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="#">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

             

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/registration">Register</NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Login</NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/about">About Us</NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                    </li>
                    </ul>
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar;