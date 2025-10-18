import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Radio, Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { supabase, type Podcast } from '../lib/supabase';

export function PodcastDetail() {
  const { id } = useParams<{ id: string }>();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPodcast = async () => {
      if (!id) return;

      const { data } = await supabase
        .from('podcasts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (data) {
        setPodcast(data);
      }
      setIsLoading(false);
    };

    fetchPodcast();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Radio size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Podcast introuvable</h2>
          <Link to="/podcasts" className="text-blue-600 hover:text-blue-700 font-medium">
            Retour aux podcasts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/podcasts"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Retour aux podcasts
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${podcast.youtube_id}`}
              title={podcast.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                {podcast.category}
              </span>
              {podcast.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {podcast.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              {podcast.guest && (
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>Avec {podcast.guest}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>
                  {new Date(podcast.published_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              {podcast.duration && (
                <div className="flex items-center">
                  <Radio size={16} className="mr-2" />
                  <span>{Math.floor(podcast.duration / 60)} minutes</span>
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {podcast.description}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Regarder sur YouTube</h3>
              <a
                href={podcast.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Ouvrir dans YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
