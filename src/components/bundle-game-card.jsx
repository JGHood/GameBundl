import React, {useState, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import "../styles/game-card-style.css";

export default function BundleGameCard({game, isEmployee, openModal, modalTypeChange, selectedGameChange, 
        bundle, selectedBundleChange}){
    function openTypeModal(type){
        modalTypeChange(type);
        const newGame = {"id": game.id, "name": game.name, "developer": game.developer, 
            "genre": game.genre, "price": game.price, "releaseDate": game.releaseDate};
        selectedGameChange(newGame);
        const newBundle = {"id": bundle.id, "name": bundle.name,
            "featured": bundle.featured, "games": bundle.games};
        selectedBundleChange(newBundle);
        openModal();
    }
    return (
        <Card className="game-card fade-in" style={{width: '15rem'}}>
        <Card.Header className="game-card-header">{game.name}</Card.Header>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{game.developer}</Card.Subtitle>
                <Card.Text>
                    {game.genre}
                </Card.Text>
                <Card.Text>
                    ${game.price}
                </Card.Text>
                {isEmployee && 
                <Button className="admin-button" href="#" 
                onClick={() => openTypeModal("removeFromBundle")}>Remove Game from Bundle</Button> }
            </Card.Body>
        </Card>
    )
}