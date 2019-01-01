import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../helpers/customPropTypes';
import IncrementalControls from './IncrementalControls';

class ReduceControls extends Component {
  changeRows = (value, matrixID) => {
    const { changeRows } = this.props;
    changeRows(value, matrixID);
  }

  changeColumns = (value, matrixID) => {
    const { changeColumns } = this.props;
    changeColumns(value, matrixID);
  }

  render() {
    const { matrix } = this.props;
    const { rows, columns, id: matrixID } = matrix;
    return (
      <div>
        <IncrementalControls
          label="Rows"
          value={rows}
          changeValue={value => this.changeRows(value, matrixID)}
        />
        <IncrementalControls
          label="Columns"
          value={columns}
          changeValue={value => this.changeColumns(value, matrixID)}
        />
      </div>
    );
  }
}

ReduceControls.propTypes = {
  matrix: CustomPropTypes.Matrix.isRequired,
  changeRows: PropTypes.func.isRequired,
  changeColumns: PropTypes.func.isRequired,
};

export default ReduceControls;
