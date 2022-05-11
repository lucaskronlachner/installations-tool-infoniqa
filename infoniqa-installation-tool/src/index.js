import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Checkbox from './components/Checkbox/CheckboxComp';
import reportWebVitals from './reportWebVitals';
import ColorPickerComp from './components/ColorPicker Component/ColorPickerComp';
import DropDownComp from './components/DropDown Component/DropDownComp';
import Button from './components/Button/ButtonComp';
import TextInputField from './components/Text_Input/TextInputComp';
import SwitchComp from './components/SwitchComp/SwitchComp';
import RadioComp from './components/RadioComp/RadioComp';
import DatePickerComp from './components/DatePicker/DatePickerComp';


ReactDOM.render(
  <React.StrictMode>
    <Checkbox _ident={'1'} items={["Herbert", "Rahel", "Fort"]}/>
    <ColorPickerComp pickerSize='150px'></ColorPickerComp>
    <DropDownComp list={["moiga", "lol", "funny", "peepe", "yoo", "lasdjfölasjfd" ]}></DropDownComp>
    <br></br>
    <Button buttonStyle="btn--default--solid" buttonSize="btn--medium">Button</Button>
    <br></br>
    <TextInputField></TextInputField>
    <RadioComp/>
    <SwitchComp isOn={true}/>
    <Checkbox _ident={'2'} items={["Herbert", "Rahel", "Fortnite"]}/>
    <DatePickerComp Year={2022} Month={3} ident={'1'}/>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
