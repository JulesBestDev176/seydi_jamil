import React, { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-pink-700" />
            <span className="ml-2 text-xl font-bold text-gray-900">SMSJ</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-pink-700">Accueil</a>
            <a href="#programs" className="text-gray-700 hover:text-pink-700">Programmes</a>
            <a href="#features" className="text-gray-700 hover:text-pink-700">Services</a>
            <a href="#gallery" className="text-gray-700 hover:text-pink-700">Galerie</a>
            <a href="#contact" className="text-gray-700 hover:text-pink-700">Contact</a>
            <button className="bg-pink-700 text-white px-4 py-2 rounded-md hover:bg-pink-800">
              Inscription
            </button>
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
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Accueil</a>
            <a href="#programs" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Programmes</a>
            <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Services</a>
            <a href="#gallery" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Galerie</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-pink-700">Contact</a>
            <button className="w-full bg-pink-700 text-white px-4 py-2 rounded-md hover:bg-pink-800">
              Inscription
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;