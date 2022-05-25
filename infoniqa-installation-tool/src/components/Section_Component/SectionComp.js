import React from 'react';
import './SectionStyle.css';

class SectionComp extends React.Component {
    constructor(props) {
        super(props)
        this.children = props.children
        this.sectionHeader = props.sectionHeader
    }
    render() {
        let hasHeader = this.sectionHeader != null
        return(
            <div className={`section-component ${(hasHeader) ? 'with-header' : ''}`}>
                {(hasHeader) ? <div className='section-component-header'>{this.sectionHeader}</div> : null}
                {this.children}
            </div>
        )
    }

}
export default SectionComp 