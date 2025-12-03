import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, RefreshCw, Feather } from 'lucide-react';
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
    <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-bird-teal rounded-full mb-8 shadow-lg shadow-bird-teal/20">
            <Feather className="text-white h-8 w-8" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-medium text-ink mb-6">
            Your Personal Bookseller
          </h2>
          <p className="font-serif text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Tell us what you're in the mood for, what you last loved, or a specific feeling you want to capture. 
            <br/>Our AI apprentice has been trained on our favorite shelves.
          </p>
        </div>

        <div className="bg-white p-3 rounded-md shadow-xl mb-20 max-w-2xl mx-auto border border-stone-100">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'Something set in a rainy city' or 'Like Sally Rooney but darker'"
              className="flex-1 px-6 py-4 text-lg font-serif outline-none bg-transparent placeholder:text-stone-300 text-stone-800"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-8 py-4 bg-bird-teal hover:bg-bird-teal/90 text-white rounded-sm font-medium transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="text-center py-24">
            <div className="inline-block relative">
               <Loader2 className="h-12 w-12 text-bird-teal animate-spin mb-4" />
            </div>
            <p className="font-serif text-stone-500 text-xl animate-pulse">Scanning the stacks...</p>
          </div>
        )}

        {!isLoading && hasSearched && recommendations.length > 0 && (
          <div className="space-y-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px bg-stone-200 w-full max-w-xs"></div>
              <h3 className="font-serif text-3xl text-ink whitespace-nowrap">A Stack Just For You</h3>
              <div className="h-px bg-stone-200 w-full max-w-xs"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {recommendations.map((book, idx) => (
                <BookCard key={idx} book={book} />
              ))}
            </div>
            
            <div className="text-center mt-16">
                 <button 
                  onClick={handleSearch}
                  className="inline-flex items-center text-stone-500 hover:text-bird-teal transition-colors font-serif italic text-lg"
                >
                  <RefreshCw size={16} className="mr-2" /> 
                  Try another search?
                </button>
            </div>
          </div>
        )}

        {!isLoading && hasSearched && recommendations.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm max-w-xl mx-auto border border-stone-100">
             <p className="text-stone-500 font-serif text-xl mb-4">Hmm, we couldn't find the perfect match right now.</p>
             <p className="text-stone-400">Try rephrasing your request, or ask for a "Staff Pick".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualCurator;