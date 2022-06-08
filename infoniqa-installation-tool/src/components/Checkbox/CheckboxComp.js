import React from 'react';
import './CheckboxStyle.css';

class CheckButton extends React.Component {

    constructor(props) {
        super(props)
        this.title = props.title
        this.state = {
            value: props.isChecked
        }
        this.onClick = props.onClick
        this.ref_checkbox = React.createRef()
    }
    
    handleClick = () => {
        const check_box = this.ref_checkbox.current
        if(check_box.classList.contains('checked')){
            check_box.classList.remove('checked')
            this.state.value = false
        }else{
            this.state.value = true
            check_box.classList.add('checked')
        }
        this.onClick?.(check_box, this.state.value)
    }

    render() {
        return (
            <div className="checkbox-container" onClick={()=>{this.handleClick()}} ref={this.ref_checkbox}>
                <div className="checkbox-component">
                    <span className="checkbox-check-element">
                        <div className="chech-svg-container">
                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg>
                        </div>
                    </span>
                    <span className='checkbox-title'>{this.title}</span>
                </div>
            </div>
        )
    }
}
export default CheckButton