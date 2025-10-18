import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, Filter } from 'lucide-react';
import { supabase, type Podcast } from '../lib/supabase';

export function Podcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      setIsLoading(true);
      let query = supabase
        .from('podcasts')
        .select('*')
        .order('published_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data } = await query;

      if (data) {
        setPodcasts(data);
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      }

      setIsLoading(false);
    };

    fetchPodcasts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Radio size={48} />
            <h1 className="text-4xl sm:text-5xl font-bold">Podcasts</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Découvrez nos épisodes de podcasts éducatifs sur les technologies émergentes, l'IA, le développement et bien plus encore.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Filter size={20} className="text-gray-600" />
              <span className="font-semibold text-gray-900">Filtrer par catégorie</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tous
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Chargement des podcasts...</p>
          </div>
        ) : podcasts.length === 0 ? (
          <div className="space-y-8">
            {/* Featured Video Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Notre premier podcast vidéo</h3>
                <p className="text-gray-600">
                  Découvrez notre première vidéo sur la chaîne KalanOpen, disponible directement sur le site.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/EpqlC3NXPN4"
                    title="KalanOpen Premier Podcast"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Introduction à KalanOpen</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Découvrez notre mission et notre vision pour démocratiser l'éducation technologique en Afrique.
                    </p>
                  </div>
                  <a
                    href="https://youtu.be/EpqlC3NXPN4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Voir sur YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Coming Soon Message */}
            <div className="bg-white rounded-lg p-12 text-center">
              <Radio size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Plus de podcasts à venir</h3>
              <p className="text-gray-600">
                {selectedCategory !== 'all'
                  ? 'Aucun podcast dans cette catégorie pour le moment.'
                  : 'D\'autres podcasts seront bientôt disponibles. Restez connectés !'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {podcasts.map((podcast) => (
              <Link
                key={podcast.id}
                to={`/podcasts/${podcast.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <Radio className="text-white relative z-10" size={48} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-semibold text-gray-800">
                      {podcast.duration ? `${Math.floor(podcast.duration / 60)} min` : 'Podcast'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {podcast.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {podcast.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {podcast.description}
                  </p>
                  <div className="flex items-center justify-between">
                    {podcast.guest && (
                      <p className="text-gray-500 text-sm">
                        Avec {podcast.guest}
                      </p>
                    )}
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
                      View this collection →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
