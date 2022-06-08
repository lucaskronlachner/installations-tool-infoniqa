import * as React from "react";
import "./SliderComp.css";
import "../../App.css";

class TextInputComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _valuesFrom: props.from,
            _valuesTo: props.to,
            _currentValue: props.current,
            _title: props.title
        }
        this.ref_slider = React.createRef()
    }

    setValue(value) {
        this.ref_input.current.value = value
    }

    changeHandler (element) {
        this.onChange?.(element)
    }

    render() {
        return (
            <div className="text-input-comp">
                <input ref={this.ref_input} value={this.value} onChange={(event)=>{this.changeHandler(event.target)}} type="text" className="inputField" placeholder={this.title ?? 'Title'}></input>
            </div>
        )
    }
}

export default TextInputComp