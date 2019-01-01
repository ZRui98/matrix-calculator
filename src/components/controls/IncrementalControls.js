import React from 'react';
import PropTypes from 'prop-types';

const incrementalControls = ({ changeValue, value, label }) => (
  <div className="dimensionWrapper">
    <div className="dimensionLabel">
      {label}
      :
    </div>
    <div className="dimensionControls">
      <input type="button" onClick={() => changeValue(value - 1)} value="-1" />
      <input
        className="dimensionInput"
        type="string"
        value={value}
        onChange={event => changeValue(event.target.value)}
      />
      <input type="button" onClick={() => changeValue(value + 1)} value="+1" />
    </div>
  </div>
);

incrementalControls.propTypes = {
  changeValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default incrementalControls;
