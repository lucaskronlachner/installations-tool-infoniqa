import React from 'react';
import './DatePickerStyle.css';
import "../../App.css";


const Date_PickerComp = () => {
    return(
    <div className='container'>
        <DayComponent DayNumber='13' ident={1} _isSelected={false}/>
    </div>
    )
}

class DayComponent extends React.Component{

    constructor(props){
        super(props)
        const _isSelected = props._isSelected;
    }
    
    UpdateStyle = () => {
        let element = document.getElementById(`${this.props.ident}DayComp`)
        if(this._isSelected){
            element.style.backgroundColor = "var(--cornflower-blue)"
        }else{
            element.style.backgroundColor = "transparent"
        }
    }

    HandleClick = () => {
        this._isSelected = !this._isSelected 
        this.UpdateStyle()
    }

    render(){
        return(
            <div className='container'>
                <div id={`${this.props.ident}DayComp`} className='dayComp' onClick={this.HandleClick}>
                    {this.props.DayNumber}
                </div>
            </div>
        )
    }
}


export default Date_PickerComp