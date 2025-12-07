import React, { useState } from 'react';
import TDEECalculator from './TDEECalculator';
import RecipeModal from './RecipeModal';
import './MealPlanGenerator.css';

// Full recipe database with ingredients and directions - organized by serving style
const getAllRecipes = () => {
  return {
    bowls: [
      {
        name: 'Teriyaki Salmon Bowl',
        protein: 'Salmon',
        vegetables: ['Broccoli', 'Carrots'],
        calories: 500,
        category: 'bowls',
        mealType: 'lunch',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['1 salmon fillet', '½ cup rice', 'Steamed broccoli', 'Carrot ribbons', 'Teriyaki sauce (or GF coconut aminos)']
        },
        directions: [
          'Bake salmon at 400°F for 12–15 min',
          'Cook rice and prep vegetables',
          'Assemble bowl; drizzle teriyaki'
        ]
      },
      {
        name: 'High-Protein Taco Bowl',
        protein: 'Ground beef',
        vegetables: ['Lettuce', 'Avocado'],
        calories: 480,
        category: 'bowls',
        mealType: 'lunch',
        dietaryRestrictions: ['gluten-free'],
        ingredients: {
          main: ['4 oz ground beef or turkey', '½ cup rice or cauliflower rice', 'Lettuce', 'Salsa', 'Avocado']
        },
        directions: [
          'Cook ground meat with taco seasoning',
          'Layer rice → lettuce → meat → salsa → avocado'
        ]
      },
      {
        name: 'Mediterranean Chicken Bowl',
        protein: 'Chicken',
        vegetables: ['Cherry tomatoes', 'Cucumber'],
        calories: 450,
        category: 'bowls',
        mealType: 'lunch',
        dietaryRestrictions: ['gluten-free'],
        ingredients: {
          main: ['1 chicken breast', 'Quinoa', 'Cherry tomatoes', 'Cucumber', 'Olive oil + lemon', 'Optional feta']
        },
        directions: [
          'Grill chicken',
          'Build bowl with quinoa + veggies',
          'Add dressing'
        ]
      },
      {
        name: 'Poke-Style White Fish Bowl',
        protein: 'White fish',
        vegetables: ['Cabbage', 'Cucumber'],
        calories: 420,
        category: 'bowls',
        mealType: 'lunch',
        dietaryRestrictions: ['dairy-free', 'gluten-free'],
        ingredients: {
          main: ['Cooked white fish (cod, haddock, tilapia)', 'Rice', 'Shredded cabbage', 'Cucumber', 'Soy-sesame dressing']
        },
        directions: [
          'Bake or pan-sear white fish',
          'Assemble bowl and drizzle dressing'
        ]
      },
      {
        name: 'Spicy Chickpea Bowl',
        protein: '',
        vegetables: ['Spinach'],
        calories: 380,
        category: 'bowls',
        mealType: 'lunch',
        dietaryRestrictions: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
        ingredients: {
          main: ['1 can chickpeas', '½ tsp paprika + cumin', '½ cup rice', 'Spinach', 'Tahini drizzle']
        },
        directions: [
          'Roast chickpeas at 425°F for 20 min',
          'Assemble bowl with rice + spinach',
          'Add tahini'
        ]
      },
      {
        name: 'Steak & Sweet Potato Power Bowl',
        protein: 'Steak',
        vegetables: ['Kale', 'Sweet potato'],
        calories: 550,
        category: 'bowls',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Thin steak strips', 'Roasted sweet potato cubes', 'Kale', 'Garlic olive-oil drizzle']
        },
        directions: [
          'Pan-sear steak',
          'Roast sweet potato at 425°F for 25 min',
          'Add kale and drizzle dressing'
        ]
      },
      {
        name: 'Lemon Garlic Shrimp Bowl',
        protein: 'Shrimp',
        vegetables: ['Zucchini'],
        calories: 400,
        category: 'bowls',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Shrimp', 'Rice or quinoa', 'Zucchini', 'Lemon + garlic + olive oil']
        },
        directions: [
          'Sauté shrimp with lemon + garlic',
          'Add to rice with sautéed zucchini'
        ]
      },
      {
        name: 'Korean Beef Bowl',
        protein: 'Ground beef',
        vegetables: ['Green onions'],
        calories: 480,
        category: 'bowls',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Lean ground beef', 'Rice', 'Green onions', 'Soy sauce + garlic + ginger + a little sugar']
        },
        directions: [
          'Brown beef',
          'Add sauce',
          'Spoon over rice'
        ]
      },
      {
        name: 'Lemon Tahini Veggie Bowl',
        protein: '',
        vegetables: ['Cauliflower', 'Spinach'],
        calories: 350,
        category: 'bowls',
        mealType: 'lunch',
        dietaryRestrictions: ['vegan', 'gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Roasted cauliflower', 'Chickpeas', 'Spinach', 'Tahini + lemon']
        },
        directions: [
          'Roast cauliflower + chickpeas',
          'Assemble bowl; drizzle tahini'
        ]
      },
      {
        name: 'High-Protein Breakfast-Style Egg Bowl',
        protein: 'Eggs',
        vegetables: ['Spinach', 'Sweet potato'],
        calories: 380,
        category: 'bowls',
        mealType: 'breakfast',
        dietaryRestrictions: ['gluten-free'],
        ingredients: {
          main: ['Two fried or scrambled eggs', 'Sweet potato cubes', 'Spinach', 'Salsa']
        },
        directions: [
          'Roast sweet potato',
          'Add eggs + spinach + salsa'
        ]
      }
    ],
    stirFries: [
      {
        name: 'Chicken Veggie Stir Fry',
        protein: 'Chicken',
        vegetables: ['Broccoli', 'Bell peppers'],
        calories: 420,
        category: 'stirFries',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Chicken strips', 'Broccoli', 'Bell peppers', 'Soy sauce + honey', 'Garlic']
        },
        directions: [
          'Stir fry chicken',
          'Add veggies + sauce; cook 5 min'
        ]
      },
      {
        name: 'Steak Pepper Stir Fry',
        protein: 'Steak',
        vegetables: ['Red and green peppers', 'Onion'],
        calories: 480,
        category: 'stirFries',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Thin steak slices', 'Red and green peppers', 'Onion', 'Soy sauce + garlic']
        },
        directions: [
          'Sear steak on high heat',
          'Add peppers + onions + sauce',
          'Stir on high until everything caramelizes'
        ]
      },
      {
        name: 'White Fish Coconut Stir Fry',
        protein: 'White fish',
        vegetables: ['Spinach'],
        calories: 400,
        category: 'stirFries',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free', 'pescatarian'],
        ingredients: {
          main: ['Cod or tilapia', 'Coconut milk', 'Spinach', 'Lime', 'Curry powder']
        },
        directions: [
          'Sauté fish until flaky',
          'Add coconut milk + curry + spinach',
          'Simmer 5 min'
        ]
      },
      {
        name: 'Garlic Shrimp & Glass Noodles',
        protein: 'Shrimp',
        vegetables: ['Carrots', 'Scallions'],
        calories: 380,
        category: 'stirFries',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Shrimp', 'Glass noodles soaked', 'Carrots + scallions', 'Soy sauce + garlic']
        },
        directions: [
          'Stir fry shrimp',
          'Add veggies + noodles + sauce'
        ]
      },
      {
        name: 'Tofu Veggie Stir Fry',
        protein: 'Tofu',
        vegetables: ['Broccoli', 'Mushrooms'],
        calories: 350,
        category: 'stirFries',
        mealType: 'dinner',
        dietaryRestrictions: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'],
        ingredients: {
          main: ['Firm tofu', 'Broccoli', 'Mushrooms', 'Soy sauce, garlic, ginger']
        },
        directions: [
          'Pan-fry tofu until browned',
          'Add veggies and sauce'
        ]
      },
      {
        name: 'Chili Lime Chicken Stir Fry',
        protein: 'Chicken',
        vegetables: ['Zucchini'],
        calories: 400,
        category: 'stirFries',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Chicken breast strips', 'Zucchini', 'Lime', 'Chili powder']
        },
        directions: [
          'Stir fry chicken',
          'Add vegetables + lime + chili'
        ]
      },
      {
        name: 'Sesame Beef & Green Beans',
        protein: 'Beef',
        vegetables: ['Green beans'],
        calories: 450,
        category: 'stirFries',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Lean beef strips', 'Green beans', 'Soy + sesame oil + garlic']
        },
        directions: [
          'Sear beef',
          'Add green beans + sauce; cook until tender'
        ]
      }
    ],
    proteinHeavy: [
      {
        name: 'Crispy Salmon with Lemon Herb Crust',
        protein: 'Salmon',
        vegetables: [],
        calories: 500,
        category: 'proteinHeavy',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Salmon fillet', 'Olive oil', 'Lemon', 'Dill', 'Garlic']
        },
        directions: [
          'Rub salmon with oil + herbs',
          'Bake at 425°F for 10–12 min'
        ]
      },
      {
        name: 'Pan-Seared Steak (simple)',
        protein: 'Steak',
        vegetables: [],
        calories: 520,
        category: 'proteinHeavy',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Sirloin or strip steak', 'Salt, pepper', 'Olive oil']
        },
        directions: [
          'Heat pan to high',
          'Sear 3–4 min per side',
          'Rest 5 min'
        ]
      },
      {
        name: 'Blackened White Fish',
        protein: 'White fish',
        vegetables: [],
        calories: 380,
        category: 'proteinHeavy',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['White fish fillet', 'Paprika, garlic, pepper, salt', 'Olive oil']
        },
        directions: [
          'Coat fish in spices',
          'Pan-sear 3–4 min per side'
        ]
      },
      {
        name: 'Shrimp Skillet with Tomato & Basil',
        protein: 'Shrimp',
        vegetables: ['Cherry tomatoes'],
        calories: 400,
        category: 'proteinHeavy',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free'],
        ingredients: {
          main: ['Shrimp', 'Cherry tomatoes', 'Garlic', 'Basil']
        },
        directions: [
          'Sauté shrimp',
          'Add tomatoes + garlic; cook down 4 min',
          'Add basil'
        ]
      },
      {
        name: 'Greek Chicken (high-protein)',
        protein: 'Chicken',
        vegetables: [],
        calories: 450,
        category: 'proteinHeavy',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free'],
        ingredients: {
          main: ['Chicken breasts', 'Lemon', 'Olive oil', 'Garlic', 'Oregano']
        },
        directions: [
          'Marinate chicken',
          'Bake or grill'
        ]
      },
      {
        name: 'Honey Soy Salmon Bites',
        protein: 'Salmon',
        vegetables: [],
        calories: 420,
        category: 'proteinHeavy',
        mealType: 'dinner',
        dietaryRestrictions: ['dairy-free', 'gluten-free'],
        ingredients: {
          main: ['Cubed salmon', 'Soy sauce', 'Honey', 'Sesame']
        },
        directions: [
          'Toss salmon in sauce',
          'Air fry 8–10 min at 390°F'
        ]
      }
    ],
    pizza: [
      {
        name: 'Cottage-Cheese Crust Protein Pizza',
        protein: 'Cottage cheese',
        vegetables: [],
        calories: 420,
        category: 'pizza',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free'],
        ingredients: {
          main: ['1 cup cottage cheese', '1 egg', '¼ cup shredded cheese', '½ cup oat or GF flour']
        },
        directions: [
          'Blend ingredients',
          'Spread thin on parchment',
          'Bake 12 min at 400°F',
          'Add toppings; bake 5 more min'
        ]
      },
      {
        name: 'Ground-Meat Crust Pizza (no flour)',
        protein: 'Ground chicken',
        vegetables: [],
        calories: 450,
        category: 'pizza',
        mealType: 'dinner',
        dietaryRestrictions: ['gluten-free', 'dairy-free', 'keto'],
        ingredients: {
          main: ['1 lb ground chicken or turkey', 'Salt + garlic', 'Optional: Italian seasoning']
        },
        directions: [
          'Press meat into a thin round',
          'Bake at 400°F for 15 min',
          'Drain fat',
          'Add toppings; bake 5–10 min'
        ]
      }
    ],
    // Keep breakfast options for meal plan generation
    breakfast: [
      {
        name: 'High-Protein Breakfast-Style Egg Bowl',
        protein: 'Eggs',
        vegetables: ['Spinach', 'Sweet potato'],
        calories: 380,
        category: 'breakfast',
        mealType: 'breakfast',
        dietaryRestrictions: ['gluten-free'],
        ingredients: {
          main: ['Two fried or scrambled eggs', 'Sweet potato cubes', 'Spinach', 'Salsa']
        },
        directions: [
          'Roast sweet potato',
          'Add eggs + spinach + salsa'
        ]
      }
    ],
    // Keep lunch/dinner/snacks/desserts for meal plan generation compatibility
    lunch: [],
    dinner: [],
    desserts: []
  };
};

