import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AuthService from '../services/auth.service'


export default function NavigationBar() {

    const location = useLocation();
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#4717f6" }}>
                <div className="navbar-brand" href="#">GameBundl</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        {localStorage.getItem('jwt') ? <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/" activeClassName="active">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboard" activeClassName="active">Search Games </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/bundles" activeClassName="active">My Bundles</NavLink>
                            </li>
                        </React.Fragment> : ''}


                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {localStorage.getItem('jwt') ?
                            <li className="nav-item">
                                <Link className="nav-link" to="/" activeClassName="active" >   
                                    <div onClick={() => localStorage.clear()}>Logout</div>
                                </Link>
                            </li>
                            :
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login" activeClassName="active">
                                    Login
                                </NavLink>
                            </li>
                        }

                    </ul>
                </div>
            </nav>
        </>
    )
}


// REPLACE Login with <div onClick={() => localStorage.setItem('jwt')}>Login</div> for local no-API testing