import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';

const NavDropdown = ({ label, items, isOpen, onMouseEnter, onMouseLeave, onItemClick }) => (
  <div
    className="relative"
    onMouseEnter={() => onMouseEnter(label)}
    onMouseLeave={onMouseLeave}
  >
    <button 
      className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
      aria-expanded={isOpen}
    >
      {label}
      <ChevronDown className="ml-1 h-4 w-4" />
    </button>
    
    {isOpen && (
      <div className="absolute z-10 -ml-4 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => onItemClick && onItemClick()}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
);

NavDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
};

export default NavDropdown;