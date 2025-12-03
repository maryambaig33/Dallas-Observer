import React from 'react';
import BookCard from './BookCard';
import { Book, ViewState } from '../types';
import { Calendar, MapPin, Clock } from 'lucide-react';

const FEATURED_BOOKS: Book[] = [
  {
    title: "The God of Small Things",
    author: "Arundhati Roy",
    description: "A modern classic that needs no introduction but always deserves a re-read. This story of fraternal twins Estha and Rahel is a masterpiece of lyrical prose and emotional depth. A perfect example of the kind of literature we champion.",
    coverUrl: "https://picsum.photos/seed/godsmallthings/300/450",
    tags: ["Fiction", "India", "Booker Prize"]
  },
  {
    title: "Bluets",
    author: "Maggie Nelson",
    description: "A lyrical, philosophical, and personal exploration of the color blue. It stands somewhere between poetry and essay, a perfect companion for quiet, introspective afternoons in the shop.",
    coverUrl: "https://picsum.photos/seed/bluets/300/450",
    tags: ["Essays", "Poetry", "Philosophy"]
  },
  {
    title: "Exhalation",
    author: "Ted Chiang",
    description: "Science fiction that feels like philosophy. Chiang's short stories are meticulously crafted thought experiments that explore the very nature of humanity, memory, and time.",
    coverUrl: "https://picsum.photos/seed/exhalation/300/450",
    tags: ["Sci-Fi", "Short Stories"]
  }
];

interface HomeViewProps {
  setView: (view: ViewState) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop" 
            alt="Library Interior" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Literature Lives Here.
          </h1>
          <p className="font-sans text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light tracking-wide">
            Dallas’s independent sanctuary for fiction, poetry, and the art of the book. 
            Curated with care, shared with love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={() => setView('CURATOR')}
                className="px-8 py-3 bg-white text-ink font-semibold rounded-sm hover:bg-stone-100 transition-colors duration-200"
            >
              Get a Recommendation
            </button>
            <button 
                onClick={() => setView('EVENTS')}
                className="px-8 py-3 border border-white text-white font-semibold rounded-sm hover:bg-white/10 transition-colors duration-200"
            >
              Upcoming Events
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone-200 pb-4">
          <div>
            <span className="text-bird-teal font-bold tracking-widest uppercase text-sm">Staff Picks</span>
            <h2 className="font-serif text-4xl text-ink mt-2">Currently Reading</h2>
          </div>
          <p className="text-stone-500 italic mt-4 md:mt-0 font-serif">"A room without books is like a body without a soul."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURED_BOOKS.map((book, idx) => (
            <BookCard key={idx} book={book} />
          ))}
        </div>
      </section>

       {/* Quote / Vibe Section */}
       <section className="bg-bird-teal py-24 text-center px-4">
         <div className="max-w-3xl mx-auto">
           <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-8">
             "We believe in the serendipity of the browse and the power of a physical book."
           </h3>
           <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
         </div>
       </section>
    </div>
  );
};

export const EventsView: React.FC = () => {
  const events = [
    {
      title: "Poetry Night: Local Voices",
      date: "Oct 12",
      time: "7:00 PM",
      desc: "Join us for an evening of readings from three emerging Dallas poets. Wine and light refreshments provided."
    },
    {
      title: "Book Club: 'The Overstory'",
      date: "Oct 18",
      time: "6:30 PM",
      desc: "Our monthly fiction group discusses Richard Powers' Pulitzer Prize winner. Open to all."
    },
    {
      title: "Author Signing: Sarah J. Smith",
      date: "Nov 02",
      time: "2:00 PM",
      desc: "Meet the author of 'The Texan Sky' and get your copy signed."
    }
  ];

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto min-h-screen animate-fade-in">
      <h2 className="font-serif text-5xl text-ink mb-12 text-center">Gatherings</h2>
      
      <div className="space-y-8">
        {events.map((evt, idx) => (
          <div key={idx} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100">
            <div className="bg-bird-teal text-white p-6 flex flex-col justify-center items-center min-w-[150px] text-center">
              <span className="text-3xl font-bold font-serif block">{evt.date.split(' ')[1]}</span>
              <span className="uppercase tracking-widest text-sm opacity-80">{evt.date.split(' ')[0]}</span>
            </div>
            <div className="p-8 flex-1">
              <h3 className="font-serif text-2xl font-bold text-ink mb-2">{evt.title}</h3>
              <div className="flex items-center space-x-6 text-stone-500 text-sm mb-4">
                <span className="flex items-center"><Clock size={16} className="mr-1"/> {evt.time}</span>
                <span className="flex items-center"><MapPin size={16} className="mr-1"/> Birds Bookstore</span>
              </div>
              <p className="text-stone-600 leading-relaxed font-serif">
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
    <div className="py-16 px-4 max-w-3xl mx-auto min-h-screen animate-fade-in">
       <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2690&auto=format&fit=crop" 
          alt="Bookstore Shelf" 
          className="w-full h-64 object-cover rounded-sm mb-8"
        />
        <h2 className="font-serif text-5xl text-ink mb-8">Our Story</h2>
        <div className="prose prose-lg prose-stone font-serif text-stone-700 leading-loose">
          <p className="mb-6">
            Birds Bookstore began as a small dream in a quiet corner of Dallas. We wanted to create a space that wasn't just a shop, but a sanctuary. In an age of algorithms and endless scrolling, we believe in the tactile magic of paper, the smell of ink, and the serendipity of finding a book you didn't know you needed.
          </p>
          <p className="mb-6">
            We specialize in literary fiction, poetry, small press gems, and beautiful editions of the classics. We aren't trying to have everything; we're trying to have the <em>good</em> things.
          </p>
          <p>
            Whether you're looking for a challenging postmodern novel, a comforting collection of essays, or just a quiet place to think, Birds is your nest. Welcome home.
          </p>
        </div>
       </div>
       
       <div className="bg-stone-100 p-8 rounded-lg">
         <h3 className="font-serif text-2xl mb-4">Visit Us</h3>
         <p className="font-sans text-stone-600 mb-2">123 Literature Lane, Dallas, TX 75201</p>
         <p className="font-sans text-stone-600 mb-2">Open Daily: 10am - 8pm</p>
         <p className="font-sans text-stone-600">hello@birdsbookstore.com</p>
       </div>
    </div>
  );
}