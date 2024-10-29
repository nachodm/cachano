import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const RouterLink = forwardRef(({ to, ...other }, ref) => <Link ref={ref} to={to} {...other} />);

RouterLink.propTypes = {
  to: PropTypes.string,
};

export default RouterLink;
