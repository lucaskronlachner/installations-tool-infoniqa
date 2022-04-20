import React from 'react';
import './DatePickerStyle.css';


const Date_PickerComp = () => {
    <div className='container'>
        <DayComponent Text='Fortnite'/>
    </div>
}

class DayComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            _selected: true,
        }
    }

    handleClick(){
        
    }

    render(){
        return(
            <div className='container'>
                <div className='dayComp' onClick={this.handleClick}>
                    {this.props.Text}
                </div>
            </div>
        )
    }
}




export default Date_PickerComp