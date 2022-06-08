import React from 'react'
import './DropDownMultiStyle.css'

class DropDownComp extends React.Component {
    constructor(props) {
        super(props)
        this.dropdownContainer = React.createRef()
        this.dropdownList = React.createRef()
        this.dropdownHeader = React.createRef()

        this.state = {
            _list: (props.list == null) ? [] : props.list,
            _selected: (props.selected == null) ? "Select..." : props.selected,
            value: []
        }
    }
    componentDidMount() {
        let element = this.dropdownContainer.current
        this.dropdownHeader.current.onclick = () => {
            if (!element.classList.contains("dropdown-extended")) {
                element.classList.add("dropdown-extended")
            } else {
                element.classList.remove("dropdown-extended")
            }
            let dropdown_items = element.getElementsByTagName("li")
            for (const item of dropdown_items) {
                item.onclick = () => {
                    if(this.state.value.includes(item.innerText)){
                        item.classList.remove('selected')
                        const index = this.state.value.indexOf(item.innerText);
                        if (index > -1) {
                            this.state.value.splice(index, 1); // 2nd parameter means remove one item only
                        }
                        element.getElementsByClassName('dropdown-header-value-text')[0].innerHTML = this.state.value.join(', ').length <= 0 ? 'Select...' : this.state.value.join(', ')
                    }else{
                        this.state.value.push(item.innerText)
                        element.getElementsByClassName('dropdown-header-value-text')[0].innerHTML = this.state.value.join(', ').length <= 0 ? 'Select...' : this.state.value.join(', ')
                        for (const listItem of this.dropdownList.current.getElementsByTagName('li')) {
                            if(this.state.value.includes(listItem.innerText)){
                                listItem.classList.add('selected')
                            }else{
                                listItem.classList.remove('selected')
                            }
                        }
                    }
                }
            }
        }
    }
    render() {
        return (
            <div ref={this.dropdownContainer} className="dropdown">
                <div ref={this.dropdownHeader} className="dropdown-header">
                    <div className="dropdown-header-value-text">{this.state._selected}</div>
                    <i class="arrow down"></i>
                </div>
                <ul ref={this.dropdownList} className="dropdown-elements" aria-label="submenu">
                    {this.state._list.map((item,index) => {return (<li key={index}><div>{item}</div></li>)})}
                </ul>
            </div>
        )
    }
}
export default DropDownComp;