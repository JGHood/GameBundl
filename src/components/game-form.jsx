import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default function GameForm(props){
    switch(props.modalType.toString()){
        case "add":
            return(
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Submit A New Game to the Inventory
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(evt) => onAdd(evt)}>
                        <Modal.Body>
                            <h4>Add Game</h4>
                            <div className="form-group">
                                <label>Game Name</label>
                                <input className="form-control" id="name" />
                            </div> 
                            <div className="form-group">
                                <label>Developer</label>
                                <input className="form-control" id="developer"
                                />
                            </div>
                            <div className="form-group">
                                <label>Genre</label>
                                <input className="form-control" id="genre" />
                            </div> 
                            <div className="form-group">
                                <label>Price</label>
                                <input className="form-control" id="price"
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Add</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            )
        case "edit":
            return(
                <Modal
                    {...props}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Alter {props.selectedGame.name.toString()}'s Price
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(evt) => onEdit(evt)}>
                        <Modal.Body>
                            <h4>Current Price: {props.selectedGame.price.toString()}</h4>
                            <div className="form-group">
                                <label>New Price</label>
                                <input className="form-control" id="price" required="true" placeholder="Enter a New Price"
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            )
    }
    function onEdit(evt){
        props.onEditGame(evt);
        props.onHide();
    }
    function onAdd(evt){
        props.onAddGame(evt);
        props.onHide();
    }
}