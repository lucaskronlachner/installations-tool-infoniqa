import React from 'react';
import "./RadioStyle.css";

const radioButtonComp = () => {
    return(
        <div className='container'>
            <RadioButton name="TheTest"></RadioButton>
        </div>
    )
}

class RadioButton extends React.Component{

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
        return(
            <div className='container'>
                <input type="radio" defaultChecked={this.state.check}/>
                <span className='radioClass' onClick={this.handleClick}/>
                <h1 className='Description'>{this.state.name}</h1>
            </div>
        )
    }

}

export default radioButtonComp;
















