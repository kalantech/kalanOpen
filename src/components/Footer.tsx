import { Mail, Youtube, Twitter, Linkedin, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo.png" 
                alt="KalanOpen Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Démocratiser l'éducation technologique en Afrique à travers des podcasts, formations gratuites et articles de vulgarisation.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.youtube.com/channel/UCX6aJSISeyRr45zj06WF4JA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://x.com/KalanOpen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Twitter/X"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/kalan-open-b75201369/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/podcasts" className="hover:text-white transition-colors">Podcasts</Link></li>
              <li><Link to="/formations" className="hover:text-white transition-colors">Formations</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/communaute" className="hover:text-white transition-colors">Communauté</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Medina Coura Rue 14<br />
                  Bamako, Mali
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <a href="tel:+22373546243" className="hover:text-white transition-colors">
                  +223 73 54 62 43
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:kalanopen@gmail.com" className="hover:text-white transition-colors">
                  kalanopen@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <Link to="/a-propos" className="hover:text-white transition-colors">À propos</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KalanOpen by KalanTech. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
