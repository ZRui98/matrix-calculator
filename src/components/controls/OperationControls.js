import React from 'react';
import PropTypes from 'prop-types';
import Operations from '../../helpers/operations';

const operations = ({ changeOperation }) => {
  const options = Object.keys(Operations).map(
    x => <option key={x} value={Operations[x]}>{Operations[x]}</option>,
  );
  return (
    <label htmlFor="operations">
      Operation:
      <select id="operations" onChange={event => changeOperation(event.target.value)}>{options}</select>
    </label>
  );
};

operations.propTypes = {
  changeOperation: PropTypes.func.isRequired,
};

export default operations;
