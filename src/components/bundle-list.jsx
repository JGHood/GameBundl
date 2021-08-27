import React, { useEffect, useState } from 'react'
import UserService from "../services/user.service"
import Bundle from './bundle'
import "../styles/game-card-style.css";


export default function BundleList({userBundles, isEmployee, featuredBundles, selectedGameChange,
    userHasBundles, username, openModal, modalTypeChange, selectedBundleChange}){
    
    
    if (userHasBundles){
        const bundlesArray = userBundles.map(bundle => (
            <Bundle 
            isEmployee={isEmployee}
            selectedGameChange={selectedGameChange}
            price={bundle.price} 
            name={bundle.name}
            id={bundle.id}
            featured={bundle.featured}
            games={bundle.games}
            openModal={openModal}
            modalTypeChange={modalTypeChange}
            selectedBundleChange={selectedBundleChange}/>
        ));
        return(
            <div className="bundles-container">
                <h3>{username}'s Bundles:</h3>
                <div className="bundles-array">{bundlesArray}</div>
            </div>
        )
    }
    const bundlesArray = featuredBundles.map(bundle => (
        <Bundle 
            isEmployee={isEmployee}
            selectedGameChange={selectedGameChange}
            price={bundle.price} 
            name={bundle.name}
            id={bundle.id}
            featured={bundle.featured}
            games={bundle.games}
            openModal={openModal}
            modalTypeChange={modalTypeChange}
            selectedBundleChange={selectedBundleChange}/>
    ));
    return(
        <div className="bundles-container">
            <h3>Featured Bundles:</h3>
            <div className="bundles-array">{bundlesArray}</div>
        </div>
    )
}