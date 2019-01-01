import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../helpers/customPropTypes';
import IncrementalControls from './IncrementalControls';

class AdditionControls extends Component {
  changeRows = (value) => {
    const { changeRows, matrices } = this.props;
    matrices.forEach((matrix) => {
      changeRows(value, matrix.id);
    });
  }

  changeColumns = (value) => {
    const { changeColumns, matrices } = this.props;
    matrices.forEach((matrix) => {
      changeColumns(value, matrix.id);
    });
  }

  render() {
    const { matrices } = this.props;
    const { rows, columns } = matrices[0];
    return (
      <div>
        <IncrementalControls
          label="Rows"
          value={rows}
          changeValue={value => this.changeRows(value)}
        />
        <IncrementalControls
          label="Columns"
          value={columns}
          changeValue={value => this.changeColumns(value)}
        />
      </div>
    );
  }
}

AdditionControls.propTypes = {
  matrices: PropTypes.arrayOf(CustomPropTypes.Matrix).isRequired,
  changeRows: PropTypes.func.isRequired,
  changeColumns: PropTypes.func.isRequired,
};

export default AdditionControls;
