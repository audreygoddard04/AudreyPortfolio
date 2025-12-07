import React, { useEffect, useRef } from 'react';
import './RecipeModal.css';

function RecipeModal({ recipe, onClose, position }) {
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const [modalWidth, setModalWidth] = React.useState(null);

  useEffect(() => {
    if (recipe) {
      // Prevent body scroll when modal is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      if (position && position.cardWidth) {
        const updateWidth = () => {
          // Recalculate card width on resize by finding the cta-section
          const categoryElements = document.querySelectorAll('[data-category]');
          let foundWidth = null;
          
          for (const category of categoryElements) {
            const ctaSection = category.closest('.cta-section');
            if (ctaSection) {
              const ctaRect = ctaSection.getBoundingClientRect();
              const viewportWidth = window.innerWidth;
              // Ensure modal is always narrower than card and fits viewport
              const calculatedWidth = Math.min(ctaRect.width - 48, 700, viewportWidth - 40);
              if (calculatedWidth > 0) {
                foundWidth = calculatedWidth;
                break;
              }
            }
          }
          
          if (foundWidth) {
            setModalWidth(foundWidth);
          } else if (position.cardWidth) {
            // Fallback to original card width
            const viewportWidth = window.innerWidth;
            setModalWidth(Math.min(position.cardWidth - 48, 700, viewportWidth - 40));
          }
        };

        // Set initial width
        updateWidth();

        // Update on resize with debounce
        let resizeTimeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(updateWidth, 100);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
          document.body.style.overflow = originalOverflow;
          window.removeEventListener('resize', handleResize);
          clearTimeout(resizeTimeout);
        };
      } else {
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }
  }, [recipe, position]);

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
    width: modalWidth ? `${modalWidth}px` : (position.cardWidth ? `${Math.min(position.cardWidth - 48, 700)}px` : 'calc(100vw - 40px)'),
    maxWidth: modalWidth ? `${modalWidth}px` : (position.cardWidth ? `${Math.min(position.cardWidth - 48, 700)}px` : '700px')
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

