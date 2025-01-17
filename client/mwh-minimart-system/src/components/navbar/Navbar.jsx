import { useState, useRef, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import { getUserById } from '../../services/api';
import NavDropdown from './NavDropdown';
import UserProfile from './UserProfile';
import MobileMenu from './MobileMenu';
import { MobileNavLink } from './NavLinks';
import { adminMenuItems, userMenuItems } from './navData';

const Navbar = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const roleId = sessionStorage.getItem("roleId");
  const userId = sessionStorage.getItem('userId');
  const isAdmin = useMemo(() => roleId === "admin", [roleId]);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const data = await getUserById(userId);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleMouseEnter = (dropdownName) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDropdownItemClick = () => {
    setOpenDropdown(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">Dashboard</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center mt-4">
            <Link to="/dashboard" className="w-full max-w-[150px]">
              <img 
                src="/src/assets/img/mwh-horizontal.png" 
                alt="Muhammadiyah Welfare Home" 
                className="w-full h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin && (
              <>
                <NavDropdown 
                  label="Management" 
                  items={adminMenuItems.management}
                  isOpen={openDropdown === 'Management'}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onItemClick={handleDropdownItemClick}
                />
                <NavDropdown 
                  label="Requests" 
                  items={adminMenuItems.requests}
                  isOpen={openDropdown === 'Requests'}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onItemClick={handleDropdownItemClick}
                />
                <NavDropdown 
                  label="Reports" 
                  items={adminMenuItems.reports}
                  isOpen={openDropdown === 'Reports'}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onItemClick={handleDropdownItemClick}
                />
              </>
            )}

            <NavDropdown 
              label="Activities" 
              items={userMenuItems.activities}
              isOpen={openDropdown === 'Activities'}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onItemClick={handleDropdownItemClick}
            />
            <NavDropdown 
              label="Rewards" 
              items={userMenuItems.rewards}
              isOpen={openDropdown === 'Rewards'}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onItemClick={handleDropdownItemClick}
            />

            <UserProfile 
              userData={userData || user}
              isOpen={openDropdown === 'profile'}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onLogout={handleLogout}
              onItemClick={handleDropdownItemClick}
            />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <UserProfile 
              userData={userData || user}
              isOpen={openDropdown === 'profile'}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onLogout={handleLogout}
              onItemClick={handleDropdownItemClick}
            />
            
            <MobileMenu 
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              adminMenuItems={adminMenuItems}
              userMenuItems={userMenuItems}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAdmin && (
              <>
                {Object.values(adminMenuItems).flat().map((item) => (
                  <MobileNavLink key={item.to} to={item.to}>
                    {item.label}
                  </MobileNavLink>
                ))}
              </>
            )}
            
            {Object.values(userMenuItems).flat().map((item) => (
              <MobileNavLink key={item.to} to={item.to}>
                {item.label}
              </MobileNavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;