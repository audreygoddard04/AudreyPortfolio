import React, { useEffect, useRef } from 'react';
import './RecipeModal.css';

function RecipeModal({ recipe, onClose, position }) {
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (recipe) {
      // Prevent body scroll when modal is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      // Lock position - don't recalculate or scroll
      
      return () => {
        // Restore scroll when modal closes
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [recipe]);

  if (!recipe) return null;

  const renderIngredients = () => {
    if (!recipe.ingredients) return null;
    
    return Object.entries(recipe.ingredients).map(([section, items]) => (
      <div key={section} className="ingredient-section">
        <h4 className="ingredient-section-title">
          {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
        </h4>
        <ul className="ingredient-list">
          {Array.isArray(items) ? items.map((item, index) => (
            <li key={index}>{item}</li>
          )) : (
            <li>{items}</li>
          )}
        </ul>
      </div>
    ));
  };

  const modalStyle = position ? {
    position: 'fixed',
    top: `${position.top}px`,
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
    width: position.cardWidth ? `${Math.min(position.cardWidth - 40, 700)}px` : 'calc(100vw - 40px)',
    maxWidth: position.cardWidth ? `${position.cardWidth - 40}px` : '700px'
  } : {};

  return (
    <div className="recipe-modal-overlay" onClick={onClose} ref={overlayRef}>
      <div 
        className={`recipe-modal-content ${position ? 'positioned' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={position ? modalStyle : {}}
        ref={contentRef}
      >
        <button className="recipe-modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="recipe-modal-header">
          <h2>{recipe.name}</h2>
          <div className="recipe-meta">
            <span className="recipe-category-badge">{recipe.category}</span>
            <span className="recipe-calories-badge">{recipe.calories} calories</span>
            {recipe.macros && (
              <div className="recipe-macros">
                <span>Protein: {recipe.macros.protein}g</span>
                <span>Carbs: {recipe.macros.carbs}g</span>
                <span>Fat: {recipe.macros.fat}g</span>
              </div>
            )}
          </div>
          {recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0 && (
            <div className="recipe-tags">
              {recipe.dietaryRestrictions.map((tag, index) => (
                <span key={index} className="recipe-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="recipe-modal-body">
          {recipe.ingredients && (
            <div className="recipe-section">
              <h3>Ingredients</h3>
              {renderIngredients()}
            </div>
          )}

          {recipe.directions && (
            <div className="recipe-section">
              <h3>Directions</h3>
              <ol className="directions-list">
                {recipe.directions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;

