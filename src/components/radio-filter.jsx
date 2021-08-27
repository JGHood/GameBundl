import React from 'react';
import "../styles/game-card-style.css";

export default function RadioFilter({searchFilter, onSearchTypeChange}){
    return(
        <div style={{margin: "auto", padding:"10px 10px 40px 10px", width:"30%"}}>
          <form className="form-inline radio-form">
            <div className="radio-input" style={{paddingInline: "10px"}}>
                <input
                type="radio"
                name="react-tips"
                value="name"
                checked={searchFilter.toString() === "name"} // here for default before button clicked? 
                className="form-check-input"
                onChange={onSearchTypeChange}
                />
                Name
            </div>

            <div className="radio-input" style={{paddingInline: "10px"}}>
                <input
                type="radio"
                name="react-tips"
                value="developer"
                className="form-check-input"
                checked={searchFilter.toString() === "developer"}
                onChange={onSearchTypeChange}
                />
                Developer
            </div>

            <div className="radio-input" style={{paddingInline: "10px"}}>
                <input
                type="radio"
                name="react-tips"
                value="genre"
                className="form-check-input"
                checked={searchFilter.toString() === "genre"}
                onChange={onSearchTypeChange}
                />
                Genre
            </div>
        </form>
      </div>
    )
}