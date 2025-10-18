import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Filter, Clock } from 'lucide-react';
import { supabase, type Formation } from '../lib/supabase';

export function Formations() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormations = async () => {
      setIsLoading(true);
      let query = supabase
        .from('formations')
        .select('*')
        .order('published_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (selectedDifficulty !== 'all') {
        query = query.eq('difficulty', selectedDifficulty);
      }

      const { data } = await query;

      if (data) {
        setFormations(data);
        const uniqueCategories = [...new Set(data.map((f) => f.category))];
        setCategories(uniqueCategories);
      }

      setIsLoading(false);
    };

    fetchFormations();
  }, [selectedCategory, selectedDifficulty]);

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
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <BookOpen size={48} />
            <h1 className="text-4xl sm:text-5xl font-bold">Formations gratuites</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-3xl">
            Apprenez à votre rythme avec nos formations complètes sur les technologies numériques. Tout est gratuit et accessible à tous.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 space-y-4">
          {categories.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Filter size={20} className="text-gray-600" />
                <span className="font-semibold text-gray-900">Catégorie</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Toutes
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Filter size={20} className="text-gray-600" />
              <span className="font-semibold text-gray-900">Niveau</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedDifficulty === 'all'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tous les niveaux
              </button>
              {['beginner', 'intermediate', 'advanced'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getDifficultyLabel(difficulty)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Chargement des formations...</p>
          </div>
        ) : formations.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune formation disponible</h3>
            <p className="text-gray-600">
              {selectedCategory !== 'all' || selectedDifficulty !== 'all'
                ? 'Aucune formation ne correspond à vos critères.'
                : 'Les formations seront bientôt disponibles. Revenez plus tard !'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((formation) => (
              <Link
                key={formation.id}
                to={`/formations/${formation.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <BookOpen className="text-white" size={48} />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                      {formation.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(formation.difficulty)}`}>
                      {getDifficultyLabel(formation.difficulty)}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {formation.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {formation.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    <span>{formation.duration_hours}h de contenu</span>
                  </div>
                  {formation.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {formation.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
