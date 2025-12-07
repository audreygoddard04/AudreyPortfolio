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
          <div className={`cta-section ${expandedSections.mealPlan ? 'has-expanded' : ''}`}>
            <button className={`cta-card ${expandedSections.mealPlan ? 'expanded' : ''}`} onClick={() => toggleSection('mealPlan')}>
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

          <div className={`cta-section ${expandedSections.groceries ? 'has-expanded' : ''}`}>
            <button className={`cta-card ${expandedSections.groceries ? 'expanded' : ''}`} onClick={() => toggleSection('groceries')}>
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

          <div className={`cta-section ${expandedSections.hacks ? 'has-expanded' : ''}`}>
            <button className={`cta-card ${expandedSections.hacks ? 'expanded' : ''}`} onClick={() => toggleSection('hacks')}>
              <div className="cta-content">
                <h2>Nutrition Hacks</h2>
                <p>Quick tips, what to include, and what to avoid for optimal nutrition</p>
              </div>
              {expandedSections.hacks ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedSections.hacks && (
              <div className="cta-expanded-content">
          <div className="nutrition-hacks-container">
            <div className="hacks-grid">
              <div className="hack-card">
                <h4>Craving Control</h4>
                <ul>
                  <li>Craving salty? You might be dehydrated. Drink water first.</li>
                  <li>Craving sugar? Eat protein to stabilize blood sugar.</li>
                  <li>Nighttime hunger? Test with a healthy snack. If you won't eat it, you're not truly hungry.</li>
                  <li>Boiled egg test: "Would I eat a boiled egg right now?" If not, you're likely just bored or stressed.</li>
                  <li>Avoid artificial sweeteners if they trigger cravings.</li>
                  <li>Brush your teeth after dinner to signal the end of eating.</li>
                </ul>
              </div>

              <div className="hack-card">
                <h4>Smart Eating Habits</h4>
                <ul>
                  <li>Eat slowly and mindfully—it takes ~20 minutes for satiety hormones to work.</li>
                  <li>Use smaller plates to naturally control portion size.</li>
                  <li>Don't drink your calories—liquid calories don't trigger fullness the same way.</li>
                  <li>Say no at the store—avoiding junk at purchase is easier than resisting daily.</li>
                  <li>Keep tempting foods out of sight—out of sight = out of mind.</li>
                  <li>Always plate your snacks—eating from the bag encourages overeating.</li>
                </ul>
              </div>

              <div className="hack-card">
                <h4>Macronutrient Strategies</h4>
                <ul>
                  <li>Eat 1g of protein per lb of body weight per day (especially if training).</li>
                  <li>Front-load protein early in the day to reduce cravings later.</li>
                  <li>Pair carbs with protein or fat to blunt blood sugar spikes.</li>
                  <li>Limit refined sugars to stabilize mood and energy.</li>
                  <li>Limit simple carbs—especially ultra-processed, low-fiber versions.</li>
                  <li>Aim for fiber with every meal for gut health and satiety.</li>
                  <li>Prioritize whole foods over macros—quality matters more.</li>
                </ul>
              </div>

              <div className="hack-card">
                <h4>Meal Planning & Timing</h4>
                <ul>
                  <li>Meal prep weekly to avoid decision fatigue.</li>
                  <li>Don't skip meals—leads to blood sugar crashes and binge eating.</li>
                  <li>Eat within 60–90 minutes of waking up to jump-start metabolism.</li>
                  <li>Try time-restricted eating (e.g. 8–12 hr eating window) if it fits your schedule.</li>
                  <li>Prep high-protein snacks ahead of time (hard-boiled eggs, Greek yogurt, cottage cheese, trail mix).</li>
                </ul>
              </div>

              <div className="hack-card">
                <h4>Psychology & Behavior</h4>
                <ul>
                  <li>Don't moralize food—one indulgence doesn't "ruin" your day.</li>
                  <li>Use "if/then" planning: If I crave sweets, then I'll go for a walk or drink water.</li>
                  <li>Associate healthy food with a reward (nice music, presentation, enjoyable environment).</li>
                  <li>Avoid all-or-nothing thinking—aim for consistency, not perfection.</li>
                  <li>Change your identity first: Think "I'm a healthy person" rather than "I'm trying to be healthy."</li>
                </ul>
              </div>

              <div className="hack-card">
                <h4>Gut & Digestion</h4>
                <ul>
                  <li>Chew your food thoroughly to aid digestion and prevent bloating.</li>
                  <li>Eat fermented foods (yogurt, kimchi, sauerkraut) to support gut bacteria.</li>
                  <li>Stay hydrated throughout the day—water supports digestion and hunger regulation.</li>
                  <li>Avoid lying down after eating to prevent acid reflux.</li>
                  <li>Start meals with greens or vinegar-based foods to help with glycemic control.</li>
                </ul>
              </div>

              <div className="hack-card">
                <h4>Sleep, Stress & Hormones</h4>
                <ul>
                  <li>Sleep at least 7–8 hours—poor sleep increases ghrelin (hunger hormone) and cravings.</li>
                  <li>Manage stress proactively—chronic stress elevates cortisol, which increases fat storage.</li>
                  <li>Caffeine curfew—cut off caffeine ~6–8 hours before bed to protect sleep quality.</li>
                </ul>
              </div>
            </div>
                </div>
              </div>
            )}
          </div>

          <div className={`cta-section ${expandedSections.fasting ? 'has-expanded' : ''}`}>
            <button className={`cta-card ${expandedSections.fasting ? 'expanded' : ''}`} onClick={() => toggleSection('fasting')}>
              <div className="cta-content">
                <h2>Fasting Protocols</h2>
                <p>Different fasting methods and their benefits</p>
              </div>
              {expandedSections.fasting ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedSections.fasting && (
              <div className="cta-expanded-content">
                <div className="fasting-container">
            <div className="fasting-grid">
              <div className="fasting-card">
                <h4 className="fasting-title">Intermittent Fasting</h4>
                <div className="fasting-content">
                  <p><strong>Duration:</strong> 12-16 hours</p>
                  <p><strong>Benefits:</strong> Helps you lose weight, decreases brain fog, increases energy</p>
                </div>
              </div>
              
              <div className="fasting-card">
                <h4 className="fasting-title">Autophagy Fasting</h4>
                <div className="fasting-content">
                  <p><strong>Duration:</strong> 17-72 hours</p>
                  <p><strong>Benefits:</strong> Helps detox, improve brain function and cognition, prevents colds, and balances sex hormones</p>
                </div>
              </div>
              
              <div className="fasting-card">
                <h4 className="fasting-title">Gut-Reset Fasting</h4>
                <div className="fasting-content">
                  <p><strong>Duration:</strong> 24+ hours</p>
                  <p><strong>Benefits:</strong> Helps counteract antibiotic use, offsets birth control use, helps tackle SIBO</p>
                </div>
              </div>
              
              <div className="fasting-card">
                <h4 className="fasting-title">Fat-Burner Fasting</h4>
                <div className="fasting-content">
                  <p><strong>Duration:</strong> 36+ hours</p>
                  <p><strong>Benefits:</strong> Helps minimize weight-loss resistance, releases stored sugar, reduces cholesterol</p>
                </div>
              </div>
              
              <div className="fasting-card">
                <h4 className="fasting-title">Dopamine-Reset Fasting</h4>
                <div className="fasting-content">
                  <p><strong>Duration:</strong> 48+ hours</p>
                  <p><strong>Benefits:</strong> Helps reboot dopamine levels, and lower anxiety levels</p>
                </div>
              </div>
              
              <div className="fasting-card">
                <h4 className="fasting-title">Immune-Reset Fasting</h4>
                <div className="fasting-content">
                  <p><strong>Duration:</strong> 72+ hours</p>
                  <p><strong>Benefits:</strong> Helps ease chronic conditions, prevent chronic disease, alleviate pain and stiffness, and slow down the effects of aging</p>
                </div>
              </div>
            </div>
          </div>
              </div>
            )}
          </div>

          <div className={`cta-section ${expandedSections.vitamins ? 'has-expanded' : ''}`}>
            <button className={`cta-card ${expandedSections.vitamins ? 'expanded' : ''}`} onClick={() => toggleSection('vitamins')}>
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

          <div className={`cta-section ${expandedSections.browseRecipes ? 'has-expanded' : ''}`}>
            <button className={`cta-card ${expandedSections.browseRecipes ? 'expanded' : ''}`} onClick={() => toggleSection('browseRecipes')}>
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
