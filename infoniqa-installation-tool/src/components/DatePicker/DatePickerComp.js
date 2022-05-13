import React, { useState } from 'react';
import './DatePickerStyle.css';
import "../../App.css";

const _numberOMonths = 12
const _lengthYears = 20

const Date_PickerComp = (props) =>{

        const [_currentMonth] = useState(props.Month)
        const [_currentYear] = useState(props.Year)
        const [_ident] = useState(props.ident)
        const [_usedList, setUsedList] = useState(0)

        const handle = (value)  =>{
            setUsedList(_usedList + value)
        }

        return(
        <div>
        <div className='yearNMonth_Container'>
                    <YearNMonthCarusel curYear={_currentYear} curMonth={_currentMonth} usedList={_usedList} handler={handle}/>
                <div className='month_Container'>
                    <MonthComponent ident={_ident} usedList={_usedList} DayList={getDaysArray(_currentYear, _currentMonth)} MonthList={getMonthArray()} YearList={getYearArray(_currentYear)} handler={handle}/>
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

const getMonthArray = () => {
    const result = []
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for(let i = 0; i < _numberOMonths; i++){
        result.push(monthNames[i])
    }
    return result
}

const getYearArray = (Year) => {
    const result = []
    for (let index = 0; index < _lengthYears; index++) {
        result.push(Year + index)
    }
    return result
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
        let element = document.getElementById(`${this.props.ident}DayComp`)
        if(!this.props.getChecked()){
            this._isSelected = true
            this.props.setChecked()
            element.classList.add("dayComp_Clicked")
            element.classList.remove("dayComp")
        }

        if(this._isSelected && this.props.getChecked()){
            this.props.setChecked()
            this._isSelected = false
            element.classList.remove("dayComp_Clicked")
            element.classList.add("dayComp")
        }
        this.UpdateStyle()
    }

    render(){
        let counter = this.props.counter
        counter += 1
        this.breakStatment = (counter % this.props.listLength) === 0 ? <br className='breakLines'></br> : null
        return(
            <div className='DatePicker_container'>
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
        this.setUsedList = this.setUsedList.bind(this)
        this.usedList = props.usedList
        this.state = {
            hasChecked: false,
        }
    }

    setUsedList(){
        switch(this.props.usedList){
            case 1:
                this.props.YearList.forEach((element, index) => {
                    element = `${element}`
                    this.props.YearList[index] = element
                });
                this.UsingList = this.props.YearList
            break
            case 2:
                this.props.MonthList.forEach((element, index) => {
                    element = `${element}`
                    this.props.MonthList[index] = element
                });
                this.UsingList = this.props.MonthList
            break
            default: 
                console.log("No List")
                this.props.DayList.forEach((element, index) => {
                    element = `${element}`
                    if(element.length === 1){
                        element = `0${element}`
                    }
                    this.props.DayList[index] = element
                });
                this.UsingList = this.props.DayList
        }
    }

    check(){
        this.setState({hasChecked:!this.state.hasChecked})
    }

    getcheck(){
        return this.state.hasChecked
    }

    render(){
        this.setUsedList()
        
        return(
            <div className='datetime-dates-list'>
                {
                    this.UsingList.map((item, index) => (<DayComponent key={index + 0} counter={index} ident={`${this.props.ident}${index}`} DayNumber={item} listLength={5} setChecked={this.check} getChecked={this.getcheck}/>))
                }
            </div>
        )
    }

}

class YearNMonthCarusel extends React.Component{
    constructor(props){
        super(props)
        this.Month = props.curMonth
        this.Year = props.curYear
        
        this.handleMethod = props.handler
        this.value = "Days"
        this.state = {
            _clicked : 1
        }
    }

    componentDidMount = () => {
        switch(this.state._clicked){
            case 2:
                this.value = "Months"
            break
            case 1:
                this.value = "Years"
            break
            default: this.value = "Days"
        }
    } 

    handleClick = (event) =>{
        if(this.state._clicked <= 2){
            this.setState({
                _clicked: this.state._clicked + 1
            })
            this.handleMethod(this.state._clicked)

            switch(this.state._clicked){
                case 2:
                    this.value = "Months"
                break
                case 1:
                    this.value = "Years"
                break
                default:
                    this.value = "Years"
            }
        }
    }
   
    render(){
        return(
            <div>
                <label class='YearNMonth' onClick={(event) => this.handleClick(event)}>{this.value}</label>
            </div>
        )
    }
}


export default Date_PickerComp