import { useState, FC } from 'react';
import { Menu, X, GraduationCap, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  admin: any
}

const Navbar: FC<NavbarProps> = ({ isLoggedIn, onLogout, admin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  

  const handleDashboard = () => {
    navigate('/admin/dashboard');
    setShowProfileModal(false);
  };

  const handleLogout = () => {
    onLogout();
    setShowProfileModal(false);
    navigate('/admin')
  };

  const ProfileButton = () => (
    <div className="relative">
      <button
        onClick={() => setShowProfileModal(!showProfileModal)}
        className="flex items-center space-x-2 bg-pink-700 text-white px-4 py-2 rounded-md hover:bg-pink-800"
      >
        <User className="h-5 w-5" />
        <span>Profil</span>
      </button>

      {showProfileModal && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={handleDashboard}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Dashboard
          </button>
          <Link
            to="/profile"
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Profile
          </Link>
          {/* {admin.role == "admin" ? 
          (
            <Link
            to="/users/add"
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Utilisateurs
          </Link>
          ) 
          : ""} */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );

  const SignUpButton = () => (
    <Link to="/admin" className="bg-pink-700 text-white px-4 py-2 rounded-md hover:bg-pink-800">
      Connexion
    </Link>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-pink-700" />
            <span className="ml-2 text-xl font-bold text-gray-900">CPSJ</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-700">Accueil</Link>
            <Link to="/programs" className="text-gray-700 hover:text-pink-700">Programmes</Link>
            <Link to="/features" className="text-gray-700 hover:text-pink-700">Services</Link>
            <Link to="/gallery" className="text-gray-700 hover:text-pink-700">Galerie</Link>
            <Link to="/contact" className="text-gray-700 hover:text-pink-700">Contact</Link>
            {isLoggedIn ? <ProfileButton /> : <SignUpButton />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-pink-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Accueil</Link>
            <Link to="/programs" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Programmes</Link>
            <Link to="/features" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Services</Link>
            <Link to="/gallery" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Galerie</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Contact</Link>
            {isLoggedIn ? (
              <div className="px-3 py-2">
                <ProfileButton />
              </div>
            ) : (
              <div className="px-3 py-2">
                <SignUpButton />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
