import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { UseAuth } from 'src/context/authProvider';

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default function ProtectedRoute({ children }) {
  const { user } = UseAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
