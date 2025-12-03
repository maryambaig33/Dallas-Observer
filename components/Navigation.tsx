import React from 'react';
import { ViewState } from '../types';
import { BookOpen, Calendar, Sparkles, Info, Feather } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'HOME', label: 'Collection', icon: BookOpen },
    { id: 'CURATOR', label: 'Ask the Bird', icon: Sparkles },
    { id: 'EVENTS', label: 'Gatherings', icon: Calendar },
    { id: 'ABOUT', label: 'Our Story', icon: Info },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setView('HOME')}
          >
            <div className="p-2 bg-bird-teal rounded-full mr-3 text-white transition-transform transform group-hover:rotate-12">
              <Feather size={24} />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-ink">Birds Bookstore</h1>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-sans">Dallas, Texas</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                  currentView === item.id 
                    ? 'text-bird-teal border-b-2 border-bird-teal pb-1' 
                    : 'text-stone-500 hover:text-bird-teal'
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button (simplified for this demo) */}
          <div className="md:hidden flex space-x-4">
             {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`p-2 rounded-md ${
                  currentView === item.id ? 'bg-stone-200 text-bird-teal' : 'text-stone-500'
                }`}
              >
                <item.icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;