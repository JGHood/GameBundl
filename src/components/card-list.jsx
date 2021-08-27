import React, { useEffect, useState } from 'react'
import UserService from "../services/user.service"
import VideoGameCard from '../components/game-card'
import "../styles/game-card-style.css";

const games = [{
    name: "Video Game Name1",
    developer: "Developer",
    genre: "Genre",
    price: "Price"
}]

export default function CardList({ games, openModal, modalTypeChange, selectedGameChange }) {

    //Checks if a person is an employee or user to modify visibility of add button 
    const [isEmployee, setIsEmployee] = useState(false);
    useEffect(() => {
        setIsEmployee(false);
        UserService.getUser().then(resp => {
            if (resp != null) {
                if (resp.roleId == 2) {
                    setIsEmployee(true);
                }
            }
        })
    }, [localStorage.getItem('jwt')]) //updates if the JWT status changes

    const gamesArray = games.map(game => (
        <VideoGameCard
            id={game.id}
            name={game.name}
            developer={game.developer}
            genre={game.genre}
            price={game.price}
            openModal={openModal}
            modalTypeChange={modalTypeChange}
            selectedGameChange={selectedGameChange}
            isEmployee = {isEmployee}
        />
    ));
    return (
        <div className="card-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gridGap: "5px", paddingLeft: "30px", paddingRight: "30px", paddingBottom: "50px" }}>
            {gamesArray}
        </div>
    )
}