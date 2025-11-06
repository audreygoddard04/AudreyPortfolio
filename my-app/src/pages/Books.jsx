import React, { useState, useMemo } from 'react';
import './Books.css';

const books = [
    // Business
    { title: '$100M Offers: How To Make Offers So Good People Feel Stupid Saying No', author: 'Alex Hormozi', category: 'Business', rating: 4.56, note: '' },
    { title: '$100M Leads: How to Get Strangers To Want To Buy Your Stuff (Acquisition.com $100M Series)', author: 'Alex Hormozi', category: 'Business', rating: 4.57, note: '' },
    // Philosophy / Classic
    { title: 'Atlas Shrugged', author: 'Ayn Rand', category: 'Philosophy / Classic', rating: 5, note: '' },
    { title: 'Letters from a Stoic', author: 'Seneca', category: 'Philosophy / Classic', rating: 5, note: '' },
    { title: 'Pocket Guide to Ayn Rand', author: 'Robert Tracinski', category: 'Philosophy / Classic', rating: 4.50, note: '' },
    { title: 'Pocket Guide to Capitalism', author: 'Richard Salsman', category: 'Philosophy / Classic', rating: 3.67, note: '' },
    { title: 'Pocket Guide to Objectivism', author: 'David Kelley', category: 'Philosophy / Classic', rating: 4.20, note: '' },
    { title: 'Politics and the English Language', author: 'George Orwell', category: 'Philosophy / Classic', rating: 4.29, note: '' },
    { title: 'The Beggar Boy at Christ\'s Christmas Tree', author: 'Fyodor Dostoevsky', category: 'Philosophy / Classic', rating: 3.91, note: '' },
    { title: 'The Dream of a Ridiculous Man', author: 'Fyodor Dostoevsky', category: 'Philosophy / Classic', rating: 4.03, note: '' },
    { title: 'White Nights', author: 'Fyodor Dostoevsky', category: 'Philosophy / Classic', rating: 4.08, note: '' },
    // Science
    { title: 'A Crack in Creation: Gene Editing and the Unthinkable Power to Control Evolution', author: 'Jennifer A. Doudna', category: 'Science', rating: 4.13, note: '' },
    { title: 'The Gene: An Intimate History', author: 'Siddhartha Mukherjee', category: 'Science', rating: 5, note: '' },
    { title: 'Good Energy: The Surprising Connection Between Metabolism and Limitless Health', author: 'Casey Means', category: 'Science', rating: 5, note: '' },
    // Memoir / Biography
    { title: 'Far Beyond Gold: Running from Fear to Faith', author: 'Sydney McLaughlin', category: 'Memoir / Biography', rating: 4.37, note: '' },
    { title: 'The Face Laughs While the Brain Cries: The Education of a Doctor', author: 'Stephen L. Hauser', category: 'Memoir / Biography', rating: 4.32, note: '' },
    { title: 'The Choice: Embrace the Possible', author: 'Edith Eger', category: 'Memoir / Biography', rating: 5, note: '' },
    // Self-Help / Personal Development
    { title: 'Fast Like a Girl: A Woman\'s Guide to Using the Healing Power of Fasting to Burn Fat, Boost Energy, and Balance Hormones', author: 'Mindy Pelz', category: 'Self-Help / Personal Development', rating: 4.22, note: '' },
    { title: 'Relentless: From Good to Great to Unstoppable', author: 'Tim S. Grover', category: 'Self-Help / Personal Development', rating: 5, note: '' },
    { title: 'The Creative Act: A Way of Being', author: 'Rick Rubin', category: 'Self-Help / Personal Development', rating: 5, note: '' },
    { title: 'The Psychology of Money', author: 'Morgan Housel', category: 'Self-Help / Personal Development', rating: 4.29, note: '' },
    // Fiction / Short Stories
    { title: 'Hamlet', author: 'William Shakespeare', category: 'Fiction / Short Stories', rating: 4.03, note: '' },
    { title: 'The Fault in Our Stars', author: 'John Green', category: 'Fiction / Short Stories', rating: 4.12, note: '' },
    { title: 'The Hobbit, or There and Back Again', author: 'J.R.R. Tolkien', category: 'Fiction / Short Stories', rating: 4.30, note: '' },
    { title: 'Other People', author: 'Neil Gaiman', category: 'Fiction / Short Stories', rating: 4.01, note: '' },
    { title: 'The Fable of the Dragon-Tyrant', author: 'Nick Bostrom', category: 'Fiction / Short Stories', rating: 4.23, note: '' },
    { title: 'The Boy in the Striped Pyjamas', author: 'John Boyne', category: 'Fiction / Short Stories', rating: 4.16, note: '' },
];

function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [expandedBook, setExpandedBook] = useState(null);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const searchLower = searchTerm.toLowerCase();
      return (
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.category.toLowerCase().includes(searchLower) ||
        book.note.toLowerCase().includes(searchLower)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, sortBy]);

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 === 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    // Format rounded rating to show .0 or .5 (always one decimal place)
    const displayRating = roundedRating.toFixed(1);
    
    return (
      <span className="rating-container">
        <span className="stars-container">
          <span style={{ color: '#FFD700' }}>{'★'.repeat(fullStars)}</span>
          {hasHalfStar && <span className="half-star">★</span>}
          {emptyStars > 0 && <span style={{ color: '#ddd' }}>{'★'.repeat(emptyStars)}</span>}
        </span>
        <span className="rating-number">({displayRating})</span>
      </span>
    );
  };

  const truncateNote = (note, maxLength = 50) => {
    if (!note) return '';
    if (note.length <= maxLength) return note;
    return note.substring(0, maxLength) + '...';
  };

  return (
    <div className="bookshelf-outer">
      <div className="main-section">
        <h1>Bookshelf</h1>
        
        <div className="bookshelf-controls">
          <input
            type="text"
            className="bookshelf-search"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="bookshelf-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
            <option value="category">Sort by Category</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        <table className="bookshelf-table">
          <thead>
            <tr>
              <th>BOOK</th>
              <th>AUTHOR</th>
              <th>RATING</th>
              <th>NOTE</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBooks.map((book, index) => (
              <tr key={index}>
                <td className="book-title-cell">{book.title}</td>
                <td className="book-author-cell">{book.author}</td>
                <td className="book-rating-cell">{renderStars(book.rating)}</td>
                <td className="book-note-cell">
                  {book.note ? (
                    <>
                      {expandedBook === index ? (
                        <>
                          {book.note}
                          <span 
                            className="read-more" 
                            onClick={() => setExpandedBook(null)}
                          > Read Less</span>
                        </>
                      ) : (
                        <>
                          {truncateNote(book.note)}
                          {book.note.length > 50 && (
                            <span 
                              className="read-more" 
                              onClick={() => setExpandedBook(index)}
                            > Read More</span>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Books;
