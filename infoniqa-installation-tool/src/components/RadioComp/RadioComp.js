import * as React from 'react';
import './RadioStyle.css';
import "../../App.css";


 
class RadioComp extends React.Component{
  state = {
    value : "second",
    value2 : "third"
  }

  onChange = e => {
    this.setState({[e.target.name] : e.target.value})
  }

  render(){
    const {value, value2} = this.state;
    return(
      <form>
        <div className="body">
        <label>
          First
          <input type="radio"
            value="first"
            name="value"
            checked={value === "first"}
            onChange={this.onChange}
          />
        </label>
        <label>
          Second
          <input type="radio"
            value="second"
            name="value"
            checked={value === "second"}
            onChange={this.onChange}
          />
        </label>
        <br/>
        <br/>
        <label>
          Third
          <input type="radio"
            value="third"
            name="value2"
            checked={value2 === "third"}
            onChange={this.onChange}
          />
        </label>
        <label>
          Fourth
          <input type="radio"
            value="fourth"
            name="value2"
            checked={value2 === "fourth"}
            onChange={this.onChange}
          />
        </label>
        </div>
      </form>

    )
  }
}
export default RadioComp;