import React, { useState, useEffect } from "react";
import SearchBar from '../components/search-bar'
import CardList from '../components/card-list'
import AddGame from '../components/manage-game'
import axios from "axios";
import AuthHeader from '../services/auth-header'
import RadioFilter from "../components/radio-filter";
import GameForm from '../components/game-form'
import "../styles/inventory-page.css";

const API_GET_ALL_URL = "https://spring-video-games.azurewebsites.net/api/game/"
const games = [{
    name: "Video Game Name1",
    developer: "Developer",
    genre: "Genre",
    price: "Price",
    id: 0
}]

function InventoryPage() {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearch] = useState([""]);
    const [searchType, setSearchType] = useState(["name"]);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState("add");
    const [game, setGame] = useState({ "name": 0, "developer": 0, "genre": 0, "price": 0, "id": 0 });
    const userToken = AuthHeader();

    // Fetches game data from Spring Boot Endpoint
    useEffect(() => {
        const fetchGames = async () => {
            const res = await axios({
                method: 'get',
                url: API_GET_ALL_URL + "getAllGames",
                headers: userToken,
            });
            setGames(res.data);
        };
        fetchGames();
    }, []);

    // Search Filter
    const reset = () => {
        const newTerm = [""];
        setSearch(newTerm);
    }
    const onSearchChange = (evt) => {
        const newTerm = evt.target.value;
        setSearch(newTerm);
    }
    const onSearchTypeChange = (evt) => {
        const newTerm = evt.target.value;
        setSearchType(newTerm);
    }
    function filterSwitch(game) {
        switch (searchType.toString()) {
            case "name":
                return game.name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase());
            case "developer":
                return game.developer.toString().toLowerCase().includes(searchTerm.toString().toLowerCase());
            case "genre":
                return game.genre.toString().toLowerCase().includes(searchTerm.toString().toLowerCase());
        }
    }
    const filteredGames = games.filter(filterSwitch);

    const modalTypeChange = (type) => {
        const newType = type;
        setModalType(newType);
    }

    const selectedGameChange = (game) => {
        const newGame = game;
        setGame(newGame);
    }
    const onAddGame = (evt) => {
        evt.preventDefault();
        const name = evt.target.name.value.toString();
        const developer = evt.target.developer.value.toString();
        const genre = evt.target.genre.value.toString();
        const price = parseFloat(evt.target.price.value.toString()).toFixed(2);
        const releaseDate = "2020-08-12T00:00:00.0000000";
       
        axios.post(API_GET_ALL_URL + "create", {
            name, developer, genre, price, releaseDate
        }, {headers: userToken}).then(() => {
            const newGames = games.concat({"name": name, "developer": developer, "genre": genre,
                "price": price, "releaseDate": releaseDate})
            setGames(newGames);
        });
    };
    const onEditGame = (evt) => {
        evt.preventDefault();
        const id = game.id;
        const price = parseFloat(evt.target.price.value.toString()).toFixed(2);
        axios.post(API_GET_ALL_URL + "editGame", {id, price}, {headers: userToken}).then(() => {
            const newGames = games.map(game => {
                if (game.id === id){
                    const updatedItem = {
                        ...game,
                        price: price,
                    };
                    return updatedItem;
                }
                return game;
            });
            setGames(newGames);
        });
    }
    return (
        <div className="inventory-page">
            <div className="inventory-elements">
                <SearchBar
                    onSearchChange={onSearchChange}
                    reset={reset}
                    searchTerm={searchTerm} />
                <RadioFilter
                    searchFilter={searchType}
                    onSearchTypeChange={onSearchTypeChange} />
                <AddGame
                    openModal={() => setModal(true)}
                    modalTypeChange={modalTypeChange} />
                <GameForm
                    show={modal}
                    onHide={() => setModal(false)}
                    modalType={modalType}
                    onAddGame={onAddGame}
                    onEditGame={onEditGame}
                    selectedGame={game} />
                <CardList
                    games={filteredGames}
                    openModal={() => setModal(true)}
                    modalTypeChange={modalTypeChange}
                    selectedGameChange={selectedGameChange} />
            </div>
        </div>
    )
}
export default InventoryPage;

