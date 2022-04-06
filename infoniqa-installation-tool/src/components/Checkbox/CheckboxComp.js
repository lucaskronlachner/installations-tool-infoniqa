import React from 'react';
import './CheckboxStyle.css';

const checkboxComp = () => {

    return(
        <div className='container'>
            <CheckboxList checkList={[true, false, false]} nameList={["Herbert", "Leo", "England"]}/>
        </div>
    )
}

class CheckboxList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            checkedList: props.checkList,
            nameList: props.nameList,
        }
    }

    render(){
        return(
            <ul className='checkListContainer'>
            {this.state.checkedList.map((item, index) => (<CheckButton key={index} keyVar={index} check={item} name={this.state.nameList[index]} />))}
            </ul>
        )
    }

}

class CheckButton extends React.Component{

    _IsChecked = false;
    _Key = 0

    constructor(props){
        super(props)
        this._Key = props.keyVar
        this._IsChecked = props.check
    }

    handleClick = () => {
        this._IsChecked = this._IsChecked !== true
       var checkbox = document.getElementById(`Box${this._Key}`)
       checkbox.checked = this._IsChecked
    }
    
    render(){
        return (
            <div className='container'>
                <input id={`Box${this._Key}`} type="checkbox" defaultChecked={this._IsChecked}/>
                <span className='boxClass' onClick={this.handleClick}/>
                <h1 className='DescriptionText'>{this.props.name}</h1>
            </div>
        )
    }
}

export default checkboxComp;