function MealPlanGenerator({ showBrowseOnly = false, onRecipeClick }) {
  const [formData, setFormData] = useState({
    tdee: '',
    preferredProtein: [],
    preferredVegetables: [],
    sweetTreatsPerWeek: '2',
    dietaryRestrictions: []
  });
  const [mealPlan, setMealPlan] = useState(null);
  const [tdeeResults, setTdeeResults] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeSectionPosition, setRecipeSectionPosition] = useState(null);
  const [showBrowseRecipes, setShowBrowseRecipes] = useState(showBrowseOnly);

  // Helper function to get recipes by meal type for meal plan generation
  const getRecipesByMealType = () => {
    const all = getAllRecipes();
    const allRecipes = [
      ...all.bowls,
      ...all.stirFries,
      ...all.proteinHeavy,
      ...all.pizza,
      ...all.breakfast
    ];
    
    return {
      breakfast: allRecipes.filter(r => r.mealType === 'breakfast'),
      lunch: allRecipes.filter(r => r.mealType === 'lunch'),
      dinner: allRecipes.filter(r => r.mealType === 'dinner'),
      snacks: allRecipes.filter(r => r.mealType === 'snack'),
      desserts: allRecipes.filter(r => r.mealType === 'dessert')
    };
  };

  const recipes = getRecipesByMealType();

  const generateMealPlan = () => {
    if (!formData.tdee) {
      alert('Please calculate your TDEE first');
      return;
    }

    const tdee = parseFloat(formData.tdee);
    const sweetTreatsCount = parseInt(formData.sweetTreatsPerWeek || '2');
    const dailyCalories = tdee;

    // Filter recipes - since form fields were removed, show all recipes
    const filterRecipes = (recipeList) => {
      return recipeList;
    };

    let breakfastOptions = filterRecipes(recipes.breakfast);
    let lunchOptions = filterRecipes(recipes.lunch);
    let dinnerOptions = filterRecipes(recipes.dinner);
    let snackOptions = filterRecipes(recipes.snacks);
    let dessertOptions = filterRecipes(recipes.desserts);

    // Fallback to all recipes if filtering results in empty arrays
    const allRecipesByType = getRecipesByMealType();
    if (breakfastOptions.length === 0) breakfastOptions = allRecipesByType.breakfast;
    if (lunchOptions.length === 0) lunchOptions = allRecipesByType.lunch;
    if (dinnerOptions.length === 0) dinnerOptions = allRecipesByType.dinner;
    if (snackOptions.length === 0) snackOptions = allRecipesByType.snacks;
    if (dessertOptions.length === 0) dessertOptions = allRecipesByType.desserts;

    // Validate we have recipes
    if (breakfastOptions.length === 0 || lunchOptions.length === 0 || 
        dinnerOptions.length === 0 || snackOptions.length === 0) {
      alert('Unable to generate meal plan. Please adjust your preferences or try again.');
      return;
    }

    // Generate 7-day meal plan
    const weeklyPlan = [];
    for (let day = 1; day <= 7; day++) {
      const breakfast = breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)];
      const lunch = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
      const dinner = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
      const snack = snackOptions[Math.floor(Math.random() * snackOptions.length)];
      
      if (!breakfast || !lunch || !dinner || !snack) {
        alert('Error generating meal plan. Please try again.');
        return;
      }
      
      const dayCalories = breakfast.calories + lunch.calories + dinner.calories + snack.calories;
      const remainingCalories = dailyCalories - dayCalories;
      
      // Add dessert if within calorie budget and sweet treats limit
      let dessert = null;
      if (day <= sweetTreatsCount && remainingCalories >= 150 && dessertOptions.length > 0) {
        dessert = dessertOptions[Math.floor(Math.random() * dessertOptions.length)];
      }

      weeklyPlan.push({
        day,
        breakfast,
        lunch,
        dinner,
        snack,
        dessert,
        totalCalories: dayCalories + (dessert ? dessert.calories : 0)
      });
    }

    setMealPlan(weeklyPlan);
  };

  const handleTdeeCalculated = (calculatedTdee) => {
    setFormData({ ...formData, tdee: calculatedTdee.toString() });
    setTdeeResults({ tdee: calculatedTdee });
  };

  const openRecipe = (recipe, category) => {
    if (onRecipeClick) {
      onRecipeClick(recipe);
    } else {
      // If category is provided, position modal at the same height as the category title
      if (category) {
        const sectionTitle = document.querySelector(`[data-category="${category}"]`);
        if (sectionTitle) {
          const rect = sectionTitle.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Position modal at the same vertical position as the category title
          setRecipeSectionPosition({
            top: rect.top + scrollTop + 20, // Position just below the category title
            left: 0 // Will be centered using transform: translateX(-50%)
          });
        } else {
          setRecipeSectionPosition(null); // Center if section not found
        }
      } else {
        // No category (meal plan recipes) - open in center
        setRecipeSectionPosition(null);
      }
      setSelectedRecipe(recipe);
    }
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
    setRecipeSectionPosition(null);
  };

  const getAllRecipesByCategory = () => {
    const all = getAllRecipes();
    return {
      bowls: all.bowls,
      'stir fries': all.stirFries,
      'meats & protein mains': all.proteinHeavy,
      'pizza base options': all.pizza
    };
  };

  return (
    <div className="meal-plan-generator">
      {!showBrowseOnly && (
        <>
          <div className="meal-plan-header">
            <div className="meal-plan-title-section">
              <h3>Create Your Custom Meal Plan</h3>
              <p className="generator-description">First, calculate your TDEE, then fill out your preferences to generate a personalized meal plan.</p>
            </div>
            <button 
              className="browse-recipes-btn" 
              onClick={() => setShowBrowseRecipes(!showBrowseRecipes)}
            >
              {showBrowseRecipes ? 'Hide All Recipes' : 'Browse All Recipes'}
            </button>
          </div>
        </>
      )}
      
      {showBrowseOnly && (
        <>
          <h3>All Recipes</h3>
          <p className="generator-description">Click on any recipe to view full ingredients and directions.</p>
        </>
      )}

      {(showBrowseRecipes || showBrowseOnly) && (
        <div className="browse-recipes-section">
          <h4>All Recipes</h4>
          {Object.entries(getAllRecipesByCategory()).map(([category, categoryRecipes]) => {
            const categoryTitles = {
              'bowls': 'Bowls',
              'stir fries': 'Stir Fries',
              'meats & protein mains': 'Meats & Protein Mains',
              'pizza base options': 'Pizza Base Options'
            };
            return categoryRecipes.length > 0 && (
              <div key={category} className="recipe-category-group">
                <h5 className="recipe-category-title" data-category={category}>
                  {categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1)}
                </h5>
                <div className="recipes-browse-grid">
                  {categoryRecipes.map((recipe, index) => (
                    <div 
                      key={index} 
                      className="recipe-browse-card"
                      onClick={() => openRecipe(recipe, category)}
                    >
                      <h6>{recipe.name}</h6>
                      <p className="recipe-calories">{recipe.calories} cal</p>
                      {recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0 && (
                        <div className="recipe-tags">
                          {recipe.dietaryRestrictions.map((tag, i) => (
                            <span key={i} className="recipe-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!showBrowseOnly && (
        <>
      <div className="tdee-section">
        <h4>Step 1: Calculate Your TDEE</h4>
        <TDEECalculator onCalculate={handleTdeeCalculated} />
        {tdeeResults && (
          <div className="tdee-success">
            <p>✓ TDEE calculated! Your value has been automatically filled in below.</p>
          </div>
        )}
      </div>

      <button className="generate-btn" onClick={generateMealPlan}>
        Generate Meal Plan
      </button>
        </>
      )}

      {!showBrowseOnly && mealPlan && (
        <div className="meal-plan-results">
          <h4>Your 7-Day Meal Plan</h4>
          <div className="meal-plan-grid">
            {mealPlan.map((day, index) => (
              <div key={index} className="day-card">
                <h5>Day {day.day}</h5>
                <div className="meal-item clickable" onClick={() => openRecipe(day.breakfast)}>
                  <span className="meal-type">Breakfast:</span>
                  <span className="meal-name">{day.breakfast.name}</span>
                  <span className="meal-calories">{day.breakfast.calories} cal</span>
                </div>
                <div className="meal-item clickable" onClick={() => openRecipe(day.lunch)}>
                  <span className="meal-type">Lunch:</span>
                  <span className="meal-name">{day.lunch.name}</span>
                  <span className="meal-calories">{day.lunch.calories} cal</span>
                </div>
                <div className="meal-item clickable" onClick={() => openRecipe(day.dinner)}>
                  <span className="meal-type">Dinner:</span>
                  <span className="meal-name">{day.dinner.name}</span>
                  <span className="meal-calories">{day.dinner.calories} cal</span>
                </div>
                <div className="meal-item clickable" onClick={() => openRecipe(day.snack)}>
                  <span className="meal-type">Snack:</span>
                  <span className="meal-name">{day.snack.name}</span>
                  <span className="meal-calories">{day.snack.calories} cal</span>
                </div>
                {day.dessert && (
                  <div className="meal-item dessert clickable" onClick={() => openRecipe(day.dessert)}>
                    <span className="meal-type">Dessert:</span>
                    <span className="meal-name">{day.dessert.name}</span>
                    <span className="meal-calories">{day.dessert.calories} cal</span>
                  </div>
                )}
                <div className="day-total">
                  <strong>Total: {day.totalCalories} calories</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!onRecipeClick && selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeRecipe} position={recipeSectionPosition} />
      )}
    </div>
  );
}

export default MealPlanGenerator;
