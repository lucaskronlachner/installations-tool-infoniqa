import React from 'react';
import './CheckboxStyle.css';

const checkboxComp = () => {

    return(
        <div className='container'>
            <a className='header_A'> Hello My Man</a>
            <CheckButton></CheckButton>
        </div>
    )
}

class CheckButton extends React.Component{
    
    render(){
        return (
            <div>
                <button className='checkBoxButton' onClick={() => {}}/>
            </div>
        )
    }
}

export default checkboxComp;