import { Link } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';

const UserProfile = ({ 
  userData, 
  isOpen, 
  onMouseEnter, 
  onMouseLeave, 
  onLogout, 
  onItemClick 
}) => (
  <div
    className="relative"
    onMouseEnter={() => onMouseEnter('profile')}
    onMouseLeave={onMouseLeave}
  >
    <button 
      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
      aria-expanded={isOpen}
    >
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
        {userData?.profileImage ? (
          <img
            src={userData.profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <User className="h-5 w-5 text-blue-600" />
        )}
      </div>
      <span className="max-w-[100px] truncate">
        {userData?.name || 'User'}
      </span>
      <ChevronDown className="h-4 w-4" />
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu">
          <div className="px-4 py-3 text-sm text-gray-700 border-b">
            <div className="font-medium truncate">Signed in as</div>
            <div className="truncate">{userData?.email}</div>
            {userData?.department && (
              <div className="text-gray-500 truncate">{userData.department}</div>
            )}
            {userData?.role && (
              <div className="text-gray-500 truncate capitalize">{userData.role}</div>
            )}
          </div>
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={onItemClick}
          >
            Your Profile
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={onItemClick}
          >
            Settings
          </Link>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      </div>
    )}
  </div>
);

UserProfile.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    department: PropTypes.string,
    role: PropTypes.string,
    profileImage: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
};

export default UserProfile;