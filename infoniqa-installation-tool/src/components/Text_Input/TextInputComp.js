import * as React from "react";
import "./TextInputStyle.css";
import "../../App.css";

export const TextInputField = (
) => {
    const title = 'Titel'

    return (
        <div>
            <form>
                <input type="text" className="inputField" placeholder={title}></input>
            </form>
            
        </div>
    )
    
}

export default TextInputField;