import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Checkbox from './components/Checkbox/CheckboxComp';
import reportWebVitals from './reportWebVitals';
import Button from './components/Button/ButtonComp';
import TextInputField from './components/Text_Input/TextInputComp';

ReactDOM.render(
  <React.StrictMode>
    <Checkbox/>

    <Button onClick={() =>{console.log("You Clicked on Me!")}}
    type="button"
    buttonStyle="btn--default--solid"
    buttonSize="btn--medium">Button Text</Button>
    <TextInputField size="txtInput_large"></TextInputField>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
