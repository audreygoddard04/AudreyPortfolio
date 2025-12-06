import React, { useState } from 'react';
import TDEECalculator from './TDEECalculator';
import './MealPlanGenerator.css';

function MealPlanGenerator() {
  const [formData, setFormData] = useState({
    tdee: '',
    preferredProtein: [],
    preferredVegetables: [],
    sweetTreatsPerWeek: '2',
    dietaryRestrictions: [],
    mealPrepDays: '3'
  });
  const [mealPlan, setMealPlan] = useState(null);
  const [tdeeResults, setTdeeResults] = useState(null);

  const proteins = [
    'Chicken', 'Salmon', 'White fish', 'Shrimp', 'Lean ground turkey',
    'Lean ground beef', 'Steak', 'Turkey/chicken bacon', 'Eggs', 'Cottage cheese'
  ];

  const vegetables = [
    'Spinach', 'Kale', 'Broccoli', 'Cauliflower', 'Brussels sprouts',
    'Zucchini', 'Bell peppers', 'Carrots', 'Cucumber', 'Tomatoes',
    'Mushrooms', 'Asparagus', 'Green beans', 'Cabbage', 'Avocado'
  ];

  const recipes = {
    breakfast: [
      { name: 'Greek yogurt bowl', protein: 'Cottage cheese', vegetables: ['Spinach'], calories: 350 },
      { name: 'Protein pancakes', protein: 'Eggs', vegetables: [], calories: 400 },
      { name: 'Cottage cheese pancakes', protein: 'Cottage cheese', vegetables: [], calories: 380 },
      { name: 'Protein shake', protein: 'Eggs', vegetables: ['Spinach'], calories: 300 }
    ],
    lunch: [
      { name: 'The best chicken salad', protein: 'Chicken', vegetables: ['Spinach', 'Cucumber', 'Tomatoes'], calories: 450 },
      { name: 'Greek quinoa salmon bowl', protein: 'Salmon', vegetables: ['Spinach', 'Cucumber', 'Tomatoes'], calories: 500 },
      { name: 'Protein pizza', protein: 'Chicken', vegetables: ['Bell peppers', 'Mushrooms'], calories: 420 },
      { name: 'Sushi bowl', protein: 'Salmon', vegetables: ['Cucumber', 'Avocado'], calories: 480 },
      { name: 'Basic salad components', protein: 'Chicken', vegetables: ['Spinach', 'Tomatoes', 'Cucumber'], calories: 350 },
      { name: 'Shiratake noodle stir fry', protein: 'Shrimp', vegetables: ['Bell peppers', 'Mushrooms'], calories: 380 }
    ],
    dinner: [
      { name: 'Pork loin', protein: 'Lean ground beef', vegetables: ['Broccoli', 'Carrots'], calories: 520 },
      { name: 'Rice paper dumplings', protein: 'Shrimp', vegetables: ['Cabbage', 'Carrots'], calories: 400 },
      { name: 'Glass noodle stir fry', protein: 'Chicken', vegetables: ['Bell peppers', 'Mushrooms'], calories: 450 },
      { name: 'Protein bagel', protein: 'Eggs', vegetables: ['Spinach'], calories: 380 }
    ],
    snacks: [
      { name: 'Hard boiled eggs', protein: 'Eggs', vegetables: [], calories: 140 },
      { name: 'Cucumber salad', protein: '', vegetables: ['Cucumber'], calories: 80 },
      { name: 'Granola', protein: '', vegetables: [], calories: 200 },
      { name: 'Healthy snacks', protein: '', vegetables: ['Carrots'], calories: 120 }
    ],
    desserts: [
      { name: 'Protein marshmallow', protein: '', vegetables: [], calories: 150 },
      { name: 'Single serve chocolate chip cookie', protein: '', vegetables: [], calories: 180 },
      { name: 'Chickpea blondies', protein: '', vegetables: [], calories: 200 },
      { name: 'Ninja creami', protein: '', vegetables: [], calories: 220 }
    ]
  };

  const handleProteinChange = (protein) => {
    setFormData(prev => ({
      ...prev,
      preferredProtein: prev.preferredProtein.includes(protein)
        ? prev.preferredProtein.filter(p => p !== protein)
        : [...prev.preferredProtein, protein]
    }));
  };

  const handleVegetableChange = (vegetable) => {
    setFormData(prev => ({
      ...prev,
      preferredVegetables: prev.preferredVegetables.includes(vegetable)
        ? prev.preferredVegetables.filter(v => v !== vegetable)
        : [...prev.preferredVegetables, vegetable]
    }));
  };

  const generateMealPlan = () => {
    if (!formData.tdee || formData.preferredProtein.length === 0) {
      alert('Please fill in TDEE and select at least one preferred protein');
      return;
    }

    const tdee = parseFloat(formData.tdee);
    const sweetTreatsCount = parseInt(formData.sweetTreatsPerWeek);
    const dailyCalories = tdee;

    // Filter recipes based on preferences
    const filterRecipes = (recipeList) => {
      return recipeList.filter(recipe => {
        const hasPreferredProtein = !recipe.protein || recipe.protein === '' ||
          formData.preferredProtein.some(p => {
            const recipeProtein = recipe.protein.toLowerCase();
            const preferredProtein = p.toLowerCase();
            return recipeProtein.includes(preferredProtein) || preferredProtein.includes(recipeProtein);
          });
        const hasPreferredVeggies = recipe.vegetables.length === 0 ||
          recipe.vegetables.some(v => formData.preferredVegetables.includes(v)) ||
          formData.preferredVegetables.length === 0;
        return hasPreferredProtein && hasPreferredVeggies;
      });
    };

    let breakfastOptions = filterRecipes(recipes.breakfast);
    let lunchOptions = filterRecipes(recipes.lunch);
    let dinnerOptions = filterRecipes(recipes.dinner);
    let snackOptions = filterRecipes(recipes.snacks);
    const dessertOptions = recipes.desserts;

    // Fallback to all recipes if filtering results in empty arrays
    if (breakfastOptions.length === 0) breakfastOptions = recipes.breakfast;
    if (lunchOptions.length === 0) lunchOptions = recipes.lunch;
    if (dinnerOptions.length === 0) dinnerOptions = recipes.dinner;
    if (snackOptions.length === 0) snackOptions = recipes.snacks;

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
      if (day <= sweetTreatsCount && remainingCalories >= 150) {
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

  return (
    <div className="meal-plan-generator">
      <h3>Create Your Custom Meal Plan</h3>
      <p className="generator-description">First, calculate your TDEE, then fill out your preferences to generate a personalized meal plan.</p>

      <div className="tdee-section">
        <h4>Step 1: Calculate Your TDEE</h4>
        <TDEECalculator onCalculate={handleTdeeCalculated} />
        {tdeeResults && (
          <div className="tdee-success">
            <p>✓ TDEE calculated! Your value has been automatically filled in below.</p>
          </div>
        )}
      </div>

      <div className="generator-form">
        <div className="form-group">
          <label htmlFor="tdee">Your TDEE (Total Daily Energy Expenditure)</label>
          <input
            type="number"
            id="tdee"
            value={formData.tdee}
            onChange={(e) => setFormData({ ...formData, tdee: e.target.value })}
            placeholder="1885"
          />
          <p className="form-hint">Use the calculator above or enter manually</p>
        </div>

        <div className="form-group checkbox-group">
          <label>Preferred Proteins (select all that apply)</label>
          <div className="checkbox-grid">
            {proteins.map(protein => (
              <label key={protein} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.preferredProtein.includes(protein)}
                  onChange={() => handleProteinChange(protein)}
                />
                <span>{protein}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>Preferred Vegetables (select all that apply)</label>
          <div className="checkbox-grid">
            {vegetables.map(vegetable => (
              <label key={vegetable} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.preferredVegetables.includes(vegetable)}
                  onChange={() => handleVegetableChange(vegetable)}
                />
                <span>{vegetable}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="sweetTreats">Sweet Treats Per Week</label>
          <select
            id="sweetTreats"
            value={formData.sweetTreatsPerWeek}
            onChange={(e) => setFormData({ ...formData, sweetTreatsPerWeek: e.target.value })}
          >
            <option value="0">None</option>
            <option value="1">1 per week</option>
            <option value="2">2 per week</option>
            <option value="3">3 per week</option>
            <option value="4">4 per week</option>
            <option value="5">5 per week</option>
            <option value="6">6 per week</option>
            <option value="7">Daily</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mealPrepDays">Meal Prep Days Per Week</label>
          <select
            id="mealPrepDays"
            value={formData.mealPrepDays}
            onChange={(e) => setFormData({ ...formData, mealPrepDays: e.target.value })}
          >
            <option value="1">1 day</option>
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5 days</option>
            <option value="6">6 days</option>
            <option value="7">Daily</option>
          </select>
        </div>

        <button className="generate-btn" onClick={generateMealPlan}>
          Generate Meal Plan
        </button>
      </div>

      {mealPlan && (
        <div className="meal-plan-results">
          <h4>Your 7-Day Meal Plan</h4>
          <div className="meal-plan-grid">
            {mealPlan.map((day, index) => (
              <div key={index} className="day-card">
                <h5>Day {day.day}</h5>
                <div className="meal-item">
                  <span className="meal-type">Breakfast:</span>
                  <span className="meal-name">{day.breakfast.name}</span>
                  <span className="meal-calories">{day.breakfast.calories} cal</span>
                </div>
                <div className="meal-item">
                  <span className="meal-type">Lunch:</span>
                  <span className="meal-name">{day.lunch.name}</span>
                  <span className="meal-calories">{day.lunch.calories} cal</span>
                </div>
                <div className="meal-item">
                  <span className="meal-type">Dinner:</span>
                  <span className="meal-name">{day.dinner.name}</span>
                  <span className="meal-calories">{day.dinner.calories} cal</span>
                </div>
                <div className="meal-item">
                  <span className="meal-type">Snack:</span>
                  <span className="meal-name">{day.snack.name}</span>
                  <span className="meal-calories">{day.snack.calories} cal</span>
                </div>
                {day.dessert && (
                  <div className="meal-item dessert">
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
    </div>
  );
}

export default MealPlanGenerator;

