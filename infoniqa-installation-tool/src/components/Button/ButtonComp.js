import { style } from "@mui/system";
import React from "react";
import "./ButtonStyle.css";

const STYLES = [
    "btn--primary--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--primary--outline",
    "btn--danger--outline",
    "btn--success--outline",
]

const SIZES = [
    "btn--medium",
    "btn--large",
]

const Button = ({
    children,
    buttonStyle, 
    buttonSize
}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    const handleClick = (event) => {
        console.log('you clicked me!');
        
    }

    return (
        <div className="container">
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={handleClick}>{children}</button>
        </div>
    )
}

export default Button;