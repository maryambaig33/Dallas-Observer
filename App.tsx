import React, { useState } from 'react';
import Navigation from './components/Navigation';
import VirtualCurator from './components/VirtualCurator';
import { HomeView, EventsView, AboutView } from './components/Views';
import { ViewState } from './types';
import { Feather, Instagram, Twitter, Facebook } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>('HOME');

  const renderView = () => {
    switch (currentView) {
      case 'HOME': return <HomeView setView={setView} />;
      case 'CURATOR': return <VirtualCurator />;
      case 'EVENTS': return <EventsView />;
      case 'ABOUT': return <AboutView />;
      default: return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation currentView={currentView} setView={setView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-ink text-stone-400 py-12 px-4 border-t border-stone-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center text-stone-200 mb-4">
              <div className="p-1 bg-bird-teal rounded-full mr-2">
                <Feather size={16} />
              </div>
              <span className="font-serif font-bold text-xl">Birds</span>
            </div>
            <p className="text-sm leading-relaxed">
              An independent bookstore in Dallas, Texas. Cultivating community through the art of reading.
            </p>
          </div>
          
          <div>
            <h4 className="text-stone-200 font-serif font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-bird-teal cursor-pointer">Fiction</li>
              <li className="hover:text-bird-teal cursor-pointer">Poetry</li>
              <li className="hover:text-bird-teal cursor-pointer">Essays</li>
              <li className="hover:text-bird-teal cursor-pointer">Gift Cards</li>
            </ul>
          </div>

          <div>
             <h4 className="text-stone-200 font-serif font-bold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li onClick={() => setView('EVENTS')} className="hover:text-bird-teal cursor-pointer">Events Calendar</li>
              <li className="hover:text-bird-teal cursor-pointer">Book Clubs</li>
              <li className="hover:text-bird-teal cursor-pointer">Membership</li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-200 font-serif font-bold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <Instagram className="hover:text-white cursor-pointer" size={20} />
              <Twitter className="hover:text-white cursor-pointer" size={20} />
              <Facebook className="hover:text-white cursor-pointer" size={20} />
            </div>
            <p className="text-xs">© 2024 Birds Bookstore.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;