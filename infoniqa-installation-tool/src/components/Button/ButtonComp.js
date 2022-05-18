import React from "react";
import "./ButtonStyle.css";

const STYLES = [
    "btn--primary--solid",
    "btn--primary--disabled"
]

const Button = ({
    children,
    buttonStyle,
    handleClick
}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    
    return (
        <div className="container">
            <button className={`btn ${checkButtonStyle}`} onClick={handleClick}>{children}</button>
        </div>
    )
}

export default Button;