import * as React from 'react';
import './RadioStyle.css';
import "../../App.css";
import CheckButton from '../Checkbox/CheckboxComp';



class RadioComp extends React.Component {

    constructor(props) {
        super(props)
        this.itemList = props.itemList
        this.state = {
            value: this.itemList[this.state.selectedItemIndex],
            valueIndex: props.selectedItemIndex
        }
        this.ref_radiocomp = React.createRef()
    }

    handleClickCheckButton(element, index) {
        const checkBoxes = this.ref_radiocomp.current.getElementsByClassName('checkbox-container')
        for (const checkBox of checkBoxes) {
            checkBox.classList.remove('checked')
        }
        this.state.value = element.state.value
        this.state.valueIndex = index
        element.classList.add('checked')
    }

    render() {
        return (
            <div className='radiocomp' ref={this.ref_radiocomp}>
                {this.itemList.map((x,index) => (<CheckButton key={index} onClick={(element, index)=>this.handleClickCheckButton(element)} title={x}></CheckButton>))}
            </div>
        )
    }
}
export default RadioComp;