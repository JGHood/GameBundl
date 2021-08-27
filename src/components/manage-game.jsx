import React, {useState, useEffect} from 'react';
import UserService from "../services/user.service";
import {Button} from "react-bootstrap";
import "../styles/game-card-style.css";

export default function AddGame({ openModal, modalTypeChange }) {
    function openTypeModal(type) {
        modalTypeChange(type);
        openModal();
    }

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
    }, [localStorage.getItem('jwt')])


    return (
        <>
            {isEmployee && <div style={{ position: "absolute", top: 105, right: 50 }}>
                <Button className="admin-button" onClick={() => openTypeModal("add")}>Add Game</Button>
            </div>}
        </>
    )
}