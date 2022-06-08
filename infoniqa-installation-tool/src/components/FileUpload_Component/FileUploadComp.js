import React, { createRef } from 'react';
import './FileUploadStyle.css';

class FileUploadComp extends React.Component {

    constructor(props) {
        super(props)
        this.fileSelect = React.createRef()
        this.state = {
            value: ""
        }
    }

    componentDidMount() {
        this.fileSelect.current.onclick = () => {
            let input = document.createElement('input');
            input.type = 'file';
            input.onchange = _ => {
                // you can use this method to get file and perform respective operations
                let files = Array.from(input.files);
                this.fileSelect.current.innerHTML = files[0].name;
                this.setState({value : files[0]})
            };
            input.click();
        }
    }

    render() {
        return (
            <div ref={this.fileSelect} className="selectFile">Select File</div>
        )
    }
}
export default FileUploadComp;