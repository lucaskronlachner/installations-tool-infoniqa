import * as React from "react";
import "./TextInputStyle.css";
import "../../App.css";

export const TextInputField = (
) => {

    const handleChange = (event) => {
        const {value} = event.target;
        
    }

    return (
        <div>
            <form>
                
                <label htmlFor="app-input-field">{}</label>
                <input type="text" className="inputField" placeholder={''} onChange={handleChange}></input>
            </form>
            
        </div>
    )
    
}

export default TextInputField;