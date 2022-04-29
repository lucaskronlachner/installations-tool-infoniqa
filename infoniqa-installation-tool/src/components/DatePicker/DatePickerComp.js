import React from 'react';
import './DatePickerStyle.css';
import "../../App.css";


const Date_PickerComp = () => {
    return(
    <div className='container month_Container'>
        <MonthComponent ident={"A"} DayList={[1,2,3,4,5,6,7,8,9,10,11]}/>
    </div>
    )
}

class DayComponent extends React.Component{

    constructor(props){
        super(props)
        this._isSelected = props._isSelected;
        this.counter = props.counter
        this.listLength = props.listLength;
    }
    
    UpdateStyle = () => {
            let element = document.getElementById(`${this.props.ident}DayComp`)
            if(this._isSelected){
                element.style.backgroundColor = "var(--cornflower-blue)"
            }else{
                element.style.backgroundColor = "var(--snow-white)"
            }
    }

    HandleClick = () => {
        if(!this.props.getChecked()){
            this._isSelected = true
            this.props.setChecked()
        }

        if(this._isSelected && this.props.getChecked()){
            this.props.setChecked()
            this._isSelected = false
        }
        this.UpdateStyle()
    }

    render(){
        this.counter += 1
        this.breakStatment = (this.counter % this.listLength) === 0 ? <br className='breakLines'></br> : null
        return(
            <div className='container'>
                <div id={`${this.props.ident}DayComp`} className='dayComp' onClick={this.HandleClick}>
                    {
                    this.props.DayNumber
                    }
                </div>
                {this.breakStatment}
            </div>
        )
    }
}

class MonthComponent extends React.Component{
    constructor(props){
        super(props)
        this.check = this.check.bind(this)
        this.getcheck = this.getcheck.bind(this)
        this.state = {
            hasChecked: false,
        }
    }

    check(){
        this.setState({hasChecked:!this.state.hasChecked})
    }

    getcheck(){
        return this.state.hasChecked
    }

    render(){

        this.props.DayList.forEach((element, index) => {
            element = `${element}`
            if(element.length === 1){
                element = `0${element}`
            }
            this.props.DayList[index] = element
        });

        return(
            <div>
                {this.props.DayList.map((item, index) => (<DayComponent key={index + 0} counter={index} ident={`${this.props.ident}${index}`} DayNumber={item} listLength={5} setChecked={this.check} getChecked={this.getcheck}/>))}
            </div>
        )
    }

}


export default Date_PickerComp