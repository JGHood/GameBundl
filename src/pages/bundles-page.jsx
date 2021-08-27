import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AuthHeader from '../services/auth-header'
import BundleList from '../components/bundle-list'
import AddBundle from '../components/add-bundle';
import BundleForm from '../components/bundle-form'
import UserService from "../services/user.service"

const API_BUNDLE = "https://spring-video-games.azurewebsites.net/api/bundle/"
const API_USER = "https://spring-video-games.azurewebsites.net/api/user/"
const API_GAME = "https://spring-video-games.azurewebsites.net/api/game/"

export default function BundlesPage() {
    // Config
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
    }, [localStorage.getItem('jwt')]);
    const [gamesList, setGamesList] = useState([]);
    const userToken = AuthHeader();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    const username = user.userName;
    const userRole = user.roleId;
    const [featuredBundles, setFeatured] = useState([]);
    const [userBundles, setUserBundles] = useState([]);
    const [userHasBundles, setUserHasBundles] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState("addBundle");
    const [selectedBundle, setSelectedBundle] = useState({"name": 0, 
        "price": 0, "games": 0, "id": 0, "featured": 0});
    const [selectedGame, setSelectedGame] = useState({});

    // Get games to be added
    useEffect(() => {
        const fetchGames = async () => {
            const res = await axios({
                method: 'get',
                url: API_GAME + "getAllGames",
                headers: userToken
            });
            setGamesList(res.data);
        };
        fetchGames();
    }, []);

    // Retrieve bundles and update state accordingly
    useEffect(() => {
        const fetchBundles = async () => {
            if(userRole !== 2){
                const res = await axios({
                    method: 'get',
                    url: API_USER + "bundles",
                    headers: userToken,
                    params: {"username": username},
                    }).then((res => {
                        setUserBundles(res.data);
                        setUserHasBundles(true);
                    }));
            }else{
                const res = await axios({
                    method: 'get',
                    url: API_BUNDLE + "getFeaturedBundles",
                    headers: userToken,
                    }).then((res => {
                        setFeatured(res.data);
                        setUserHasBundles(false);
                    }));
            }
        };
        fetchBundles();
    }, []);

    const gamesListChange = (games) => {
        const newList = games;
        setGamesList(newList);
    }
    // Callback for dynamic form handling
    const modalTypeChange = (type) => {
        const newType = type;
        setModalType(newType);
    }

    // Callback for selectedGameChange
    const selectedGameChange = (game) => {
        const newGame = {"id": game.id, "name": game.name,
             "developer": game.developer, "genre": game.genre, "price": game.price};
        setSelectedGame(newGame);
    }

    // Callback for selectedBundleChange
    const selectedBundleChange = (bundle) => {
        const newBundle = {"id": bundle.id, "name": bundle.name,
        "featured": bundle.featured, "games": bundle.games};
        setSelectedBundle(newBundle);
    }

    // Callback for Add Bundle Form Completion
    const onAddBundle = (evt, bundleGames) => {
        evt.preventDefault();
        const name = evt.target.name.value.toString();
        var featured = false;
        if(evt.target.featured.value.toString().toLowerCase() === "true"){
            featured = true;
        }
        const price = parseFloat(evt.target.price.value.toString()).toFixed(2);
        const games = bundleGames;
        const data = {
            "name": name, "featured": featured, "price": price, "games": games};
        axios(API_BUNDLE + "create", {
            method: 'post',
            headers: userToken,
            data: data
        }).then((res) => {
            const idL = res.data.message.toString().length;
            const gameIds = [];
            const test = games.map(game => {
                gameIds.push(game.id);
            })
            const bundleId = res.data.message.toString().substring(27, idL);
            console.log(bundleId);
            axios(API_BUNDLE + "addGame?bundleId=" + bundleId, {
                method: 'post',
                data: gameIds,
                headers: userToken
            }).then((res) => {
                const bundleIds = [bundleId];
                if(!isEmployee){
                    axios(API_USER + "addBundle?userId=" + userId, {
                        method: 'post',
                        data: bundleIds,
                        headers: userToken
                    }).then((res) => {
                    });
                }
                // here
                window.location.reload();
            })

        })
    };
    // Callback for Edit Bundle Form Completion
    const onEditBundleAdd = (evt, games) => {
        evt.preventDefault();
        const bundleId = selectedBundle.id;
        const gameIds = [];
        const test = games.map(game => {
            gameIds.push(game.id);
        });
        try{
            axios(API_BUNDLE + "addGame?bundleId=" + bundleId, {
                method: 'post',
                data: gameIds,
                headers: userToken
            }).then((res) => {
                // new
                const newBundles = featuredBundles.map(bundle => {
                    if(bundle.id === bundleId){
                        const updatedGames = bundle.games.concat(games);
                        const updatedBundle = {
                            ...bundle,
                            games: updatedGames,
                        };
                        return updatedBundle;
                    }
                    return bundle;
                });
                setFeatured(newBundles);
                // end new
            })
        }catch(error){
            console.log(error);
        }
    }
    const onEditBundleRemove = (evt) => {
        evt.preventDefault();
        const gameId = selectedGame.id;
        const bundleGames = selectedBundle.games;
        const games = bundleGames.filter(game => {
            if (game.id === gameId){
                return false;
            }
            return true;
        });
        console.log(JSON.stringify(games));
        const id = selectedBundle.id;
        axios.post(API_BUNDLE + "editBundle", {id, games}, {headers: userToken})
        .then((res) => {
            if (userBundles === undefined || userBundles.length == 0){
                const newBundles = featuredBundles.map(bundle => {
                    if(bundle.id === id){
                        const updatedBundle = {
                            ...bundle,
                            games: games,
                        };
                        return updatedBundle;
                    }
                    return bundle;
                });
                setFeatured(newBundles);
            }else{
                const newBundles = userBundles.map(bundle => {
                    if(bundle.id === id){
                        const updatedBundle = {
                            ...bundle,
                            games: games,
                        };
                        return updatedBundle;
                    }
                    return bundle;
                });
                setUserBundles(newBundles);
            }
        });
        
    }
    return(
        <div>
            <AddBundle 
                openModal={() => setModal(true)}
                modalTypeChange = {modalTypeChange}/>
            <BundleForm 
                isEmployee={isEmployee}
                gamesList={gamesList}
                show={modal} 
                onHide={() => setModal(false)}
                modalType={modalType}
                onAddBundle={onAddBundle} 
                onEditBundleAdd={onEditBundleAdd}
                onEditBundleRemove={onEditBundleRemove}
                selectedBundle={selectedBundle}
                selectedGame={selectedGame}/>
            <BundleList 
                isEmployee={isEmployee}
                gamesListChange={gamesListChange}
                userToken={userToken}
                userBundles={userBundles} 
                featuredBundles={featuredBundles}
                userHasBundles={userHasBundles}
                username={username}
                openModal={() => setModal(true)}
                modalTypeChange={modalTypeChange}
                selectedBundleChange={selectedBundleChange}
                selectedGameChange={selectedGameChange}/>
        </div>
    );
}