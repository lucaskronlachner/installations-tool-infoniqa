
import React from 'react';

import './DatePickerStyle.css';


class DatePickerComp extends React.Component {
    constructor(props) {
        super(props)
        this.ref_year_input = React.createRef()
        this.ref_month_input = React.createRef()
        this.ref_date_numbers = React.createRef()
        this.ref_dates = React.createRef()
        this.years_list = React.createRef()
        this.ref_years_list = React.createRef()
        this.datepicker = React.createRef()
        this.selected_date = new Date()
        this.date_picker_button = React.createRef()
        this.onChange = props.onChange
    }

    componentDidMount() {
        const year_input = this.ref_year_input.current

        year_input.onclick = () => {
            let parent = year_input.parentElement
            if (parent.classList.contains('open')) {
                parent.classList.remove('open')
            } else {
                parent.classList.add('open')
            }
        }

        const picker_button_texts = this.date_picker_button.current.getElementsByClassName('date-picker-title-days')
        picker_button_texts[0].innerText = this.selected_date.getDate()
        picker_button_texts[1].innerText = this.selected_date.getMonth() + 1
        picker_button_texts[2].innerText = this.selected_date.getFullYear()

        this.loadDateNumbers()
    }
    loadDateNumbers() {
        const date_strings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let selected_date = this.selected_date || new Date()
        this.selected_date = selected_date

        const month_input = this.ref_month_input.current
        const year_input = this.ref_year_input.current
        const date_numbers = this.ref_date_numbers.current
        const dates = this.ref_dates.current.getElementsByTagName('td')

        month_input.innerText = date_strings[selected_date.getMonth()]
        year_input.innerText = selected_date.getFullYear()


        date_numbers.innerHTML = '<tr> <th>Mon</th> <th>Thu</th> <th>Wed</th> <th>Thi</th> <th>Fri</th> <th>Sat</th> <th>Sun</th> </tr>'

        let daysInMonth = new Date(selected_date.getFullYear(), selected_date.getMonth() + 1, 0).getDate();

        let startIndex = (selected_date.getDay() + 6) % 7
        let curr_row = document.createElement('tr')


        let days_fill_amount = daysInMonth + startIndex + ((7 - (daysInMonth + startIndex) % 7) % 7)
        
        for (let i = 0; i <= days_fill_amount; i++) {
            if ((i % 7 === 0 || i === days_fill_amount) && curr_row.hasChildNodes()) {
                date_numbers.appendChild(curr_row)
                curr_row = document.createElement('tr')
            }
            let date_element = document.createElement('td')
            date_element.onclick = () => {
                for (const dateInner of dates) {
                    dateInner.classList.remove('selected')
                }
                if (!date_element.classList.contains('selected')) {
                    date_element.classList.add('selected')
                    selected_date.setDate(parseInt(date_element.children[0].innerText))
                    this.changeHandler(selected_date)
                }
            }
            if (i >= startIndex && i < daysInMonth + startIndex) {
                let inner_date_element = document.createElement('div')
                inner_date_element.className = 'date-container'
                inner_date_element.innerText = i - startIndex + 1
                date_element.appendChild(inner_date_element)
            }
            curr_row.appendChild(date_element)
        }
    }
    reloadYearItems(amount) {
        const years_list_items = this.ref_years_list.current.getElementsByClassName('year-list-item')
        for (const years_list of years_list_items) {
            years_list.innerText = parseInt(years_list.innerText) + amount
        }
    }
    increaseYear() {
        this.selected_date.setFullYear(this.selected_date.getFullYear() + 1)
        this.loadDateNumbers()
        this.reloadYearItems(1)
    }
    decreaseYear() {
        this.selected_date.setFullYear(this.selected_date.getFullYear() - 1)
        this.loadDateNumbers()
        this.reloadYearItems(-1)
    }

    increaseMonth() {
        this.selected_date.setMonth(this.selected_date.getMonth() + 1)
        this.loadDateNumbers()
    }
    decreaseMonth() {
        this.selected_date.setMonth(this.selected_date.getMonth() - 1)
        this.loadDateNumbers()
    }
    toggleDatePicker() {
        if(this.datepicker.current.classList.contains('open')){
            this.datepicker.current.classList.remove('open')
        }else {
            this.datepicker.current.classList.add('open')
        }
    }
    changeHandler(date) {
        const picker_button_texts = this.date_picker_button.current.getElementsByClassName('date-picker-title-days')
        picker_button_texts[0].innerText = date.getDate()
        picker_button_texts[1].innerText = date.getMonth() + 1
        picker_button_texts[2].innerText = date.getFullYear()
        this.toggleDatePicker()
        this.onChange(date)
    }
    render() {
        return (
            <div className='datepicker' ref={this.datepicker}>
                <div className="datepicker-component">
                    <div className="datepicker-months-years-container">
                        <div onClick={() => { this.decreaseMonth() }} className="arrow-container"><i className="arrow left"></i></div>
                        <div className="datepicker-inner-months-years">
                            <p className="datepicker-month" ref={this.ref_month_input}>January</p>

                            <div className="year-picker-holder">
                                <p className="datepicker-year" ref={this.ref_year_input}>2022</p>
                                <div className="year-picker-container">
                                    <div className="year-picker-container-inner">
                                        <div className="year-overlay"></div>
                                        <ul className="years-list" ref={this.ref_years_list}>
                                            <li className="year-list-item clickable-year" onClick={() => { this.decreaseYear() }}>2021</li>
                                            <li className="year-list-item">2022</li>
                                            <li className="year-list-item clickable-year" onClick={() => { this.increaseYear() }}>2023</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div onClick={() => { this.increaseMonth() }} className="arrow-container"><i className="arrow right"></i></div>
                    </div>
                    <table className="datepicker-dates" ref={this.ref_dates}>
                        <tbody ref={this.ref_date_numbers}>
                            
                        </tbody>
                    </table>
                </div>
                <div className='date-picker-button' ref={this.date_picker_button} onClick={() => {this.toggleDatePicker()}}>
                    <div><p className='date-picker-title-days'>01.</p></div>
                    <div><p className='date-picker-title-days'>12.</p></div>
                    <div><p className='date-picker-title-days'>2022</p></div>
                </div>

            </div>
        )
    }
}

export default DatePickerComp