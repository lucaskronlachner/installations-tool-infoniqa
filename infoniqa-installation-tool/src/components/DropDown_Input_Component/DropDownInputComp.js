import React from 'react'
import './DropDownInputStyle.css'

class DropDownInputComp extends React.Component {
    constructor(props) {
        super(props)
        this.dropdownContainer = React.createRef()
        this.state = {
            _list: (props.list == null) ? [] : props.list,
            value: (props.selected == null) ? "Select..." : props.selected
        }
    }
    componentDidMount() {
        let element = this.dropdownContainer.current
        element.onclick = () => {
            if (!element.classList.contains("dropdown-extended")) {
                element.classList.add("dropdown-extended")
            } else {
                element.classList.remove("dropdown-extended")
            }
            let dropdown_items = element.getElementsByTagName("li")
            for (const item of dropdown_items) {
                item.onclick = () => {
                    element.getElementsByClassName('dropdown-header-value-text')[0].value = item.innerText;
                    this.state.value = item.innerText
                }
            }
        }
        element.onkeyup = event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                element.classList.remove("dropdown-extended")
                this.state.value = element.value
                window.getSelection().removeAllRanges();
            }
        }
        element.onfocusout = () => {
            element.classList.remove("dropdown-extended")
            this.state.value = element.value
        }
    }
    render() {
        return (
            <div ref={this.dropdownContainer} className="dropdown">
                <div className="dropdown-header input">
                    <input className="dropdown-header-value-text" placeholder={this.state.value}></input>
                    <i class="arrow down"></i>
                </div>
                <ul className="dropdown-elements" aria-label="submenu">
                    {this.state._list.map((item,index) => {return (<li key={index}><div>{item}</div></li>)})}
                </ul>
            </div>
        )
    }
}
export default DropDownInputComp;