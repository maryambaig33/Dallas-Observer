import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { getBookRecommendations } from '../services/geminiService';
import { Book } from '../types';
import BookCard from './BookCard';

const VirtualCurator: React.FC = () => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await getBookRecommendations(query);
      setRecommendations(results);
    } catch (error) {
      console.error("Failed to fetch recommendations", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-bird-teal/10 rounded-full mb-6">
            <Sparkles className="text-bird-teal h-8 w-8" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink mb-4">
            Ask the Bird
          </h2>
          <p className="font-serif text-xl text-stone-600 max-w-2xl mx-auto">
            Tell us what you're in the mood for, what you last loved, or a specific feeling you want to capture. 
            Our digital curator will hand-pick a stack just for you.
          </p>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-lg mb-16 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'Something melancholy set in Paris' or 'Like Haruki Murakami'"
              className="flex-1 px-6 py-4 text-lg font-serif outline-none bg-transparent placeholder:text-stone-300 text-stone-800"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-8 py-4 bg-bird-teal hover:bg-bird-teal/90 text-white rounded-md font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 text-bird-teal animate-spin mx-auto mb-4" />
            <p className="font-serif text-stone-500 text-lg animate-pulse">Checking the shelves...</p>
          </div>
        )}

        {!isLoading && hasSearched && recommendations.length > 0 && (
          <div className="space-y-16 animate-fade-in">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-8">
              <h3 className="font-serif text-2xl text-ink">Curated for you</h3>
              <button 
                onClick={handleSearch}
                className="flex items-center text-sm text-stone-500 hover:text-bird-teal transition-colors"
              >
                <RefreshCw size={14} className="mr-1" /> Regenerate
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((book, idx) => (
                <BookCard key={idx} book={book} />
              ))}
            </div>
          </div>
        )}

        {!isLoading && hasSearched && recommendations.length === 0 && (
          <div className="text-center py-20 text-stone-500 font-serif text-xl">
             We couldn't find the perfect match right now. Try rephrasing your request.
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualCurator;