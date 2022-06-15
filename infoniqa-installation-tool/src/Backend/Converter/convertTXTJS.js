import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Checkbox, SectionComp, SectionItemComp, FileUploadComp, DropDownComp, ColorPickerComp, TextInputField, SwitchComp, DatePickerComp, RadioComp, Button} from '../../components/modules';

const keyWords = [
    "username",
    "status",
    "password",
    "given_name",
    "family_name",
    "gender",
    "language",
    "#",
    "else"
]

const keyInfos = [
    ["username", {
        "_header_identifier": "Enter your Username:",
        "_info_identifier" : "The Text entered will be used as the Username for this User",
        "_component": "TextField"
    }],
    ["status", {
        "_header_identifier": "Select the Status:",
        "_info_identifier": "Select the state you like this User to have",
        "_component": "Checkboxes-status"
    }],
    ["password", {
        "_header_identifier": "Enter your very Secret Password:",
        "_info_identifier": "The Text entered will be used as the Password for this User",
        "_component": "TextField"
    }],
    ["given_name", {
        "_header_identifier": "Enter your Firstname:",
        "_info_identifier": "The Text entered will be used as the Firstname for this User",
        "_component": "TextField"
    }],
    ["family_name", {
        "_header_identifier": "Enter your Lastname:",
        "_info_identifier": "The Text entered will be used as the Lastname for this User",
        "_component": "TextField"
    }],
    ["gender", {
        "_header_identifier": "Select your Gender:",
        "_info_identifier": "Select the Gender you like this User to have",
        "_component": "Checkboxes-gender"
    }]
]

function ConvComp(props){
    
    const attri_Controls = props.controls
    const attri_Configs = props.Configs

    const sect_items_comps_switch = ((item) => {
        switch(item){

        }
    })

    const sect_items_comps = ((item) => {
        return <SectionItemComp header={item["_header_identifier"]} info={item["_info_identifier"]}>{ 
             sect_items_comps_switch(item["_component"])
        }</SectionItemComp>
     })

    return(
        <div>
            
        </div>
    )
}

function TxtConverter(props){

    const txt_Url = props.template_src
    let data = useRef(null)
    const [_sect_Arr, updateArr] = useState([])

    useEffect(() => {
        console.log('Rerender Page')
    },[_sect_Arr])

    const get_Sections = (() => {
        const sections = []
        for(let item of data.current){
            if(item.trim().includes("[",0)){
                sections.push(item.trim().substring(1, item.trim().length - 1))
            }
        }
        return sections
    })

    const get_Sect_Attri = ((section) => {
        const attri_Arr = []
        const stopper = '#'
        let push = false
        for(let item of data.current){
            if(`[${section.trim()}]` === item.trim()){
                push = true
            }
            else if(stopper === item.trim()){
                push = false
            }
            if(push){attri_Arr.push(item.trim().split(" ")[0])}
        }
        return attri_Arr
    })

    const get_Configs_Attri = (() => {
        let curr_Arr = []
        const configs_Arr = []
        const identifier = '#'
        for(let item of data.current){
            if(item[0] === identifier && item.trim() !== identifier){
                for(let str of item.split(' = ')[1].trim().split(/, *|,/)){
                    curr_Arr.push(str)
                }
                let object = {
                    "name" : item.split(' = ')[0].split(/# */)[1].trim(),
                    "Configs" : curr_Arr
                }
                configs_Arr.push(object)
                curr_Arr = []
            }
        }
        return configs_Arr
    })

    const sect_Factory = (() => {
        let sections = get_Sections()
        const Arr = []
        for(let i = 0; i < sections.length; i++){
            Arr.push(<SectionComp key={`${i}${sections[i]}`} sectionHeader={sections[i]}><ConvComp controls={get_Sect_Attri(sections[i])} Configs={get_Configs_Attri()}></ConvComp></SectionComp>)
        }
        updateArr(x => x = Arr)
    })

    const get_SectArray = (() => {
        return _sect_Arr
    })

    useEffect(() => {
        let unmounted = false
        if(!unmounted && data.current === null){
            async function fetchTxt() {
                let response = await fetch(require(`../../../txt/Info${txt_Url}`))
                let rslt = await response.text()
                return rslt
            }
            fetchTxt().then(x => {
                data.current = x.split('\r\n')
                sect_Factory()
            })
        }

        return () => {
            unmounted = true
        }
    })

        return(
            <div>
                {get_SectArray()}
            </div>
        )
}

function PageContainer(props) {
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

export default PageContainer