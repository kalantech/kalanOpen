import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Download, ArrowLeft, Tag } from 'lucide-react';
import { supabase, type Formation } from '../lib/supabase';

export function FormationDetail() {
  const { id } = useParams<{ id: string }>();
  const [formation, setFormation] = useState<Formation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormation = async () => {
      if (!id) return;

      const { data } = await supabase
        .from('formations')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (data) {
        setFormation(data);
      }
      setIsLoading(false);
    };

    fetchFormation();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!formation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Formation introuvable</h2>
          <Link to="/formations" className="text-orange-600 hover:text-orange-700 font-medium">
            Retour aux formations
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Débutant';
      case 'intermediate':
        return 'Intermédiaire';
      case 'advanced':
        return 'Avancé';
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/formations"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Retour aux formations
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 sm:p-12 text-white">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-white bg-opacity-20 text-white text-sm font-semibold rounded-full">
                {formation.category}
              </span>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getDifficultyColor(formation.difficulty)}`}>
                {getDifficultyLabel(formation.difficulty)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {formation.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{formation.duration_hours}h de contenu</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>
                  Publié le {new Date(formation.published_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {formation.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {formation.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {formation.description}
              </p>
            </div>

            {formation.youtube_playlist_url && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contenu vidéo</h3>
                <a
                  href={formation.youtube_playlist_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Voir la playlist YouTube
                </a>
              </div>
            )}

            {formation.pdf_resources && formation.pdf_resources.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ressources PDF</h3>
                <div className="space-y-2">
                  {formation.pdf_resources.map((resource: { name: string; url: string }, index: number) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <Download size={20} className="text-orange-600 mr-3" />
                        <span className="font-medium text-gray-900">{resource.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">PDF</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200 bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Commencez maintenant</h3>
              <p className="text-gray-700 mb-4">
                Cette formation est entièrement gratuite. Accédez au contenu et commencez à apprendre dès aujourd'hui.
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
                <BookOpen className="mr-2" size={20} />
                Suivre la formation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
