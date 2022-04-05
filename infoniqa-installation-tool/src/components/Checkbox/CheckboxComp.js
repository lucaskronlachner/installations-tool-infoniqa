import React from 'react';
import './CheckboxStyle.css';

const checkboxComp = () => {

    return(
        <div className='container'>
            <CheckButton name="MyFriend"></CheckButton>
        </div>
    )
}

class CheckButton extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            name: props.name,
            check: false
        };
    }

    handleClick = () => {
        this.setState({check: (this.state.check !== true)})
    }
    
    render(){
        return (
            <div className='container'>
                <input type="checkbox" defaultChecked={this.state.check}/>
                <span className='boxClass' onClick={this.handleClick}/>
                <h1 className='DescriptionText'>{this.state.name}</h1>
            </div>
        )
    }
}

export default checkboxComp;