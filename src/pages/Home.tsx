import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, BookOpen, FileText, ArrowRight, Calendar, Users, Share2 } from 'lucide-react';
import { supabase, type Podcast, type Formation, type Article, type Event } from '../lib/supabase';
import { NewsletterForm } from '../components/NewsletterForm';

export function Home() {
  const [recentPodcasts, setRecentPodcasts] = useState<Podcast[]>([]);
  const [recentFormations, setRecentFormations] = useState<Formation[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [podcasts, formations, articles, events] = await Promise.all([
        supabase
          .from('podcasts')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(3),
        supabase
          .from('formations')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(3),
        supabase
          .from('articles')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(3),
        supabase
          .from('events')
          .select('*')
          .eq('is_past', false)
          .order('event_date', { ascending: true })
          .limit(3),
      ]);

      if (podcasts.data) setRecentPodcasts(podcasts.data);
      if (formations.data) setRecentFormations(formations.data);
      if (articles.data) setRecentArticles(articles.data);
      if (events.data) setUpcomingEvents(events.data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/EpqlC3NXPN4?autoplay=1&mute=1&loop=1&playlist=EpqlC3NXPN4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&start=0&end=0"
            title="KalanOpen Video Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '177.77777778vh', // 16:9 aspect ratio
              height: '56.25vw', // 16:9 aspect ratio
              minWidth: '100%',
              minHeight: '100%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                Démocratiser l'éducation technologique pour le grand public 
              </h1>
            <p className="text-lg text-blue-50 mb-10">
              Découvrez nos podcasts, formations gratuites et articles de vulgarisation pour comprendre et maîtriser les technologies émergentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/podcasts"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Écouter les podcasts
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/formations"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Voir les formations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Creation Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Learn, Share, Build
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Rejoignez notre communauté de créateurs de contenu technologique. Partagez vos connaissances, inspirez les autres et contribuez à démocratiser l'éducation tech en Afrique. Ensemble, nous construisons l'avenir numérique du continent.
              </p>
              <Link
                to="/communaute"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg"
              >
                Rejoindre la communauté créative →
              </Link>
            </div>

            {/* Right side - KalanOpen Podcast Illustration */}
            <div className="relative">
              <div className="rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-md">
                    <img 
                      src="/firstpodcast.png" 
                      alt="KalanOpen Podcast Illustration" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Radio className="text-blue-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Derniers podcasts</h2>
          </div>
          <Link to="/podcasts" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            Voir tout
            <ArrowRight className="ml-1" size={20} />
          </Link>
        </div>

        {/* Featured YouTube Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                YouTube
              </span>
              <span className="text-xs text-gray-500">Dernière vidéo</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Introduction à KalanOpen
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Découvrez notre mission et notre vision pour démocratiser l'éducation technologique en Afrique. 
              Cette première vidéo présente les fondements de notre initiative.
            </p>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm">
                Publié récemment
              </p>
              <a
                href="https://youtu.be/EpqlC3NXPN4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
              >
                Voir sur YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <BookOpen className="text-orange-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">Formations gratuites</h2>
            </div>
            <Link to="/formations" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              Voir tout
              <ArrowRight className="ml-1" size={20} />
            </Link>
          </div>

          {recentFormations.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              Aucune formation disponible pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentFormations.map((formation) => (
                <Link
                  key={formation.id}
                  to={`/formations/${formation.id}`}
                  className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="aspect-video bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <BookOpen className="text-white" size={48} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                        {formation.category}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {formation.difficulty}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {formation.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {formation.description}
                    </p>
                    <p className="text-gray-500 text-sm mt-3">
                      {formation.duration_hours}h de contenu
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FileText className="text-green-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Articles récents</h2>
          </div>
          <Link to="/blog" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            Voir tout
            <ArrowRight className="ml-1" size={20} />
          </Link>
        </div>

        {recentArticles.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            Aucun article disponible pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {article.cover_image ? (
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <FileText className="text-white" size={48} />
                  </div>
                )}
                <div className="p-5">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3">
                    {article.category}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <p className="text-gray-500 text-sm mt-3">
                    Par {article.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {upcomingEvents.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-8">
              <Calendar className="text-purple-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">Événements à venir</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100"
                >
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3 capitalize">
                    {event.event_type}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.description}
                  </p>
                  <p className="text-purple-600 text-sm font-medium">
                    {new Date(event.event_date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <NewsletterForm />
      </section>

      <section className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez la communauté KalanOpen</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Partagez vos idées, proposez des sujets et participez à des discussions enrichissantes avec d'autres passionnés de technologie.
          </p>
          <Link
            to="/communaute"
            className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            Rejoindre la communauté
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
