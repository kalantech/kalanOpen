import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') {
        setMessage('Cet email est déjà inscrit.');
      } else {
        setMessage('Une erreur est survenue. Réessayez plus tard.');
      }
      setStatus('error');
    } else {
      setMessage('Merci ! Vous êtes maintenant inscrit à notre newsletter.');
      setStatus('success');
      setEmail('');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
      <div className="flex items-center space-x-2 mb-4">
        <Mail size={24} />
        <h3 className="text-2xl font-bold">Restez informé</h3>
      </div>
      <p className="mb-6 text-blue-100">
        Recevez les derniers podcasts et formations directement dans votre boîte mail.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          required
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 flex items-center space-x-2 text-green-200">
          <CheckCircle size={20} />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 flex items-center space-x-2 text-red-200">
          <AlertCircle size={20} />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
