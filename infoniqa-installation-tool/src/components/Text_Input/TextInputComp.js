import * as React from "react";
import "./TextInputStyle.css";
import "../../App.css";

class TextInputComp extends React.Component {
    constructor(props) {
        super(props)
        this.title = props.title
        this.onChange = props.onChange
    }

    changeHandler (element) {
        this.onChange?.(element)
    }

    render() {
        return (
            <div className="text-input-comp">
                <input onChange={(event)=>{this.changeHandler(event.target)}} type="text" className="inputField" placeholder={this.title ?? 'Title'}></input>
            </div>
        )
    }
}

export default TextInputComp