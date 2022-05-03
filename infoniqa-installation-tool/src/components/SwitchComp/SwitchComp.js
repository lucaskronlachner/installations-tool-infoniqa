import React , {useState}from 'react';
import './SwitchStyle.css';
import "../../App.css";

  
const SwitchComp = (props) => {
    const [isOn, setIsOn] = useState(props.On)

    return (
      <>
      <div className="container">
        <input checked={isOn} onChange={() => { setIsOn(!isOn) }}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />


        <label
        style={{background: isOn && 'var(--cornflower-blue)'}}
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
        </div>
      </>
    );
  };

export default SwitchComp;