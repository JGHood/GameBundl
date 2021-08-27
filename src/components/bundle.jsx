import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap'
import BundleGameCard from './bundle-game-card';
import axios from 'axios';

const  API_GET_ALL_URL = "https://spring-video-games.azurewebsites.net/api/game/";

export default function Bundle({price, name, isEmployee, id, featured, games, openModal, modalTypeChange, 
        selectedBundleChange, selectedGameChange}){

    const bundle = {"id": id, "name": name, "featured": featured,
            "price": price, "games": games}
    
    

    function openTypeModal(type){
        modalTypeChange(type);
        const newBundle = {"id": bundle.id, "name": bundle.name,
            "featured": bundle.featured, "games": bundle.games}
        selectedBundleChange(bundle);
        openModal();
    }
    const gamesArray = games.map(game => (
        <BundleGameCard
            isEmployee={isEmployee}
            selectedBundleChange={selectedBundleChange}
            bundle={bundle}
            game={game}
            openModal={openModal}
            modalTypeChange={modalTypeChange}
            selectedGameChange={selectedGameChange} />
    ));
    return(
        <div>
            Name: {name}<br/>
            Price: ${price}<br/>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gridGap: "5px", paddingLeft: "30px", paddingRight: "30px", paddingBottom: "50px" }}>
                {gamesArray}
            </div>
            {isEmployee && <Button className="admin-button" href="#" onClick={() => openTypeModal("addToBundle")}>
                Add to Bundle
            </Button>
            }
        </div>
    )
}
