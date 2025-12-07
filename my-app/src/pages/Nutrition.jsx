import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import MealPlanGenerator from '../components/MealPlanGenerator';
import RecipeModal from '../components/RecipeModal';
import './ProjectDetail.css';
import '../pages/Health.css';

function Nutrition() {
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="project-detail-bg health-bg">
      <div className="project-detail-container">
        <Link to="/services" className="back-link">Back to Services</Link>
        
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Nutrition</h1>
            <p className="project-detail-subtitle">Evidence-based nutrition information and practical guides for optimal health and performance.</p>
            <div className="project-detail-meta">
              <span className="project-year-badge">2025</span>
            </div>
          </div>
        </header>

        <section className="main-section project-detail-section">
          <div className="cta-section">
            <button className="cta-card" onClick={() => toggleSection('mealPlan')}>
              <div className="cta-content">
                <h2>Create Your Custom Meal Plan</h2>
                <p>Calculate your TDEE and get personalized meal recommendations based on your preferences</p>
              </div>
              {expandedSections.mealPlan ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedSections.mealPlan && (
              <div className="cta-expanded-content">
                <MealPlanGenerator />
              </div>
            )}
          </div>

          <div className="cta-section">
            <button className="cta-card" onClick={() => toggleSection('groceries')}>
              <div className="cta-content">
                <h2>Check Out My Grocery Staples</h2>
                <p>Essential items for a well-stocked kitchen</p>
              </div>
              {expandedSections.groceries ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedSections.groceries && (
              <div className="cta-expanded-content">
                <div className="info-subsection">
                  <h3>Fruits & Veggies</h3>
                  <ul className="info-list">
                    <li>Honey crisp apples</li>
                    <li>Bananas</li>
                    <li>Cantaloupe</li>
                    <li>Strawberries</li>
                    <li>Cilantro</li>
                    <li>Kale</li>
                    <li>Parsley</li>
                    <li>Avocados</li>
                    <li>Peppers</li>
                    <li>Spinach</li>
                    <li>Green onion</li>
                    <li>Red onion</li>
                    <li>Carrots</li>
                    <li>Corn (fresh)</li>
                    <li>Cucumber</li>
                    <li>Celery</li>
                    <li>Tomatoes</li>
                    <li>Potatoes</li>
                    <li>Mushrooms</li>
                    <li>Brussels sprouts</li>
                    <li>Zucchini</li>
                    <li>Cauliflower</li>
                    <li>Cabbage</li>
                    <li>Spaghetti squash</li>
                  </ul>
                </div>

                <div className="info-subsection">
                  <h3>Meat & Seafood</h3>
                  <ul className="info-list">
                    <li>Chicken</li>
                    <li>Lean ground turkey/beef</li>
                    <li>Steak (eye of round, top round, sirloin tip side)</li>
                    <li>Turkey/chicken bacon</li>
                    <li>Salmon</li>
                    <li>White fish</li>
                    <li>Shrimp</li>
                  </ul>
                </div>

                <div className="info-subsection">
                  <h3>Deli / Refrigerated</h3>
                  <ul className="info-list">
                    <li>Hummus</li>
                    <li>Eggs</li>
                    <li>Egg whites</li>
                    <li>Butter</li>
                    <li>Plain Greek yogurt</li>
                    <li>Cottage cheese</li>
                    <li>Raw cheese (Gruyère or cheddar)</li>
                    <li>Milk</li>
                    <li>Chocolate milk</li>
                  </ul>
                </div>

                <div className="info-subsection">
                  <h3>Pantry</h3>
                  <ul className="info-list">
                    <li>Lemon juice (shelf-stable bottle)</li>
                    <li>Honey</li>
                    <li>Mustard</li>
                    <li>Soy sauce</li>
                    <li>Black pepper</li>
                    <li>Taco seasoning</li>
                    <li>Cocoa powder</li>
                    <li>Cinnamon</li>
                    <li>Dark chocolate (candy/snacks aisle)</li>
                    <li>Dill pickles</li>
                    <li>Banana peppers (jarred)</li>
                    <li>Chickpeas (canned or dry)</li>
                    <li>Canned tuna</li>
                    <li>Sugar-free maple syrup</li>
                    <li>Low-carb wraps</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="cta-section">
            <button className="cta-card" onClick={() => toggleSection('hacks')}>
              <div className="cta-content">
                <h2>Nutrition Hacks</h2>
                <p>Quick tips, what to include, and what to avoid for optimal nutrition</p>
              </div>
              {expandedSections.hacks ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedSections.hacks && (
              <div className="cta-expanded-content">
                <div className="info-subsection">
                  <h3>Quick Tips</h3>
                  <ul className="info-list">
                    <li>Craving sugar: eat protein</li>
                    <li>Craving salty: you're dehydrated, drink a huge glass of water first</li>
                    <li>Challenge yourself to eat a healthy snack (carrots and hummus) when craving something at bedtime. if you don't want that snack, then you're not actually hungry</li>
                    <li>Aim to eat 1g of protein per lb of body weight a day.</li>
                  </ul>
                </div>

                <div className="info-subsection">
                  <h3 className="aside-header">5 in</h3>
                  <ol className="numbered-list">
                    <li>
                      <strong>Omega 3 Fats:</strong> Increase omega-3 intake to a minimum of 2 grams per day
                    </li>
                    <li>
                      <strong>Protein:</strong> Eat at least 30 grams of healthy whole food protein per meal
                    </li>
                    <li>
                      <strong>Probiotics:</strong> Eat three or more servings of probiotic containing foods per day
                    </li>
                    <li>
                      <strong>Fiber:</strong> Eat over 50 grams of fiber per day
                    </li>
                    <li>
                      <strong>Micronutrients/Antioxidants:</strong> Increase antioxidants, micronutrients, and polyphenols through colorful plant diversity and spices
                    </li>
                  </ol>
                </div>

                <div className="info-subsection">
                  <h3 className="aside-header">3 out</h3>
                  <ol className="numbered-list">
                    <li>Refined or "added" <strong>sugars</strong></li>
                    <li>Refined <strong>grains</strong></li>
                    <li>Refined industrial <strong>vegetable or seed oils</strong> of any kind</li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          <div className="cta-section">
            <button className="cta-card" onClick={() => toggleSection('fasting')}>
              <div className="cta-content">
                <h2>Fasting Protocols</h2>
                <p>Different fasting methods and their benefits</p>
              </div>
              {expandedSections.fasting ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedSections.fasting && (
              <div className="cta-expanded-content">
                <div className="fasting-card">
                  <h3 className="aside-header">Intermittent fasting</h3>
                  <ul className="info-list">
                    <li>12-16 hours</li>
                    <li>helps you lose weight, decreases brain fog, increases energy</li>
                  </ul>
                </div>

                <div className="fasting-card">
                  <h3 className="aside-header">Fat-burner fasting</h3>
                  <ul className="info-list">
                    <li>36+ hours</li>
                    <li>minimizes weight-loss resistance, releases stored sugar, reduces cholesterol</li>
                  </ul>
                </div>

                <div className="fasting-card">
                  <h3 className="aside-header">Autophagy fasting</h3>
                  <ul className="info-list">
                    <li>17-72 hours</li>
                    <li>detox, improve brain function & cognition, prevents colds, balances sex hormones</li>
                  </ul>
                </div>

                <div className="fasting-card">
                  <h3 className="aside-header">Dopamine-reset fasting</h3>
                  <ul className="info-list">
                    <li>48+ hours</li>
                    <li>helps reboot dopamine levels, and lower anxiety levels</li>
                  </ul>
                </div>

                <div className="fasting-card">
                  <h3 className="aside-header">Gut-reset fasting</h3>
                  <ul className="info-list">
                    <li>24+ hours</li>
                    <li>counteract antibiotic use, offsets birth control use, helps microbiome</li>
                  </ul>
                </div>

                <div className="fasting-card">
                  <h3 className="aside-header">Immune-reset fasting</h3>
                  <ul className="info-list">
                    <li>72+ hours</li>
                    <li>helps ease/prevent chronic conditions, alleviate pain and stiffness of musculoskeletal injuries, and slows down the effects of aging</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="cta-section">
            <button className="cta-card" onClick={() => toggleSection('vitamins')}>
              <div className="cta-content">
                <h2>Vitamins & Antioxidants</h2>
                <p>Essential vitamins, their functions, and dietary sources</p>
              </div>
              {expandedSections.vitamins ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedSections.vitamins && (
              <div className="cta-expanded-content">
                <div className="table-container">
                  <table className="vitamins-table">
                    <thead>
                      <tr>
                        <th>Vitamin</th>
                        <th>Function</th>
                        <th>Key Points</th>
                        <th>Dietary Sources</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>B1 (Thiamine)</strong></td>
                        <td>Carbohydrate metabolism</td>
                        <td>Not stored in body; forms TPP</td>
                        <td>Liver, spinach, green peas, beans, whole grains, legumes</td>
                      </tr>
                      <tr>
                        <td><strong>B2 (Riboflavin)</strong></td>
                        <td>Redox reactions</td>
                        <td>Forms FMN & FAD</td>
                        <td>Soybeans, liver, milk, cheese, leafy greens</td>
                      </tr>
                      <tr>
                        <td><strong>B3 (Niacin)</strong></td>
                        <td>Redox reactions</td>
                        <td>Forms NAD⁺ & NADP⁺; can be synthesized inefficiently</td>
                        <td>Meat, vegetables, milk, cheese, grains</td>
                      </tr>
                      <tr>
                        <td><strong>B6 (Pyridoxine)</strong></td>
                        <td>Amino acid metabolism</td>
                        <td>Coenzyme for A-keto ↔ amino acid conversion; excess causes nerve damage</td>
                        <td>Avocado, chicken, fish, nuts, liver, bananas</td>
                      </tr>
                      <tr>
                        <td><strong>Biotin</strong></td>
                        <td>Lipid & carbohydrate metabolism</td>
                        <td>Carbon transporter; made by gut bacteria</td>
                        <td>—</td>
                      </tr>
                      <tr>
                        <td><strong>Folic Acid</strong></td>
                        <td>DNA & cell growth</td>
                        <td>Also made in intestines</td>
                        <td>Leafy greens, dried beans, liver</td>
                      </tr>
                      <tr>
                        <td><strong>B12 (Cobalamin)</strong></td>
                        <td>RBC formation & nerve function</td>
                        <td>Must obtain from food</td>
                        <td>Meat, eggs, milk, cereal</td>
                      </tr>
                      <tr>
                        <td><strong>A (Retinol)</strong></td>
                        <td>Vision & epithelial cell health</td>
                        <td>Antioxidant</td>
                        <td>Carrots, eggs, dairy</td>
                      </tr>
                      <tr>
                        <td><strong>C (Ascorbic Acid)</strong></td>
                        <td>Collagen synthesis & antioxidant</td>
                        <td>Keeps iron in 2+ state; stabilizes collagen</td>
                        <td>Citrus fruits, peppers, berries</td>
                      </tr>
                      <tr>
                        <td><strong>D (Cholecalciferol)</strong></td>
                        <td>Calcium & phosphorus absorption</td>
                        <td>"Sunshine vitamin"</td>
                        <td>Sunlight exposure, fortified milk, fish</td>
                      </tr>
                      <tr>
                        <td><strong>E (Tocopherol)</strong></td>
                        <td>Antioxidant</td>
                        <td>Protects cell membranes</td>
                        <td>Vegetable oils, nuts, whole grains, leafy greens</td>
                      </tr>
                      <tr>
                        <td><strong>K</strong></td>
                        <td>Blood clotting</td>
                        <td>Essential for prothrombin formation</td>
                        <td>Leafy greens, cauliflower, broccoli, organ meats, milk, soybeans, avocados, bananas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="cta-section">
            <button className="cta-card" onClick={() => toggleSection('browseRecipes')}>
              <div className="cta-content">
                <h2>Browse All Recipes</h2>
                <p>View all available recipes with full ingredients and directions</p>
              </div>
              {expandedSections.browseRecipes ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedSections.browseRecipes && (
              <div className="cta-expanded-content">
                <MealPlanGenerator showBrowseOnly={true} onRecipeClick={openRecipe} />
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeRecipe} />
      )}
    </div>
  );
}

export default Nutrition;
