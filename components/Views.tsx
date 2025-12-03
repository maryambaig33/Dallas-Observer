import React from 'react';
import BookCard from './BookCard';
import { Book, ViewState } from '../types';
import { Calendar, MapPin, Clock, Star } from 'lucide-react';

const FEATURED_BOOKS: Book[] = [
  {
    title: "The God of Small Things",
    author: "Arundhati Roy",
    description: "A modern classic that captures the very soul of what we do at Birds. Roy's prose is lush, dangerous, and utterly heartbreaking. A masterpiece of memory and family.",
    coverUrl: "https://picsum.photos/seed/godsmallthings/300/450",
    tags: ["Staff Favorite", "Literary Fiction", "India"]
  },
  {
    title: "Bluets",
    author: "Maggie Nelson",
    description: "This genre-defying meditation on the color blue, pain, and love is a perennial favorite here. It's the kind of book you buy two copies of: one to keep, one to give.",
    coverUrl: "https://picsum.photos/seed/bluets/300/450",
    tags: ["Essays", "Poetry", "Cult Classic"]
  },
  {
    title: "The Year of Magical Thinking",
    author: "Joan Didion",
    description: "No shelf is complete without Didion. This is a study in grief that is somehow razor-sharp and deeply comforting at the same time. Essential reading.",
    coverUrl: "https://picsum.photos/seed/magicalthinking/300/450",
    tags: ["Memoir", "Grief", "Essential"]
  }
];

interface HomeViewProps {
  setView: (view: ViewState) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2071&auto=format&fit=crop" 
            alt="Birds Bookstore Interior" 
            className="w-full h-full object-cover brightness-[0.35] sepia-[0.2]"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <div className="mb-6 inline-block border-b border-bird-teal/50 pb-2">
            <span className="font-sans text-sm tracking-[0.2em] uppercase text-bird-teal font-semibold">Est. Dallas, Texas</span>
          </div>
          <h1 className="font-serif text-5xl md:text-8xl font-medium mb-8 leading-tight">
            More than a shop.<br/>
            <span className="italic text-stone-300">A sanctuary.</span>
          </h1>
          <p className="font-serif text-xl md:text-2xl text-stone-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Curating the best in literature for the dreamers, the thinkers, and the quiet rebels of Dallas.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
                onClick={() => setView('CURATOR')}
                className="px-10 py-4 bg-bird-teal text-white font-serif text-lg rounded-sm hover:bg-bird-teal/90 transition-all duration-300 shadow-lg hover:shadow-bird-teal/20"
            >
              Ask the Curator
            </button>
            <button 
                onClick={() => setView('EVENTS')}
                className="px-10 py-4 border border-stone-400 text-stone-200 font-serif text-lg rounded-sm hover:bg-white/10 transition-colors duration-200"
            >
              See Events
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-200 pb-6">
          <div>
            <span className="text-bird-teal font-bold tracking-widest uppercase text-xs mb-2 block">Hand-Picked</span>
            <h2 className="font-serif text-5xl text-ink">From the Shelves</h2>
          </div>
          <div className="mt-6 md:mt-0 flex items-center text-stone-500 font-serif italic">
            <Star size={16} className="text-bird-teal mr-2" fill="currentColor" />
            "Dallas's Best Literature Shop" — Dallas Observer
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURED_BOOKS.map((book, idx) => (
            <BookCard key={idx} book={book} />
          ))}
        </div>
      </section>

       {/* Manifesto Section */}
       <section className="bg-ink text-paper py-32 px-4 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bird-teal to-ink"></div>
         <div className="max-w-4xl mx-auto text-center relative z-10">
           <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-10">
             "We don't stock everything. We stock the books that matter."
           </h3>
           <p className="font-sans text-stone-400 max-w-2xl mx-auto leading-relaxed text-lg">
             In an age of algorithms, Birds Bookstore believes in the human touch. 
             Every title on our shelves has been read, loved, and championed by our staff. 
             We are female-founded, fiercely independent, and dedicated to the art of the physical book.
           </p>
         </div>
       </section>
    </div>
  );
};

