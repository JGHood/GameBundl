import React from 'react';
import {Button} from "react-bootstrap";
;
export default function AddBundle({openModal, modalTypeChange}){
    function openTypeModal(type) {
        modalTypeChange(type);
        openModal();
    }
    return(
        <div style={{ position: "absolute", top: 105, right: 50 }}>
            <Button className="admin-button" onClick={() => openTypeModal("addBundle")}>Start a New Bundle</Button>
        </div>
    )
}