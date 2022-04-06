import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Checkbox from './components/Checkbox/CheckboxComp';
import reportWebVitals from './reportWebVitals';
import Button from './components/Button/ButtonComp';
import TextInputField from './components/Text_Input/TextInputComp';
import SwitchComp from './components/SwitchComp/SwitchComp';

ReactDOM.render(
  <React.StrictMode>
    <Checkbox/>

    <Button
    type="button"
    buttonStyle="btn--default--solid"
<<<<<<< HEAD
    buttonSize="btn--medium">Press Me :)</Button>

    <TextInputField></TextInputField>
=======
    buttonSize="btn--medium">Button Text</Button>
    <TextInputField size="txtInput_large"></TextInputField>
    <SwitchComp isOn={true}/>
>>>>>>> 0a05c7295bc60190ec9e997bf9516ad1a7443209
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
