import * as React from 'react';
import './RadioStyle.css';
import "../../App.css";
import CheckButton from '../Checkbox/CheckboxComp';



class RadioComp extends React.Component {

    constructor(props) {
        super(props)
        this.itemList = props.itemList
        this.selectedItemIndex = props.selectedItemIndex
        this.selectedItem = this.itemList[this.selectedItemIndex]
        this.ref_radiocomp = React.createRef()
    }

    handleClickCheckButton(element) {
        const checkBoxes = this.ref_radiocomp.current.getElementsByClassName('checkbox-container')
        for (const checkBox of checkBoxes) {
            checkBox.classList.remove('checked')
        }
        element.classList.add('checked')
    }

    render() {
        return (
            <div className='radiocomp' ref={this.ref_radiocomp}>
                {this.itemList.map(x => (<CheckButton onClick={(element)=>this.handleClickCheckButton(element)} title={x}></CheckButton>))}
            </div>
        )
    }
}
export default RadioComp;