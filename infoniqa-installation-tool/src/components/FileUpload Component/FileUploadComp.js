import React, { createRef } from 'react';
import './FileUploadStyle.css';

class FileUploadComp extends React.Component {

    constructor(props) {
        super(props)
        this.fileSelect = React.createRef()
    }

    componentDidMount() {
        this.fileSelect.current.onclick = () => {
            let input = document.createElement('input');
            input.type = 'file';
            input.onchange = _ => {
                // you can use this method to get file and perform respective operations
                let files = Array.from(input.files);
                this.fileSelect.current.innerHTML = files;
            };
            input.click();
        }
    }

    render() {
        return (
            <div ref={this.fileSelect} class="selectFile">Select File</div>
        )
    }
}
export default FileUploadComp;