import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/splash-page-style.css";
import SplashPageTextScroll from "../components/splash-page-text-scroll";
import UserService from "../services/user.service";

export default function SplashPage() {

  

    
  return (
    <div className="splash-page">
      <div className="heading">
        <header className="splash-header"> GameBundl </header>
        <p className="header-flavor">
          The easiest (and cheapest) way to game- A CrederaU Project
        </p>
      </div>
      <SplashPageTextScroll />
      <div className = "start-bundling">
         <button className="splash-nav-button"><NavLink className = "splash-nav-link"  activeClassName="active" to='/dashboard'>Start Your GameBundl</NavLink></button>
      </div>
      
    </div>
  );

  
}

