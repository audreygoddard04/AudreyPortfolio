import React, { useState } from 'react';
import './TDEECalculator.css';

function TDEECalculator({ onCalculate }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('Female');
  const [activityFactor, setActivityFactor] = useState('1.375');
  const [deficitLevel, setDeficitLevel] = useState('standard');
  const [results, setResults] = useState(null);

  const activityFactors = {
    '1.2': 'Sedentary (little to no exercise)',
    '1.375': 'Light Activity (1-3 workouts/week)',
    '1.55': 'Moderate Activity (3-5 workouts/week)',
    '1.725': 'Very Active (6-7 workouts/week)',
    '1.9': 'Extra Active (very hard exercise, physical job)'
  };

  const deficitLevels = {
    'aggressive': 'Aggressive cut (-20% deficit)',
    'standard': 'Standard cut (-15% deficit)',
    'gentle': 'Gentle cut (-10% deficit)',
    'maintenance': 'Maintenance (0% deficit)',
    'bulk': 'Bulk (+10% surplus)'
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

    // BMR calculation (Mifflin-St Jeor Equation)
    // For men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // For women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    const bmrBase = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum);
    const bmr = sex === 'Male' ? bmrBase + 5 : bmrBase - 161;
    const tdee = bmr * activity;

    // Calorie target based on deficit level
    let deficitMultiplier = 1;
    if (deficitLevel === 'aggressive') deficitMultiplier = 0.80;
    else if (deficitLevel === 'standard') deficitMultiplier = 0.85;
    else if (deficitLevel === 'gentle') deficitMultiplier = 0.90;
    else if (deficitLevel === 'bulk') deficitMultiplier = 1.10;

    const calorieTarget = Math.round(tdee * deficitMultiplier);

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
      calorieTarget: calorieTarget,
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

  const allFieldsFilled = weight && height && age;

  return (
    <div className="tdee-calculator">
      <div className="calculator-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <div className="input-with-unit">
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder=""
              />
              <span className="input-unit">lbs</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="height">Height</label>
            <div className="input-with-unit">
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder=""
              />
              <span className="input-unit">inches</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="sex">Sex</label>
            <select
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
        </div>

        <div className="form-row">
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
            <label htmlFor="deficit">Calorie Deficit</label>
            <select
              id="deficit"
              value={deficitLevel}
              onChange={(e) => setDeficitLevel(e.target.value)}
            >
              {Object.entries(deficitLevels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          className={`calculate-btn ${!allFieldsFilled ? 'disabled' : ''}`} 
          onClick={calculateTDEE}
          disabled={!allFieldsFilled}
        >
          Fill in all fields to see results
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

