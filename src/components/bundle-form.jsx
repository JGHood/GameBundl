import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'


export default function BundleForm(props){
    const gamesListSelect = props.gamesList.map(game => {
        return {"value": game, "label": (game.name + ", $" + game.price)}
    })
    const [selectedGames, setSelectedGames] = useState([]);
    switch(props.modalType.toString()){
        case "addBundle":
            return(
                <Modal
                    {...props}
                    size="sm"
                    centered
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create Bundle
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(evt) => onAddBundle(evt)}>
                        <Modal.Body>
                            <div className="form-group">
                                <label>Bundle Name</label>
                                <input className="form-control" id="name" />
                            </div> 
                            <div className="form-group">
                                <label>Featured</label>
                                <input className="form-control" id="featured" />
                            </div> 
                            <div className="form-group">
                                <label>Price</label>
                                <input className="form-control" id="price"
                                />
                            </div>
                            <Select isMulti options={gamesListSelect} onChange={handleChange}/> 
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            )
        case "removeFromBundle":
            return(
                <Modal
                    {...props}
                    size="sm"
                    centered
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                           Remove {props.selectedGame.name.toString()}?
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(evt) => onEditBundleRemove(evt)}>
                        <Modal.Body>
                            <p>Remove From Bundle</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Confirm</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            )
        case "addToBundle":
            return(
                <Modal
                    {...props}
                    size="sm"
                    centered
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                           Add to Bundle
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(evt) => onEditBundleAdd(evt)}>
                        <Modal.Body>
                            <div className="form-group">
                                <label>Add to Bundle</label>
                                <Select isMulti options={gamesListSelect} onChange={handleChange}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Confirm</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            )
    }
    function handleChange(selectedGames){
        const games = selectedGames.map(game => {
            return game.value;
        });
        setSelectedGames(games);
    }
    function onEditBundleRemove(evt){
        props.onEditBundleRemove(evt);
        props.onHide();
    }
    function onEditBundleAdd(evt){
        props.onEditBundleAdd(evt, selectedGames);
        props.onHide();
    }
    function onAddBundle(evt){
        props.onAddBundle(evt, selectedGames);
        props.onHide();
    }
}