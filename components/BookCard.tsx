import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  featured?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, featured = false }) => {
  return (
    <div className={`group relative flex flex-col ${featured ? 'md:flex-row gap-8' : 'gap-4'}`}>
      <div className={`relative overflow-hidden rounded-sm bg-stone-200 shadow-md transition-shadow hover:shadow-xl ${featured ? 'w-full md:w-1/2 aspect-[3/4]' : 'w-full aspect-[2/3]'}`}>
        <img 
          src={book.coverUrl || `https://picsum.photos/seed/${book.title.replace(/\s/g, '')}/300/450`} 
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className={`flex flex-col ${featured ? 'md:w-1/2 justify-center' : ''}`}>
        <h3 className={`font-serif font-bold text-ink ${featured ? 'text-4xl mb-2' : 'text-xl mb-1'}`}>
          {book.title}
        </h3>
        <p className={`font-sans text-stone-500 font-medium ${featured ? 'text-lg mb-6' : 'text-sm mb-3'}`}>
          by {book.author}
        </p>
        
        <p className={`font-serif text-stone-600 leading-relaxed ${featured ? 'text-lg mb-6 line-clamp-6' : 'text-sm line-clamp-4'}`}>
          {book.description}
        </p>

        {book.tags && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {book.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-stone-100 text-stone-600 text-xs uppercase tracking-wider font-semibold rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;