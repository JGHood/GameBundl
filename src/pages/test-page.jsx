import React, { useState, useEffect } from "react";
import SearchBar from '../components/search-bar'
import CardList from '../components/card-list'
import AddGame from '../components/manage-game'
import axios from "axios";
import AuthHeader from '../services/auth-header'
import RadioFilter from "../components/radio-filter";
import GameForm from '../components/game-form'
import {Card, Button} from 'react-bootstrap';
import "../styles/game-card-style.css";

const API_GET_ALL_URL = "https://spring-video-games.azurewebsites.net/api/game/"
const games = [{
    name: "Video Game Name1",
    developer: "Developer",
    genre: "Genre",
    price: "Price",
    id: 0
}]

function TestPage() {

    const price = 39.99;
    return ( 
        <div>
            <Card className="game-card fade-in"  style={{width: '15rem'}}>
            <Card.Header className="game-card-header">Halo: The Master Chief Collection</Card.Header>
            <Card.Body>
                
                <Card.Subtitle className="mb-2 text-muted">Bethesda, Inc.</Card.Subtitle>
                <Card.Text>
                    Action, Adventure
                </Card.Text>
                <Card.Text>
                    ${price}
                </Card.Text>
                <Button className="admin-button" href="#" >Edit Card</Button>
            </Card.Body>
        </Card>
        <Card className="game-card fade-in"  style={{width: '15rem'}}>
            <Card.Header className="game-card-header">Halo: The Master Chief Collection</Card.Header>
            <Card.Body>
                
                <Card.Subtitle className="mb-2 text-muted">Bethesda, Inc.</Card.Subtitle>
                <Card.Text>
                    Action, Adventure
                </Card.Text>
                <Card.Text>
                    ${price}
                </Card.Text>
                <Button className="admin-button" href="#" >Edit Card</Button>
                <Button className="admin-button" href="#" >Add to Bundle</Button>
            </Card.Body>
        </Card>
        </div>
    )
}
export default TestPage;

