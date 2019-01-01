import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../helpers/customPropTypes';
import IncrementalControls from './IncrementalControls';

class MultiplicationControls extends Component {
  constructor(props) {
    super(props);

    const { matrices } = props;
    this.matrix = matrices.find(matrix => matrix.type === 'input');
  }

  changeRows = (value, matrixID) => {
    const { changeRows } = this.props;
    changeRows(value, matrixID);
  }


  changeColumns = (value, matrixID) => {
    const { changeColumns } = this.props;
    changeColumns(value, matrixID);
  }

  changeDependantDimension = (value) => {
    const { matrices } = this.props;
    this.changeColumns(value, matrices[0].id);
    this.changeRows(value, matrices[1].id);
  }

  render() {
    const { matrices } = this.props;
    const { rows, columns } = matrices[0];
    return (
      <div>
        <IncrementalControls
          label="Rows"
          value={rows}
          changeValue={value => this.changeRows(value, matrices[0].id)}
        />
        <IncrementalControls
          label="Dependant"
          value={columns}
          changeValue={value => this.changeDependantDimension(value)}
        />
        <IncrementalControls
          label="Columns"
          value={matrices[1].columns}
          changeValue={value => this.changeColumns(value, matrices[1].id)}
        />
      </div>
    );
  }
}

MultiplicationControls.propTypes = {
  matrices: PropTypes.arrayOf(CustomPropTypes.Matrix).isRequired,
  changeRows: PropTypes.func.isRequired,
  changeColumns: PropTypes.func.isRequired,
};

export default MultiplicationControls;
