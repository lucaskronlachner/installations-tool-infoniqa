import React from 'react';
import './SectionStyle.css';

class SectionItemComp extends React.Component {
    constructor(props) {
        super(props)
        this.header = props.header
        this.info = props.info
        this.children = props.children
        this.alignment = props.alignment
    }
    render() {
        return(
            <div className='section-item-component'>
                <div className='section-item-header-element'>
                    <h1>{this.header}</h1>
                    {(this.info != null)? 
                    <div className='info-element'>
                        <span className='info-button'>i</span>
                        <div className='info-hover-element'>{this.info}</div>
                    </div> : null}
                </div>
                <div className={`section-main-content ${this.alignment ?? ''}`}>
                    {this.children}
                </div>
            </div>
        )
    }

}
export default SectionItemComp 