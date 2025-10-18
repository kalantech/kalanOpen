import { useState, useEffect } from 'react';
import { Search, X, Radio, BookOpen, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  id: string;
  title: string;
  type: 'podcast' | 'formation' | 'article';
  category: string;
  excerpt?: string;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const searchContent = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      const searchTerm = `%${query}%`;

      const [podcasts, formations, articles] = await Promise.all([
        supabase
          .from('podcasts')
          .select('id, title, category')
          .ilike('title', searchTerm)
          .limit(5),
        supabase
          .from('formations')
          .select('id, title, category')
          .ilike('title', searchTerm)
          .limit(5),
        supabase
          .from('articles')
          .select('id, title, category, excerpt')
          .ilike('title', searchTerm)
          .limit(5),
      ]);

      const combined: SearchResult[] = [
        ...(podcasts.data?.map((p) => ({ ...p, type: 'podcast' as const })) || []),
        ...(formations.data?.map((f) => ({ ...f, type: 'formation' as const })) || []),
        ...(articles.data?.map((a) => ({ ...a, type: 'article' as const })) || []),
      ];

      setResults(combined);
      setIsLoading(false);
    };

    const debounce = setTimeout(searchContent, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'podcast') {
      navigate(`/podcasts/${result.id}`);
    } else if (result.type === 'formation') {
      navigate(`/formations/${result.id}`);
    } else if (result.type === 'article') {
      navigate(`/blog/${result.id}`);
    }
    onClose();
  };

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'podcast':
        return <Radio size={20} className="text-blue-600" />;
      case 'formation':
        return <BookOpen size={20} className="text-orange-600" />;
      case 'article':
        return <FileText size={20} className="text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
        <div className="flex items-center border-b border-gray-200 px-4 py-3">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher des podcasts, formations ou articles..."
            className="flex-1 px-4 py-2 outline-none text-gray-900"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-8 text-center text-gray-500">
              Recherche en cours...
            </div>
          )}

          {!isLoading && query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Aucun résultat trouvé pour "{query}"
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-start space-x-3"
                >
                  <div className="mt-1">{getIcon(result.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900">{result.title}</div>
                    <div className="text-sm text-gray-500 capitalize">{result.type} • {result.category}</div>
                    {result.excerpt && (
                      <div className="text-sm text-gray-600 mt-1 line-clamp-1">{result.excerpt}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {!isLoading && query.length < 2 && (
            <div className="p-8 text-center text-gray-400">
              Tapez au moins 2 caractères pour rechercher
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
