import { useState } from 'react';
import { Users, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Community() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    description: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase
      .from('community_topics')
      .insert([formData]);

    if (error) {
      setMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
      setStatus('error');
    } else {
      setMessage('Merci ! Votre suggestion a été envoyée avec succès.');
      setStatus('success');
      setFormData({ name: '', email: '', topic: '', description: '' });
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Users size={48} />
            <h1 className="text-4xl sm:text-5xl font-bold">Communauté</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Rejoignez une communauté passionnée de technologie. Partagez vos idées, proposez des sujets de podcast et échangez avec d'autres apprenants.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="text-purple-600" size={32} />
                <h2 className="text-2xl font-bold text-gray-900">Proposer un sujet</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Vous avez une idée de sujet pour un podcast ou une formation ? Nous sommes à l'écoute de vos suggestions !
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Votre email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="jean@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet proposé
                  </label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Ex: Intelligence Artificielle pour les débutants"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description détaillée
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    placeholder="Décrivez votre idée en détail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Envoyer ma proposition
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                    <CheckCircle size={20} />
                    <span>{message}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                    <AlertCircle size={20} />
                    <span>{message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pourquoi rejoindre la communauté ?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-purple-600 text-white rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Proposez des sujets qui vous intéressent et influencez le contenu futur</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-purple-600 text-white rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Échangez avec d'autres passionnés de technologie en Afrique</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-purple-600 text-white rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Accédez en avant-première aux nouveaux contenus et formations</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-purple-600 text-white rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Participez à des événements et webinaires exclusifs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Suivez-nous</h3>
              <p className="text-gray-600 mb-6">
                Restez connectés avec KalanOpen sur les réseaux sociaux pour ne rien manquer.
              </p>
              <div className="space-y-3">
                <a
                  href="https://www.youtube.com/channel/UCX6aJSISeyRr45zj06WF4JA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Chaîne YouTube KalanOpen
                </a>
                <a
                  href="https://x.com/KalanOpen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter/X @KalanOpen
                </a>
                <a
                  href="https://www.linkedin.com/in/kalan-open-b75201369/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn KalanOpen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