export const EventsView: React.FC = () => {
  const events = [
    {
      title: "Silent Reading Party",
      date: "Oct 14",
      time: "6:00 PM",
      desc: "Bring your own book (or buy one here) and enjoy two hours of uninterrupted reading time. Phone-free zone. Herbal tea provided."
    },
    {
      title: "Poetry & Wine: Local Voices",
      date: "Oct 21",
      time: "7:30 PM",
      desc: "An intimate evening featuring three emerging Dallas poets. A celebration of verse in our cozy upstairs loft."
    },
    {
      title: "Sunday Morning Book Club",
      date: "Oct 29",
      time: "10:30 AM",
      desc: "We're discussing 'The Copenhagen Trilogy' by Tove Ditlevsen. Coffee and pastries from our neighbors at Village Baking Co."
    }
  ];

  return (
    <div className="py-20 px-4 max-w-5xl mx-auto min-h-screen animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="font-serif text-6xl text-ink mb-6">Gatherings</h2>
        <p className="font-serif text-xl text-stone-500 italic">Community happens here.</p>
      </div>
      
      <div className="grid gap-8">
        {events.map((evt, idx) => (
          <div key={idx} className="group flex flex-col md:flex-row bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
            <div className="bg-warm-gray group-hover:bg-bird-teal transition-colors duration-300 text-ink group-hover:text-white p-8 flex flex-col justify-center items-center min-w-[180px] text-center border-r border-stone-100">
              <span className="text-4xl font-serif font-bold block mb-1">{evt.date.split(' ')[1]}</span>
              <span className="uppercase tracking-[0.2em] text-xs font-semibold">{evt.date.split(' ')[0]}</span>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-center">
              <h3 className="font-serif text-3xl text-ink mb-3 group-hover:text-bird-teal transition-colors">{evt.title}</h3>
              <div className="flex items-center space-x-6 text-stone-500 text-sm mb-6 font-sans uppercase tracking-wide">
                <span className="flex items-center"><Clock size={16} className="mr-2"/> {evt.time}</span>
                <span className="flex items-center"><MapPin size={16} className="mr-2"/> Birds Bookstore</span>
              </div>
              <p className="text-stone-600 leading-relaxed font-serif text-lg border-t border-stone-100 pt-4">
                {evt.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AboutView: React.FC = () => {
  return (
    <div className="min-h-screen animate-fade-in bg-white">
      <div className="relative h-[50vh] w-full">
         <img 
            src="https://images.unsplash.com/photo-1524311583145-d519d774d0e7?q=80&w=2690&auto=format&fit=crop" 
            alt="Birds Bookstore Vibe" 
            className="w-full h-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-bird-teal/20">
             <h2 className="font-serif text-6xl md:text-7xl text-white font-medium drop-shadow-md">Our Story</h2>
          </div>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="prose prose-xl prose-stone font-serif text-stone-700 leading-loose mx-auto first-letter:text-5xl first-letter:font-bold first-letter:text-bird-teal first-letter:mr-1 first-letter:float-left">
          <p className="mb-8">
            Birds Bookstore was founded on a simple premise: <strong>Books are not commodities.</strong> They are conversations, consolations, and catalysts.
          </p>
          <p className="mb-8">
            Nestled in the heart of the city, we have grown into what the <em>Dallas Observer</em> calls "the best literature shop" in town. We take that title seriously. You won't find aisles of filler here. Every book on our shelves has fought for its place. We champion women writers, independent presses, and voices that challenge the status quo.
          </p>
          <p className="mb-12">
            We are female-founded and community-grown. Whether you are looking for a rare poetry collection, a beautiful gift edition, or just a quiet corner to escape the noise of modern life, Birds is your sanctuary.
          </p>
          
          <div className="flex items-center justify-center my-12">
            <div className="h-px bg-stone-300 w-24"></div>
            <span className="mx-4 text-bird-teal text-2xl">❦</span>
            <div className="h-px bg-stone-300 w-24"></div>
          </div>
        </div>

        <div className="bg-paper border border-stone-200 p-10 mt-8 rounded-sm text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
           <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Visit The Shop</h3>
           <p className="font-serif text-2xl text-ink mb-2">123 Literature Lane</p>
           <p className="font-serif text-xl text-stone-500 mb-8">Oak Cliff • Dallas, Texas</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm mx-auto text-sm font-sans text-stone-600">
              <div className="flex justify-between border-b border-stone-100 py-2">
                <span>Tue - Sat</span>
                <span className="font-bold">11am — 7pm</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 py-2">
                <span>Sun</span>
                <span className="font-bold">12pm — 5pm</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}