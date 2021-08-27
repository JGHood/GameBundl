import React, {useState, useEffect} from 'react';
import UserService from "../services/user.service";
import {Card, Button} from 'react-bootstrap';
import "../styles/game-card-style.css";

export default function VideoGameCard({id, name, developer, genre, price, openModal, modalTypeChange, selectedGameChange, isEmployee}){
    function openTypeModal(type){
        modalTypeChange(type);
        const game = {"id": id, "name": name, "developer": developer, "genre": genre, "price": price};
        selectedGameChange(game)
        openModal();
    }


    return(
        <Card className="game-card fade-in" style={{width: '15rem'}}>
            <Card.Header className="game-card-header">{name}</Card.Header>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{developer}</Card.Subtitle>
                <Card.Text>
                    {genre}
                </Card.Text>
                <Card.Text>
                    ${price}
                </Card.Text>
                { isEmployee && <Button className="admin-button" href="#" onClick={() => openTypeModal("edit")}>Edit Card</Button>}
            </Card.Body>
        </Card>
    )
}
