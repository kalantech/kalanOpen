import { Target, Users, Heart, MapPin, Phone, Mail, Youtube, Twitter, Linkedin } from 'lucide-react';
import { NewsletterForm } from '../components/NewsletterForm';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">À propos de KalanOpen</h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="text-blue-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Notre vision</h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              En Afrique, le système éducatif reste souvent limité par un accès restreint aux ressources pédagogiques modernes.
              <strong className="text-gray-900"> KalanTech</strong>, à travers son initiative <strong className="text-blue-600">KalanOpen</strong>,
              veut démocratiser l'éducation grâce à la technologie et démystifier les termes techniques auprès du grand public.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Cette plateforme propose des <strong>podcasts éducatifs</strong>, des <strong>mini-formations gratuites</strong>,
              des <strong>articles vulgarisés</strong>, et des <strong>échanges communautaires</strong> autour des technologies émergentes.
            </p>
            <p className="text-lg leading-relaxed">
              Notre objectif est de rendre la technologie accessible à tous, quel que soit le niveau de connaissance,
              et de créer une communauté dynamique de passionnés et d'apprenants en Afrique.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Accessible à tous</h3>
            <p className="text-gray-700">
              Tout notre contenu est gratuit et conçu pour être compréhensible par tous, des débutants aux experts.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Contenu de qualité</h3>
            <p className="text-gray-700">
              Des podcasts, formations et articles créés avec soin pour offrir une expérience d'apprentissage enrichissante.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Heart className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Communauté active</h3>
            <p className="text-gray-700">
              Rejoignez une communauté de passionnés qui partagent, apprennent et grandissent ensemble.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos valeurs</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold mr-4 mt-1">1</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Éducation pour tous</h3>
                <p className="text-gray-700">
                  Nous croyons que l'éducation technologique doit être accessible à tous, sans barrières financières ou géographiques.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold mr-4 mt-1">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Vulgarisation</h3>
                <p className="text-gray-700">
                  Nous simplifions les concepts techniques complexes pour les rendre compréhensibles par tous.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold mr-4 mt-1">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-700">
                  Nous explorons les dernières technologies et tendances pour garder notre communauté à jour.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold mr-4 mt-1">4</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Communauté</h3>
                <p className="text-gray-700">
                  Nous construisons une communauté collaborative où chacun peut contribuer et apprendre des autres.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 sm:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">L'équipe KalanTech</h2>
          <p className="text-blue-100 text-lg mb-6">
            KalanOpen est une initiative de <strong>KalanTech</strong>, une organisation dédiée à l'innovation
            technologique en Afrique. Notre équipe passionnée travaille chaque jour pour créer du contenu
            éducatif de qualité et accessible à tous.
          </p>
          <p className="text-blue-100 text-lg">
            Basés à Bamako, Mali, nous nous engageons à démocratiser l'accès à l'éducation technologique
            sur tout le continent africain.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-700 text-lg mb-6">
            Vous avez des questions ou souhaitez collaborer avec nous ? N'hésitez pas à nous contacter.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Informations de contact</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">Medina Coura Rue 14<br />Bamako, Mali</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-600" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <a href="tel:+22373546243" className="text-gray-600 hover:text-blue-600 transition-colors">
                      +223 73 54 62 43
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-600" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:kalanopen@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                      kalanopen@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Réseaux sociaux</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.youtube.com/channel/UCX6aJSISeyRr45zj06WF4JA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  <Youtube size={20} />
                  <span>YouTube</span>
                </a>
                <a 
                  href="https://x.com/KalanOpen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                >
                  <Twitter size={20} />
                  <span>Twitter/X</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/kalan-open-b75201369/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:kalanopen@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Nous contacter
            </a>
            <Link
              to="/communaute"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
            >
              Rejoindre la communauté
            </Link>
          </div>
        </div>

        <NewsletterForm />
      </div>
    </div>
  );
}
