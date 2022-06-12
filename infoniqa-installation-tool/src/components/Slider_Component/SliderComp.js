import * as React from "react";
import "./SliderComp.css";
import "../../App.css";

class TextInputComp extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = props.onChange
        this.state = {
            _valuesFrom: props.from ?? 0,
            _valuesTo: props.to ?? 100,
            value: props.current,
            _decimals: props.decimals ?? 0
        }
        this.ref_slider_inner = React.createRef()
        this.ref_slider = React.createRef()
        this.ref_value = React.createRef()
    }

    componentDidMount() {
        let innerSlider = this.ref_slider_inner.current
        let slider = this.ref_slider.current
        this.setValue(1)
        slider.onmousedown = event => {
            let sliderBounds = slider.getBoundingClientRect()
            let relativeX = event.clientX - sliderBounds.left
            let amount = this.clamp(relativeX / sliderBounds.width, 0, 1)
            this.setValue(amount)
            innerSlider.style.width = `${amount * 100}%`
            let mouseMoveEvent = event => {
                event.preventDefault()
                let relativeX = event.clientX - sliderBounds.left
                let amount = this.clamp(relativeX / sliderBounds.width, 0, 1)
                innerSlider.style.width = `${amount * 100}%`
                this.setValue(amount)
            }
            document.onmousemove = mouseMoveEvent;
            document.onmouseup = _ => {
                document.onmousemove = null
            }
        }
    }

    clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    setValue(percent) {
        this.ref_slider_inner.current.style.width = `${percent * 100}%`
        this.state.value = Math.round((this.state._valuesFrom + (this.state._valuesTo - this.state._valuesFrom) * percent) * Math.pow(10, this.state._decimals)) / Math.pow(10, this.state._decimals)
        this.ref_value.current.innerText = this.state.value
        this.changeHandler(this.ref_slider.current, percent)
    }

    changeHandler (element, percent) {
        this.onChange?.(element, percent)
    }

    render() {
        return (
            <div ref={this.ref_slider} className="slider-input">
                <div className="input-value-container">
                    <p className="input-value-indicator" ref={this.ref_value}>{this.state.value}</p>
                </div>
                <div ref={this.ref_slider_inner} className="slider-inner"></div>
            </div>
        )
    }
}

export default TextInputComp