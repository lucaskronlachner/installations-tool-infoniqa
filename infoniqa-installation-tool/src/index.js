import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Checkbox, SectionComp, SectionItemComp, FileUploadComp, DropDownComp, ColorPickerComp, TextInputField, SwitchComp, DatePickerComp, RadioComp, Button, DropDownMutliComp, DropDownInputComp} from './components/modules';
import ConverterComp from './Backend/Converter/convertJsonJS.js';
import TxtConverter from './Backend/Converter/convertTXTJS';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
      {/* <DropDownInputComp list={['tee', 'too']}></DropDownInputComp> */}
    {/* <SectionComp sectionHeader='Section Header 1'>
        <SectionItemComp header='File upload 1' info='upload your file here if you want lol'>
            <FileUploadComp></FileUploadComp>
        </SectionItemComp>
        <SectionItemComp header='File upload 2' info='upload your file here if you want lol'>
            <FileUploadComp></FileUploadComp>
        </SectionItemComp>
        <SectionItemComp header='File upload 3' info='upload your file here if you want lol'>
            <FileUploadComp></FileUploadComp>
        </SectionItemComp>
    </SectionComp>

    <SectionComp>
        <SectionItemComp header='Dropdown thing' info='make it drop'>
            <DropDownComp list={["mxngodazi", "wer?", "hot gfrogt", "funny", "yoo", "lasdjfölasjfd" ]}></DropDownComp>
        </SectionItemComp>
        <SectionItemComp header='Color Picker' info='choose dat color'>
            <ColorPickerComp pickerSize='150px'></ColorPickerComp>
        </SectionItemComp>
        <SectionItemComp header='Color Picker' info='choose dat color'>
            <ColorPickerComp></ColorPickerComp>
        </SectionItemComp>
        <SectionItemComp header='Do you want cheese on your burger?'>
            <SwitchComp isOn={true}/>
        </SectionItemComp>
        <SectionItemComp header='Anything you have to tell us?'>
            <TextInputField></TextInputField>
        </SectionItemComp>
        <SectionItemComp header='Date?'>
            <DatePickerComp/>
        </SectionItemComp>
    </SectionComp>
    <SectionComp>
        <SectionItemComp header='woop'>
            <Checkbox title='Title'/>
        </SectionItemComp>
        <SectionItemComp header='which one?'>
            <RadioComp itemList={['paul','ist', 'online', 'casino', 'süchtig']}/>
        </SectionItemComp>
        <SectionItemComp alignment='right' header='Submit'>
            <Button buttonStyle="btn--default--disabled" handleClick={() => console.log("you clicked me")}>Button</Button>
        </SectionItemComp>
    </SectionComp> */}
    {/*<ConverterComp file_url_json={'template_site.json'}></ConverterComp>*/}
    <TxtConverter template_src={} ></TxtConverter>

  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();