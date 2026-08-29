import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MealPlanGenerator from '../components/MealPlanGenerator';
import RecipeModal from '../components/RecipeModal';
import './ProjectDetail.css';
import './Nutrition.css';
import '../pages/Health.css';

const CATEGORIES = [
  { id: 'mealPlan', title: 'Meal Plans', description: 'Structured plans for fat loss, maintenance, muscle gain.' },
  { id: 'groceries', title: 'Groceries', description: 'Budget staples + cost-per-protein comparisons.' },
  { id: 'hacks', title: 'Nutrition Hacks', description: 'Practical, evidence-backed tips.' },
  { id: 'fasting', title: 'Fasting', description: 'Protocols, mechanisms, risks, who should avoid.' },
  { id: 'recipes', title: 'Recipes', description: 'Searchable, macro-tagged.' },
  { id: 'sourdough', title: 'Sourdough', description: 'Starter guide, hydration ratios, fermentation science.' },
  { id: 'vitamins', title: 'Vitamins & Antioxidants', description: 'Deficiencies, sources, bioavailability.' }
];

function Nutrition() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const openRecipe = (recipe) => setSelectedRecipe(recipe);
  const closeRecipe = () => setSelectedRecipe(null);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const expandCategory = (id) => {
    setExpandedCategory(prev => prev === id ? null : id);
    if (expandedCategory !== id) {
      setTimeout(() => {
        const el = document.getElementById(`category-${id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="project-detail-bg health-bg nutrition-page">
      <div className="project-detail-container">
        <Link to="/about" className="back-link">Back to About Me</Link>

        {/* Section 1 — Header + Hero Subheader */}
        <header className="project-detail-header nutrition-header">
          <div className="project-detail-title-section">
            <h1>Nutrition</h1>
            <p className="project-detail-subtitle">Science-Based Nutrition. Built for Real Budgets.</p>
            <div className="nutrition-hero-ctas">
            <button className="nutrition-cta-primary" onClick={() => scrollToSection('meal-plan-tool')}>
              Create Your Custom Meal Plan →
            </button>
            <button className="nutrition-cta-secondary" onClick={() => { setSelectedCard(null); setExpandedCategory('recipes'); setTimeout(() => scrollToSection('category-recipes'), 150); }}>
              Browse Free Meal Plans →
            </button>
          </div>
          </div>
        </header>

        {/* Section 2 — Custom Meal Plan Tool */}
        <section id="meal-plan-tool" className="main-section project-detail-section nutrition-meal-plan-section">
          <h2>Create Your Custom Meal Plan</h2>
          <p className="nutrition-section-summary">
            TDEE-based, evidence-backed, and designed for real budgets. Enter your stats below to get personalized calorie targets, protein goals, and meal recommendations.
          </p>
          <MealPlanGenerator onRecipeClick={openRecipe} />
        </section>

        {/* Section 3 — Core Categories Grid */}
        <section className="main-section project-detail-section nutrition-categories-section">
          <h2>Explore</h2>
          <div className="nutrition-categories-grid">
            {CATEGORIES.map(({ id, title, description }) => {
              const isSelected = (id === 'mealPlan' && selectedCard === 'mealPlan') || (id !== 'mealPlan' && expandedCategory === id);
              return (
                <div
                  key={id}
                  className={`nutrition-category-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    if (id === 'mealPlan') {
                      setSelectedCard('mealPlan');
                      scrollToSection('meal-plan-tool');
                    } else {
                      setSelectedCard(null);
                      expandCategory(id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (id === 'mealPlan') {
                        setSelectedCard('mealPlan');
                        scrollToSection('meal-plan-tool');
                      } else {
                        setSelectedCard(null);
                        expandCategory(id);
                      }
                    }
                  }}
                >
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="nutrition-explore-btn">Explore →</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Category Content Panels */}
        {expandedCategory === 'groceries' && (
          <section id="category-groceries" className="main-section project-detail-section nutrition-category-content">
            <h2>Groceries</h2>
            <p className="nutrition-section-summary">Budget staples and cost-per-protein comparisons for a well-stocked kitchen.</p>
            <div className="nutrition-practical">
              <div className="info-subsection">
                <h3>Fruits & Veggies</h3>
                <ul className="info-list">{['Honey crisp apples', 'Bananas', 'Cantaloupe', 'Strawberries', 'Cilantro', 'Kale', 'Parsley', 'Avocados', 'Peppers', 'Spinach', 'Green onion', 'Red onion', 'Carrots', 'Corn (fresh)', 'Cucumber', 'Celery', 'Tomatoes', 'Potatoes', 'Mushrooms', 'Brussels sprouts', 'Zucchini', 'Cauliflower', 'Cabbage', 'Spaghetti squash'].map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
              <div className="info-subsection">
                <h3>Meat & Seafood</h3>
                <ul className="info-list">{['Chicken', 'Lean ground turkey/beef', 'Steak (eye of round, top round, sirloin tip side)', 'Turkey/chicken bacon', 'Salmon', 'White fish', 'Shrimp'].map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
              <div className="info-subsection">
                <h3>Deli / Refrigerated</h3>
                <ul className="info-list">{['Hummus', 'Eggs', 'Egg whites', 'Butter', 'Plain Greek yogurt', 'Cottage cheese', 'Raw cheese', 'Milk', 'Chocolate milk'].map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
              <div className="info-subsection">
                <h3>Pantry</h3>
                <ul className="info-list">{['Lemon juice', 'Honey', 'Mustard', 'Soy sauce', 'Black pepper', 'Taco seasoning', 'Cocoa powder', 'Cinnamon', 'Dark chocolate', 'Dill pickles', 'Banana peppers', 'Chickpeas', 'Canned tuna', 'Sugar-free maple syrup', 'Low-carb wraps'].map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            </div>
            <div className="nutrition-evidence">
              <h4>Evidence</h4>
              <p>Cost-per-protein data based on USDA FoodData Central. <a href="https://fdc.nal.usda.gov/" target="_blank" rel="noopener noreferrer">PubMed / USDA</a></p>
            </div>
          </section>
        )}

        {expandedCategory === 'hacks' && (
          <section id="category-hacks" className="main-section project-detail-section nutrition-category-content">
            <h2>Nutrition Hacks</h2>
            <p className="nutrition-section-summary">Practical, evidence-backed tips for craving control, smart eating, macros, meal planning, psychology, gut health, and sleep.</p>
            <div className="nutrition-practical">
              <div className="hacks-grid">
                <div className="hack-card">
                  <h4>Craving Control</h4>
                  <ul><li>Craving salty? Drink water first.</li><li>Craving sugar? Eat protein.</li><li>Boiled egg test: Would I eat it? If not, you're bored.</li></ul>
                </div>
                <div className="hack-card">
                  <h4>Smart Eating</h4>
                  <ul><li>Eat slowly—~20 min for satiety.</li><li>Use smaller plates.</li><li>Don't drink your calories.</li><li>Say no at the store.</li></ul>
                </div>
                <div className="hack-card">
                  <h4>Macros & Timing</h4>
                  <ul><li>1g protein/lb body weight.</li><li>Meal prep weekly.</li><li>Don't skip meals.</li><li>Time-restricted eating if it fits.</li></ul>
                </div>
                <div className="hack-card">
                  <h4>Sleep & Stress</h4>
                  <ul><li>7–8 hours sleep.</li><li>Manage stress—cortisol affects storage.</li><li>Caffeine curfew 6–8h before bed.</li></ul>
                </div>
              </div>
            </div>
            <div className="nutrition-evidence">
              <h4>Evidence</h4>
              <p>Based on satiety research, glycemic response studies. <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer">PubMed</a></p>
            </div>
          </section>
        )}

        {expandedCategory === 'fasting' && (
          <section id="category-fasting" className="main-section project-detail-section nutrition-category-content">
            <h2>Fasting</h2>
            <p className="nutrition-section-summary">Protocols, mechanisms, risks, and who should avoid fasting.</p>
            <div className="nutrition-practical">
              <div className="fasting-grid">
                {[
                  { title: 'Intermittent', duration: '12–16h', benefits: 'Weight loss, brain fog, energy' },
                  { title: 'Autophagy', duration: '17–72h', benefits: 'Detox, cognition, hormones' },
                  { title: 'Gut-Reset', duration: '24+h', benefits: 'Antibiotic recovery, SIBO' },
                  { title: 'Fat-Burner', duration: '36+h', benefits: 'Weight-loss resistance, cholesterol' },
                  { title: 'Dopamine-Reset', duration: '48+h', benefits: 'Dopamine, anxiety' },
                  { title: 'Immune-Reset', duration: '72+h', benefits: 'Chronic conditions, aging' }
                ].map((f, i) => (
                  <div key={i} className="fasting-card">
                    <h4>{f.title}</h4>
                    <p><strong>Duration:</strong> {f.duration}</p>
                    <p><strong>Benefits:</strong> {f.benefits}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="nutrition-evidence">
              <h4>Evidence</h4>
              <p>Who should avoid: Pregnant, nursing, history of ED, diabetes on meds. Consult a doctor. <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer">PubMed</a></p>
            </div>
          </section>
        )}

        {expandedCategory === 'recipes' && (
          <section id="category-recipes" className="main-section project-detail-section nutrition-category-content">
            <h2>Recipes</h2>
            <p className="nutrition-section-summary">Searchable, macro-tagged recipes with full ingredients and directions.</p>
            <div className="nutrition-practical">
              <MealPlanGenerator showBrowseOnly={true} onRecipeClick={openRecipe} />
            </div>
            <div className="nutrition-evidence">
              <h4>Evidence</h4>
              <p>Macros based on USDA data. Calorie estimates may vary.</p>
            </div>
          </section>
        )}

        {expandedCategory === 'sourdough' && (
          <section id="category-sourdough" className="main-section project-detail-section nutrition-category-content">
            <h2>Sourdough</h2>
            <p className="nutrition-section-summary">Starter guide, master formula, hydration ratios, recipe variations, and fermentation science.</p>
            <nav className="sourdough-nav" aria-label="Sourdough section navigation">
              <div className="sourdough-nav-buttons">
                <a href="#sourdough-starter" className="sourdough-nav-btn">Starter</a>
                <a href="#sourdough-master" className="sourdough-nav-btn">Base Dough</a>
                <a href="#sourdough-whole-wheat" className="sourdough-nav-btn">Whole Wheat</a>
                <a href="#sourdough-inclusions" className="sourdough-nav-btn">Inclusion Loaves</a>
                <a href="#sourdough-more-info" className="sourdough-nav-btn">More Info</a>
              </div>
            </nav>

            <div className="sourdough-boxes">
              <div id="sourdough-starter" className="sourdough-box">
                <h3>Active Sourdough Starter (100% Hydration)</h3>
                <p>Active starter is recently fed, doubled in volume, mildly tangy, and aerated.</p>
                <h4>Feeding Ratio</h4>
                <ul className="info-list">
                  <li>50 g starter</li>
                  <li>50 g flour</li>
                  <li>50 g water</li>
                </ul>
                <p>100% hydration means equal flour and water by weight.</p>
              </div>

              <div id="sourdough-master" className="sourdough-box">
                <h3>Standard Base Dough (Master Formula)</h3>
                <h4>Base Dough</h4>
                <ul className="info-list">
                  <li>Bread flour: 450 g</li>
                  <li>Water: 325 g</li>
                  <li>Active starter (100% hydration): 100 g</li>
                  <li>Salt: 10 g</li>
                </ul>
                <h4>Percentages</h4>
                <ul className="info-list">
                  <li>Total flour: 500 g = 100%</li>
                  <li>Total water: 375 g = 75%</li>
                  <li>Starter: 20%</li>
                  <li>Salt: 2%</li>
                </ul>
                <p>(Starter contributes 50 g flour + 50 g water)</p>
                <h4>Standard Method (All Loaves)</h4>
                <ol className="info-list sourdough-method">
                  <li>Mix starter + water until dispersed.</li>
                  <li>Add flour. Mix until no dry flour remains.</li>
                  <li>Rest 30 minutes.</li>
                  <li>Add salt. Mix until cohesive.</li>
                  <li>Perform 3–4 stretch and folds during first 90 minutes.</li>
                  <li>Bulk ferment until 50–60% rise.</li>
                  <li>Pre-shape. Rest 20 minutes.</li>
                  <li>Final shape.</li>
                  <li>Proof until slightly puffy.</li>
                  <li>Bake 450°F: 30 min covered, 15–20 min uncovered.</li>
                  <li>Cool minimum 1 hour.</li>
                </ol>
              </div>

              <div id="sourdough-whole-wheat" className="sourdough-box">
                <h3>Classic Whole Wheat (75% Hydration)</h3>
                <h4>Base Dough</h4>
                <ul className="info-list"><li>Bread flour: 350 g</li><li>Whole wheat flour: 100 g</li><li>Starter: 100 g</li><li>Water: 325 g</li><li>Salt: 10 g</li></ul>
                <h4>Baker’s Percentages</h4>
                <p>Bread flour 70%, Whole wheat 20%, Starter 20%, Hydration 75%, Salt 2%. Method: Standard.</p>
              </div>

              <div id="sourdough-inclusions" className="sourdough-inclusions-section">
                <h3 className="sourdough-inclusions-title">Inclusion Loaves</h3>
                <div className="sourdough-box sourdough-inclusions-box">
                  <div id="sourdough-cinnamon" className="sourdough-recipe-item">
                    <h4>Cinnamon Sugar Swirl</h4>
                    <ul className="info-list"><li>Base: Standard Master</li><li>Filling: Sugar 35 g (7%), Cinnamon 6 g (1.2%), Optional butter 15 g (3%)</li></ul>
                    <p>Add filling after pre-shape rest. Roll tightly before final shape.</p>
                  </div>
                  <div id="sourdough-manchego" className="sourdough-recipe-item">
                    <h4>Manchego & Smoked Paprika</h4>
                    <ul className="info-list"><li>Standard Master + Smoked paprika 5 g (1%), Manchego 100 g (20%)</li></ul>
                    <p>Fold cheese during final fold.</p>
                  </div>
                  <div id="sourdough-lemon" className="sourdough-recipe-item">
                    <h4>Lemon Poppy Seed</h4>
                    <ul className="info-list"><li>Bread flour 450 g, Starter 100 g, Water 290 g, Lemon juice 35 g, Salt 10 g, Honey 35 g (7%), Poppy seeds 15 g (3%)</li></ul>
                    <p>Still 75% total liquid. Add zest + sugar mixture during first fold.</p>
                  </div>
                  <div id="sourdough-chocolate-almond" className="sourdough-recipe-item">
                    <h4>Dark Chocolate Almond</h4>
                    <ul className="info-list"><li>Standard Master + Dark chocolate 100 g (20%), Almond extract 2 g (0.4%)</li></ul>
                    <p>Fold chocolate during final fold.</p>
                  </div>
                  <div id="sourdough-tomato-parmesan" className="sourdough-recipe-item">
                    <h4>Sun-Dried Tomato Parmesan</h4>
                    <ul className="info-list"><li>Standard Master + Tomato seasoning 8 g (1.6%), Parmesan 80 g (16%)</li></ul>
                    <p>Add seasoning with flour. Add Parmesan during final fold.</p>
                  </div>
                  <div id="sourdough-everything" className="sourdough-recipe-item">
                    <h4>Everything Bagel</h4>
                    <ul className="info-list"><li>Standard Master + Everything seasoning 20 g (4%)</li></ul>
                    <p>Fold seasoning into dough during early bulk. Optional: coat exterior before bake.</p>
                  </div>
                  <div id="sourdough-cocoa" className="sourdough-recipe-item">
                    <h4>Cocoa Chocolate</h4>
                    <ul className="info-list"><li>Bread flour 430 g, Cocoa 20 g, Starter 100 g, Water 330 g, Salt 10 g, Sugar/honey 25 g (5%), Chocolate chips 60 g (12%)</li></ul>
                    <p>Hydration slightly increased to compensate for cocoa absorption.</p>
                  </div>
                </div>
              </div>

              <div id="sourdough-more-info" className="sourdough-box">
                <h3>More Info: Why Sourdough Is Healthier</h3>
                <ol className="info-list sourdough-health">
                  <li><strong>Fermentation Reduces Phytic Acid</strong> — Phytase enzymes activate; phytic acid binds minerals (iron, zinc, magnesium). Long fermentation reduces phytate, increasing mineral bioavailability.</li>
                  <li><strong>Improved Glycemic Response</strong> — Organic acids (lactic + acetic) slow gastric emptying, reducing post-meal blood glucose spikes.</li>
                  <li><strong>Partial Gluten Breakdown</strong> — Lactic acid bacteria and wild yeast partially hydrolyze gluten. Not gluten-free, but may improve digestibility.</li>
                  <li><strong>Prebiotic Effects</strong> — Organic acids, resistant starch modifications, bioactive peptides support gut microbial diversity.</li>
                  <li><strong>No Commercial Yeast</strong> — Wild fermentation: Lactobacillus species and wild Saccharomyces strains increase flavor and organic acid production.</li>
                  <li><strong>Longer Fermentation = Structural Changes</strong> — Extended hydration improves starch gelatinization, crumb elasticity, aroma compounds.</li>
                </ol>
                <h4>Mechanism Summary</h4>
                <p>Flour + water → enzyme activation. Enzymes break starch into sugars. Yeast consumes sugars → CO₂ (rise). Bacteria produce organic acids → flavor + preservation. Acid environment modifies proteins + minerals.</p>
                <p><strong>Result:</strong> More digestible structure, slower glucose response, improved nutrient availability, enhanced flavor chemistry.</p>
              </div>
            </div>
            <div className="nutrition-evidence">
              <h4>Evidence</h4>
              <p>Fermentation science: wild yeast, lactobacilli, phytase, pH. <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer">PubMed</a></p>
            </div>
          </section>
        )}

        {expandedCategory === 'vitamins' && (
          <section id="category-vitamins" className="main-section project-detail-section nutrition-category-content">
            <h2>Vitamins & Antioxidants</h2>
            <p className="nutrition-section-summary">Deficiencies, sources, and bioavailability. What each vitamin does, deficiency symptoms, best food sources, supplement guidance.</p>
            <div className="nutrition-practical">
              <div className="table-container">
                <table className="vitamins-table">
                  <thead>
                    <tr><th>Vitamin</th><th>Function</th><th>Key Points</th><th>Sources</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ['B1 (Thiamine)', 'Carb metabolism', 'Forms TPP', 'Liver, spinach, beans, grains'],
                      ['B2 (Riboflavin)', 'Redox', 'FMN & FAD', 'Soybeans, liver, milk'],
                      ['B3 (Niacin)', 'Redox', 'NAD⁺', 'Meat, vegetables, grains'],
                      ['B6', 'Amino acid metabolism', 'Excess → nerve damage', 'Avocado, chicken, nuts'],
                      ['B12', 'RBC, nerves', 'Must obtain from food', 'Meat, eggs, milk'],
                      ['A', 'Vision, epithelial', 'Antioxidant', 'Carrots, eggs, dairy'],
                      ['C', 'Collagen, antioxidant', 'Iron 2+ state', 'Citrus, peppers, berries'],
                      ['D', 'Calcium, phosphorus', 'Sunshine vitamin', 'Sun, milk, fish'],
                      ['E', 'Antioxidant', 'Cell membranes', 'Oils, nuts, greens'],
                      ['K', 'Blood clotting', 'Prothrombin', 'Leafy greens, broccoli']
                    ].map((row, i) => (
                      <tr key={i}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="nutrition-evidence">
              <h4>Evidence</h4>
              <p>Deficiency symptoms, bioavailability. Pair fat-soluble (A,D,E,K) with fat. <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer">PubMed</a></p>
            </div>
          </section>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeRecipe} />
      )}
    </div>
  );
}

export default Nutrition;
