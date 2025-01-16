import PropTypes from 'prop-types';
import { Menu, X } from 'lucide-react';
import { MobileNavLink } from './NavLinks';

const MobileMenu = ({ 
  isOpen, 
  onToggle, 
  adminMenuItems, 
  userMenuItems, 
  isAdmin 
}) => (
  <>
    <div className="md:hidden flex items-center">
      <button
        onClick={onToggle}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <X className="block h-6 w-6" />
        ) : (
          <Menu className="block h-6 w-6" />
        )}
      </button>
    </div>

    {isOpen && (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAdmin && (
            <>
              {Object.values(adminMenuItems).flat().map((item) => (
                <MobileNavLink 
                  key={item.to} 
                  to={item.to}
                  onClick={onToggle}
                >
                  {item.label}
                </MobileNavLink>
              ))}
            </>
          )}
          
          {Object.values(userMenuItems).flat().map((item) => (
            <MobileNavLink 
              key={item.to} 
              to={item.to}
              onClick={onToggle}
            >
              {item.label}
            </MobileNavLink>
          ))}
        </div>
      </div>
    )}
  </>
);

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  adminMenuItems: PropTypes.object.isRequired,
  userMenuItems: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default MobileMenu;