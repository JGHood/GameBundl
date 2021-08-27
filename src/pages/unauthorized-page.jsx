import React from 'react';
import '../styles/pagenotfound-style.css';
import { NavLink } from 'react-router-dom';

export default function UnauthorizedPage() {
    return (

        <div className="notfound-page">
            
            <div className="not-found-container fade-in">
            <div className="not-found-text-large">Sorry, you don't have the permissions to be here.</div>
            <div className="not-found-text">Let's take you back to the games.</div>
            <button className="splash-nav-button">
                <NavLink className = "splash-nav-link"  activeClassName="active" to='/'>Back to Home</NavLink>
            </button>
            </div>
        </div>

    )
}