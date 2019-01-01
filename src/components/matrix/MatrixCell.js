import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MatrixCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: false,
    };
  }

  validate = (event) => {
    let reformattedValue = event.target.value;
    if (reformattedValue === '') {
      reformattedValue = '0';
    }
    const fractionRegex = /^-?[0-9]*(\/)?(-?([1-9][0-9]*))?$|^-$/g;
    // remove leading zeroes except on decimals
    reformattedValue = reformattedValue.replace(/^(0+)?(?=(0\.|[0-9])|-)/, '');
    if (!reformattedValue.match(fractionRegex)) {
      return;
    }
    const { changeCell } = this.props;
    const invalid = reformattedValue.endsWith('/');
    this.setState({ invalid });
    changeCell(reformattedValue);
  }

  render() {
    const { readOnly, style, cellValue } = this.props;
    let { className } = this.props;
    const { invalid } = this.state;

    if (invalid) {
      className += ' invalid';
    }
    const input = (
      <input
        disabled={readOnly}
        className={className}
        style={style}
        type="text"
        value={cellValue}
        onChange={readOnly ? null : this.validate}
      />
    );
    return input;
  }
}

MatrixCell.propTypes = {
  readOnly: PropTypes.bool,
  className: PropTypes.string.isRequired,
  changeCell: PropTypes.func.isRequired,
  cellValue: PropTypes.string.isRequired,
};

MatrixCell.defaultProps = {
  readOnly: true,
};

export default MatrixCell;
