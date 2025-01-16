import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {children}
  </Link>
);

export const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    onClick={onClick}
  >
    {children}
  </Link>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

MobileNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};