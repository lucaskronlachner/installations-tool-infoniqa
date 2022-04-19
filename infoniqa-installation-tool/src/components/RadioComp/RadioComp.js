import * as React from 'react';
import "../../App.css";


const RadioComp = () => {
  const [favorite, setFavorite] = React.useState('two');

  const handleOneChange = () => {
    setFavorite('one');
  };

  const handleTwoChange = () => {
    setFavorite('two');
  };

  return (
    <div>
      <RadioButton
        label="One"
        value={favorite === 'one'}
        onChange={handleOneChange}
      />
      <RadioButton
        label="Two"
        value={favorite === 'two'}
        onChange={handleTwoChange}
      />
    </div>
  );
};

const RadioButton = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default RadioComp;