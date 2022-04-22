import React from 'react';
import './CheckboxStyle.css';

export default function CheckboxComp(props) {

    return (
        <div className='container'>
            <CheckboxList ident={props._ident} checkList={[true, false, false]} nameList={props.items} />
        </div>
    )
}

class CheckboxList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            _checkedList: props.checkList,
            _nameList: props.nameList,
            _ident : props.ident,
        }
    }

    render() {
        return (
            <ul className='checkListContainer'>
                {this.state._checkedList.map((item, index) => (<CheckButton key={index} keyVar={index} check={item} ident={this.state._ident} name={this.state._nameList[index]} />))}
            </ul>
        )
    }

}

class CheckButton extends React.Component {

    _IsChecked = false
    _Key = 0

    constructor(props) {
        super(props)
        this._Key = props.keyVar
        this._IsChecked = props.check
    }

    hashCode = (s) => {
        for (var i = 0, h = 0; i < s.length; i++)
            h = Math.imul(31, h) + String(s).charCodeAt(i) | 0;
        return h;
    }
    //Thank you Github Account: bryc
    
    handleClick = () => {
        this._IsChecked = !this._IsChecked
        let _checkbox = document.getElementById(`${this.props.ident}Box${this._Key}`)
        _checkbox.checked = this._IsChecked
    }

    render() {
        return (
            <div className='container'>
                <input id={`${this.props.ident}Box${this._Key}`} type="checkbox" defaultChecked={this._IsChecked} />
                <span className='boxClass' onClick={this.handleClick} />
                <h1 className='DescriptionText'>{this.props.name}</h1>
            </div>
        )
    }
}