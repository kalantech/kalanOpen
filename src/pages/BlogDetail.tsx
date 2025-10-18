import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Calendar, User, Tag, ArrowLeft, Radio } from 'lucide-react';
import { supabase, type Article, type Podcast } from '../lib/supabase';

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedPodcast, setRelatedPodcast] = useState<Podcast | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (data) {
        setArticle(data);

        if (data.related_podcast_id) {
          const { data: podcastData } = await supabase
            .from('podcasts')
            .select('*')
            .eq('id', data.related_podcast_id)
            .maybeSingle();

          if (podcastData) {
            setRelatedPodcast(podcastData);
          }
        }
      }
      setIsLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article introuvable</h2>
          <Link to="/blog" className="text-green-600 hover:text-green-700 font-medium">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Retour au blog
        </Link>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {article.cover_image && (
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-64 sm:h-96 object-cover"
            />
          )}

          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                {article.category}
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>
                  {new Date(article.published_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>

            {relatedPodcast && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Radio className="mr-2 text-blue-600" size={24} />
                  Écouter aussi le podcast associé
                </h3>
                <Link
                  to={`/podcasts/${relatedPodcast.id}`}
                  className="block bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Radio className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
                        {relatedPodcast.category}
                      </span>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">
                        {relatedPodcast.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedPodcast.description}
                      </p>
                      {relatedPodcast.guest && (
                        <p className="text-gray-500 text-sm mt-2">
                          Avec {relatedPodcast.guest}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
