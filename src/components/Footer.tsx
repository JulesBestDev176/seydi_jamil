import { Facebook, Twitter, Instagram, GraduationCap } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-bold">CPSJ</span>
            </div>
            <p className="text-gray-400">
              Excellence académique et développement personnel depuis plus de 20 ans.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-pink-500">Accueil</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-pink-500">Programmes</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-pink-500">Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-pink-500">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Dakar, Sénégal</li>
              <li>+221 XX XXX XX XX</li>
              <li>contact@smsj-school.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} École Seydi Moustapha Sy Jamil. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;