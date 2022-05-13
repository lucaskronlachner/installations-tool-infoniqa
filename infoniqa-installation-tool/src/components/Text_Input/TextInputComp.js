import * as React from "react";
import "./TextInputStyle.css";
import "../../App.css";

export const TextInputField = (
) => {
    const titel = 'Titel'
    const handleChange = (event) => {
    }

    return (
        <div>
            <form>
                <label htmlFor="app-input-field" className="inputLbl">{titel}</label>
                <br></br>
                <input type="text" className="inputField" placeholder={''} onChange={handleChange}></input>
            </form>
            
        </div>
    )
    
}

export default TextInputField;