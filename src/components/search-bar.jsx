import React from 'react'
import {FaTimesCircle} from 'react-icons/fa'

export default function SearchBar({onSearchChange, reset, searchTerm}){
    return(
        <div className="container">
            <div id="content" style={{padding: "3% 25% 0% 25%"}}>
                <form className='form-inline'>
                    <div className="input-group" style={{width: "100%"}}>
                        <input type='text' onChange={onSearchChange} value={searchTerm} className="form-control search-form" placeholder="Search Video Game Inventory" style={{borderRadius: "30px 0 0 30px"}}/>
                            <span className="input-group-btn" style={{width: "39px"}}>
                                <button id="search-this"type="button" className="pull-right btn btn-default search-btn" onClick={reset}
                                    style={{cursor: "pointer", borderRadius: "0 30px 30px 0", backgroundColor: "#fff", color: "#669"}}>
                                    <FaTimesCircle/>
                                </button>
                            </span>
                    </div>
                </form>
            </div>
        </div>
    );
}