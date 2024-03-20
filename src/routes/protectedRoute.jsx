import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/context/authProvider';

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
}
