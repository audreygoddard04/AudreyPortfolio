import React, { useEffect } from 'react';
import './BookModal.css';

function renderStars(rating) {
  if (!rating) return null;
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 === 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const displayRating = roundedRating.toFixed(1);

  return (
    <span className="book-modal-rating-container">
      <span className="book-modal-stars">
        <span style={{ color: '#FFD700' }}>{'★'.repeat(fullStars)}</span>
        {hasHalfStar && <span className="half-star">★</span>}
        {emptyStars > 0 && <span style={{ color: '#ddd' }}>{'★'.repeat(emptyStars)}</span>}
      </span>
      <span className="book-modal-rating-number">({displayRating})</span>
    </span>
  );
}

function BookModal({ book, onClose }) {
  useEffect(() => {
    if (book) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [book]);

  if (!book) return null;

  return (
    <div className="book-modal-overlay" onClick={onClose}>
      <div className="book-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="book-modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className="book-modal-header">
          <h2>{book.title}</h2>
          <p className="book-modal-author">{book.author}</p>
          <div className="book-modal-meta">
            <span className="book-modal-category-badge">{book.category}</span>
            {book.rating ? renderStars(book.rating) : (
              <span className="book-modal-not-rated">Not yet rated</span>
            )}
          </div>
        </div>

        <div className="book-modal-body">
          <div className="book-modal-section">
            <h3>Summary</h3>
            <p>{book.summary}</p>
          </div>

          <div className="book-modal-section">
            <h3>Review</h3>
            {book.review ? (
              <p>{book.review}</p>
            ) : (
              <p className="book-modal-empty">Review coming soon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
