import React from 'react';
import { useEffect, useState } from 'react';
import { Checkbox, SectionComp, SectionItemComp, FileUploadComp, DropDownComp, ColorPickerComp, TextInputField, SwitchComp, DatePickerComp, RadioComp, Button} from '../../components/modules';

const keyWords = [
    "username",
    "status",
    "password",
    "given_name",
    "family_name",
    "gender",
    "language",
    ""
]



class TxtConverter extends React.Component {

    constructor(props){
        super(props)
        this.txt_Url = props.template_src
        this._data = null
        this.setup()
    }

    setup = () => {
        fetch(require(`${this.txt_Url}`))
            .then(r => r.text())
            .then(text => {
                this._data = text.split('n/')
            });
    }

    sect_Factory = (sections) => {
        const _sect_Arr = []
        for(let i = 0; i < sections.length; i++){
            _sect_Arr.push(<SectionComp sectionHeader={sections[i]}></SectionComp>)
        }
        return _sect_Arr
    }

    render(){
        return(
            <div>
                Noo
            </div>
        )
    }
}

function PageContainer(props) {
    const folder_src = props.fldr_src
    const [template_src, setTemplate_src] = useState(props.tmplt_src)
    const [page_cntnt, setPage_cntnt] = useState(<div> Hello World </div>)

    useEffect(() => {
        setPage_cntnt(<TxtConverter template_src={template_src} ></TxtConverter>)
    }, [template_src])


    return(
        <div>
            {page_cntnt}
        </div>
    )


}

export default TxtConverter