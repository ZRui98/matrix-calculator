import PropTypes from 'prop-types';

const CustomPropTypes = {
  Matrix: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    invalid: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default CustomPropTypes;
