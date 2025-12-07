import React, { useState } from 'react';
import './TDEECalculator.css';

function TDEECalculator({ onCalculate }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activityFactor, setActivityFactor] = useState('1.725');
  const [deficitLevel, setDeficitLevel] = useState('13');
  const [results, setResults] = useState(null);

  const activityFactors = {
    '1.2': 'Sedentary (little to no exercise)',
    '1.375': 'Lightly active (light exercise 1-3 days/week)',
    '1.55': 'Moderately active (moderate exercise 3-5 days/week)',
    '1.725': 'Very active (hard exercise 6-7 days/week)',
    '1.9': 'Extra active (very hard exercise, physical job)'
  };

  const deficitLevels = {
    '12': 'Aggressive deficit',
    '13': 'Gentle deficit',
    '14': 'Maintenance'
  };

  const calculateTDEE = () => {
    if (!weight || !height || !age) {
      alert('Please fill in all fields');
      return;
    }

    const weightKg = parseFloat(weight) * 0.453592; // Convert lbs to kg
    const heightCm = parseFloat(height) * 2.54; // Convert inches to cm
    const ageNum = parseFloat(age);
    const activity = parseFloat(activityFactor);

    // BMR calculation (Mifflin-St Jeor Equation for women)
    const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) - 161;
    const tdee = bmr * activity;

    // Calorie target based on deficit level
    const calorieTarget = parseFloat(weight) * parseFloat(deficitLevel);

    // Macro calculations
    const proteinCalories = calorieTarget * 0.40;
    const carbCalories = calorieTarget * 0.40;
    const fatCalories = calorieTarget * 0.20;

    const proteinGrams = proteinCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;

    const calculatedResults = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calorieTarget: Math.round(calorieTarget),
      protein: Math.round(proteinGrams * 10) / 10,
      carbs: Math.round(carbGrams * 10) / 10,
      fat: Math.round(fatGrams * 10) / 10
    };
    
    setResults(calculatedResults);
    
    // Pass TDEE to parent component if callback provided
    if (onCalculate) {
      onCalculate(calculatedResults.calorieTarget);
    }
  };

  return (
    <div className="tdee-calculator">
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="weight">Weight (lbs)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="145"
          />
        </div>

        <div className="form-group">
          <label htmlFor="height">Height (inches)</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="65"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="25"
          />
        </div>

        <div className="form-group">
          <label htmlFor="activity">Activity Level</label>
          <select
            id="activity"
            value={activityFactor}
            onChange={(e) => setActivityFactor(e.target.value)}
          >
            {Object.entries(activityFactors).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deficit">Calorie Goal</label>
          <select
            id="deficit"
            value={deficitLevel}
            onChange={(e) => setDeficitLevel(e.target.value)}
          >
            {Object.entries(deficitLevels).map(([value, label]) => (
              <option key={value} value={value}>{label} ({value} x weight)</option>
            ))}
          </select>
        </div>

        <button className="calculate-btn" onClick={calculateTDEE}>
          Calculate
        </button>
      </div>

      {results && (
        <div className="calculator-results">
          <div className="result-card">
            <h4>BMR (Basal Metabolic Rate)</h4>
            <p className="result-value">{results.bmr} Calories</p>
          </div>
          <div className="result-card">
            <h4>TDEE (Total Daily Energy Expenditure)</h4>
            <p className="result-value">{results.tdee} Calories</p>
          </div>
          <div className="result-card highlight">
            <h4>Daily Calorie Target</h4>
            <p className="result-value">{results.calorieTarget} Calories</p>
            <p className="result-note">({deficitLevels[deficitLevel]})</p>
          </div>
          <div className="macro-breakdown">
            <h4>Macro Breakdown</h4>
            <div className="macro-grid">
              <div className="macro-item">
                <span className="macro-label">Protein</span>
                <span className="macro-value">{results.protein}g</span>
                <span className="macro-percent">40%</span>
              </div>
              <div className="macro-item">
                <span className="macro-label">Carbs</span>
                <span className="macro-value">{results.carbs}g</span>
                <span className="macro-percent">40%</span>
              </div>
              <div className="macro-item">
                <span className="macro-label">Fat</span>
                <span className="macro-value">{results.fat}g</span>
                <span className="macro-percent">20%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TDEECalculator;

