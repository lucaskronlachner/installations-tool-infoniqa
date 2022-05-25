import React from 'react';
import { Checkbox, SectionComp, SectionItemComp, FileUploadComp, DropDownComp, ColorPickerComp, TextInputField, SwitchComp, DatePickerComp, RadioComp, Button} from '../components/modules';


const _items_identifier = "items"
const _comp_identifier = "component"
const _info_identifier = "info"
const _header_identifier = "header"



class Converter extends React.Component{

    constructor(props){
        super(props)
        this._fUrl = props.file_url_json
        this._data = null
        this.setup()
    }

    setup(){
        this._data = require(`../json/${this._fUrl}`)
    }

    sect_Factory(sections){ 
        const _sect_Arr = []
        for(let i = 0; i < sections.length; i++){
            _sect_Arr.push(<SectionComp sectionHeader={sections[i]}><ConvPart sect_items={this._data[sections[i]][_items_identifier]}></ConvPart></SectionComp>)
        }
        return _sect_Arr
    }

    render(){
        return (
            <div>
                {this.sect_Factory(Object.keys(this._data))}
            </div>
        )
    }
}

class ConvPart extends React.Component{

    constructor(props){
        super(props)
        this._sectionItems = props.sect_items
    }

    sect_items_Factory(){
        const _items_arr = []

        for(let i = 0; i < this._sectionItems.length; i++){
            let item = this._sectionItems[i]
            _items_arr.push(this.sect_items_comps(item))
        }
        
        return _items_arr
    }

    sect_items_comps(item){
       return <SectionItemComp header={item[_header_identifier]} info={item[_info_identifier]}>{ 
            this.sect_items_comps_switch(item)
       }</SectionItemComp>
    }

    sect_items_comps_switch(item){
        switch(Object.keys(item[_comp_identifier])[0]){
            case "dropdown":
                return item[_comp_identifier][Object.keys(item[_comp_identifier])[0]] !== {} ? <DropDownComp {...item[_comp_identifier][Object.keys(item[_comp_identifier])[0]]}></DropDownComp> : <DropDownComp></DropDownComp>
            case "radio":
                return item[_comp_identifier][Object.keys(item[_comp_identifier])[0]] !== {} ? <RadioComp {...item[_comp_identifier][Object.keys(item[_comp_identifier])[0]]}></RadioComp> : <RadioComp></RadioComp>
            case "colorpicker":
                return item[_comp_identifier][Object.keys(item[_comp_identifier])[0]] !== {} ? <ColorPickerComp {...item[_comp_identifier][Object.keys(item[_comp_identifier])[0]]}></ColorPickerComp> : <ColorPickerComp></ColorPickerComp>
            case "checkbox":
                return item[_comp_identifier][Object.keys(item[_comp_identifier])[0]] !== {} ? <Checkbox {...item[_comp_identifier][Object.keys(item[_comp_identifier])[0]]}></Checkbox> : <Checkbox></Checkbox>
            case "switchComp":
                return item[_comp_identifier][Object.keys(item[_comp_identifier])[0]] !== {} ? <SwitchComp {...item[_comp_identifier][Object.keys(item[_comp_identifier])[0]]}></SwitchComp> : <SwitchComp></SwitchComp>
            case "buttonComp":
                return item[_comp_identifier][Object.keys(item[_comp_identifier])[0]] !== {} ? <Button {...item[_comp_identifier][Object.keys(item[_comp_identifier])[0]]}></Button> : <Button></Button>
            case "fileUpComp":
                return <FileUploadComp></FileUploadComp>
            case "datePickerComp":
                return <DatePickerComp></DatePickerComp>
            case "textInputComp":
                return <TextInputField></TextInputField>
            default:
                throw Error("No such Component")
       }
    }

    render(){
        return(
            this.sect_items_Factory()
        )
    }

}

export default Converter; 