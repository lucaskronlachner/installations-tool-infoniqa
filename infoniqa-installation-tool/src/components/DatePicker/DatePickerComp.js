import React, {useState} from 'react';
import './DatePickerStyle.css';
import "../../App.css";


const Date_PickerComp = (props) => {
    const [_currentYear, setcurrentYear] = useState(props.Year)
    const [_currentMonth, setcurrentMonth] = useState(props.Month)
    const [_ident] = useState(props.ident)

    return(
    <div>
       <div className='DatePicker_container yearNMonth_Container'>
                <YearNMonthCarusel curYear={_currentYear} setCurYear={setcurrentYear} curMonth={_currentMonth} setCurMonth={setcurrentMonth}/>
            <div className='DatePicker_container month_Container'>
                <MonthComponent ident={_ident} DayList={getDaysArray(_currentYear, _currentMonth)}/>
            </div>
        </div>
    </div>
    )
}

const getDaysArray = (year, month) => {
    const monthIndex = month - 1;
    const date = new Date(year, monthIndex, 1);
    const result = [];
    while (date.getMonth() === monthIndex) {
      result.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return result;
}

class DayComponent extends React.Component{

    constructor(props){
        super(props)
        this._isSelected = props._isSelected;
        this.loaded = false
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
        let counter = this.props.counter
        counter += 1
        this.breakStatment = (counter % this.props.listLength) === 0 ? <br className='breakLines'></br> : null
        return(
            <div className='datepicker-container'>
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
            <div className='datetime-dates-list'>
                {this.props.DayList.map((item, index) => (<DayComponent key={index + 0} counter={index} ident={`${this.props.ident}${index}`} DayNumber={item} listLength={5} setChecked={this.check} getChecked={this.getcheck}/>))}
            </div>
        )
    }

}

class YearNMonthCarusel extends React.Component{
    constructor(props){
        super(props)
        this.setMonth = props.setCurMonth
        this.setYear = props.setCurYear
        this.Month = props.curMonth
        this.Year = props.curYear
    }

    handleMonthClick = () =>{

    }

    changeYear = () => {
        console.log(this.Year)
        this.setYear(new Date(this.Year, this.Month))
    }

    render(){
        return(
            <div className=''>
                <label onClick={this.handleMonthClick()}>{this.Month}</label>
                <input id='yearInput' type='text' placeholder='yyyy' value={this.Year} onChange={(event) => {
                    this.changeYear()
                }}/>
            </div>
        )
    }
}


export default Date_PickerComp