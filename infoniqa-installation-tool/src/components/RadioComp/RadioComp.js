import * as React from 'react';
import {useRef} from 'react'
import './RadioStyle.css';
import "../../App.css";
import CheckButton from '../Checkbox/CheckboxComp';



class RadioComp extends React.Component {

    constructor(props) {
        super(props)
        this.itemList = props.itemList
        this.state = {
            valueIndex: props.selectedItemIndex,
            value: (this.valueIndex !== undefined) ? this.itemList[this.valueIndex] : null
        }
        this.ref_radiocomp = React.createRef()
    }

    handleClickCheckButton(element, state, index) {
        const checkBoxes = this.ref_radiocomp.current.getElementsByClassName('checkbox-container')
        for (const checkBox of checkBoxes) {
            checkBox.classList.remove('checked')
        }
        this.state.value = state
        this.state.valueIndex = index
        element.classList.add('checked')
    }

    render() {
        return (
            <div className='radiocomp' ref={this.ref_radiocomp}>
                {this.itemList.map((x,index) => (<CheckButton key={index} onClick={(element, state)=>this.handleClickCheckButton(element, state, index)} title={x}></CheckButton>))}
            </div>
        )
    }
}
export default RadioComp;