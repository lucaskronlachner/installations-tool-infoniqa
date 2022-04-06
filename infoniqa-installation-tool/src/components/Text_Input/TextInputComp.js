import React from "react";
import "./TextInputStyle.css";


const STYLES = [
    "btn--primary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--primary--outline",
    "btn--warning--outline",
    "btn--danger--outline",
    "btn--success--outline",
]

const SIZES = [
    "txtInput--medium",
    "txtInput--large",
]
export const TextInputField = (
    size,
    
) => {

    return (
        <div className="container">
            <form title="idk" noValidate autoComplete="off">
                <input size={size} className="inputField" type="text" required></input>
            </form>
        </div>
    )
    
}

export default TextInputField;