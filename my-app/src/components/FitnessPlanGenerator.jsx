import React, { useState } from 'react';
import './FitnessPlanGenerator.css';

function FitnessPlanGenerator() {
  const [formData, setFormData] = useState({
    fitnessLevel: '',
    goals: [],
    daysPerWeek: '3',
    equipment: [],
    currentRoutine: '',
    injuries: ''
  });
  const [fitnessPlan, setFitnessPlan] = useState(null);

  const fitnessLevels = [
    'Beginner (new to structured training)',
    'Intermediate (6+ months of consistent training)',
    'Advanced (2+ years of structured training)'
  ];

  const goalOptions = [
    'Build muscle / Strength',
    'Lose fat / Body recomposition',
    'Improve conditioning / Cardio',
    'General fitness / Health',
    'Sport-specific performance',
    'Mobility / Flexibility'
  ];

  const equipmentOptions = [
    'Full gym access',
    'Home gym (barbells, dumbbells)',
    'Limited equipment (resistance bands, bodyweight)',
    'No equipment (bodyweight only)'
  ];

  const generateFitnessPlan = () => {
    if (!formData.fitnessLevel || formData.goals.length === 0) {
      alert('Please fill in your fitness level and select at least one goal');
      return;
    }

    // Generate a sample weekly plan based on inputs
    const daysPerWeek = parseInt(formData.daysPerWeek);

    const workoutTemplates = {
      beginner: {
        fullGym: [
          { day: 'Day 1', focus: 'Upper Body', exercises: ['Bench Press', 'Rows', 'Shoulder Press', 'Bicep Curls', 'Tricep Extensions'] },
          { day: 'Day 2', focus: 'Lower Body', exercises: ['Squats', 'Romanian Deadlifts', 'Leg Press', 'Leg Curls', 'Calf Raises'] },
          { day: 'Day 3', focus: 'Full Body', exercises: ['Deadlifts', 'Pull-ups', 'Overhead Press', 'Lunges', 'Planks'] }
        ],
        homeGym: [
          { day: 'Day 1', focus: 'Upper Body', exercises: ['Dumbbell Press', 'Dumbbell Rows', 'Shoulder Press', 'Bicep Curls', 'Tricep Dips'] },
          { day: 'Day 2', focus: 'Lower Body', exercises: ['Goblet Squats', 'Romanian Deadlifts', 'Bulgarian Split Squats', 'Lunges', 'Calf Raises'] },
          { day: 'Day 3', focus: 'Full Body', exercises: ['Deadlifts', 'Pull-ups', 'Overhead Press', 'Lunges', 'Planks'] }
        ],
        limited: [
          { day: 'Day 1', focus: 'Upper Body', exercises: ['Push-ups', 'Resistance Band Rows', 'Pike Push-ups', 'Band Bicep Curls', 'Tricep Dips'] },
          { day: 'Day 2', focus: 'Lower Body', exercises: ['Squats', 'Lunges', 'Bulgarian Split Squats', 'Glute Bridges', 'Calf Raises'] },
          { day: 'Day 3', focus: 'Full Body', exercises: ['Burpees', 'Mountain Climbers', 'Planks', 'Jump Squats', 'Bear Crawls'] }
        ],
        bodyweight: [
          { day: 'Day 1', focus: 'Upper Body', exercises: ['Push-ups', 'Inverted Rows', 'Pike Push-ups', 'Diamond Push-ups', 'Plank Hold'] },
          { day: 'Day 2', focus: 'Lower Body', exercises: ['Squats', 'Lunges', 'Bulgarian Split Squats', 'Glute Bridges', 'Single-leg Deadlifts'] },
          { day: 'Day 3', focus: 'Full Body', exercises: ['Burpees', 'Mountain Climbers', 'Planks', 'Jump Squats', 'Bear Crawls'] }
        ]
      },
      intermediate: {
        fullGym: [
          { day: 'Day 1', focus: 'Push', exercises: ['Bench Press', 'Incline Press', 'Overhead Press', 'Lateral Raises', 'Tricep Extensions'] },
          { day: 'Day 2', focus: 'Pull', exercises: ['Deadlifts', 'Pull-ups', 'Barbell Rows', 'Cable Rows', 'Face Pulls'] },
          { day: 'Day 3', focus: 'Legs', exercises: ['Squats', 'Romanian Deadlifts', 'Leg Press', 'Leg Curls', 'Calf Raises'] },
          { day: 'Day 4', focus: 'Upper', exercises: ['Incline Bench', 'Cable Flies', 'Lat Pulldowns', 'Cable Curls', 'Overhead Tricep'] }
        ],
        homeGym: [
          { day: 'Day 1', focus: 'Push', exercises: ['Dumbbell Press', 'Incline Press', 'Overhead Press', 'Lateral Raises', 'Tricep Dips'] },
          { day: 'Day 2', focus: 'Pull', exercises: ['Deadlifts', 'Pull-ups', 'Dumbbell Rows', 'Cable Rows', 'Face Pulls'] },
          { day: 'Day 3', focus: 'Legs', exercises: ['Squats', 'Romanian Deadlifts', 'Bulgarian Split Squats', 'Leg Curls', 'Calf Raises'] },
          { day: 'Day 4', focus: 'Upper', exercises: ['Incline Dumbbell', 'Cable Flies', 'Pull-ups', 'Cable Curls', 'Overhead Tricep'] }
        ],
        limited: [
          { day: 'Day 1', focus: 'Push', exercises: ['Push-ups', 'Pike Push-ups', 'Diamond Push-ups', 'Band Lateral Raises', 'Tricep Dips'] },
          { day: 'Day 2', focus: 'Pull', exercises: ['Pull-ups', 'Resistance Band Rows', 'Band Pull-aparts', 'Inverted Rows', 'Band Curls'] },
          { day: 'Day 3', focus: 'Legs', exercises: ['Squats', 'Lunges', 'Bulgarian Split Squats', 'Glute Bridges', 'Calf Raises'] },
          { day: 'Day 4', focus: 'Full Body', exercises: ['Burpees', 'Mountain Climbers', 'Planks', 'Jump Squats', 'Bear Crawls'] }
        ],
        bodyweight: [
          { day: 'Day 1', focus: 'Push', exercises: ['Push-ups', 'Pike Push-ups', 'Diamond Push-ups', 'Archer Push-ups', 'Plank Hold'] },
          { day: 'Day 2', focus: 'Pull', exercises: ['Pull-ups', 'Inverted Rows', 'Bodyweight Rows', 'Chin-ups', 'Hanging Leg Raises'] },
          { day: 'Day 3', focus: 'Legs', exercises: ['Squats', 'Lunges', 'Bulgarian Split Squats', 'Glute Bridges', 'Single-leg Deadlifts'] },
          { day: 'Day 4', focus: 'Full Body', exercises: ['Burpees', 'Mountain Climbers', 'Planks', 'Jump Squats', 'Bear Crawls'] }
        ]
      },
      advanced: {
        fullGym: [
          { day: 'Day 1', focus: 'Chest & Triceps', exercises: ['Bench Press', 'Incline Press', 'Cable Flies', 'Close-grip Bench', 'Tricep Extensions'] },
          { day: 'Day 2', focus: 'Back & Biceps', exercises: ['Deadlifts', 'Pull-ups', 'Barbell Rows', 'Cable Rows', 'Cable Curls'] },
          { day: 'Day 3', focus: 'Legs', exercises: ['Squats', 'Romanian Deadlifts', 'Leg Press', 'Leg Curls', 'Calf Raises'] },
          { day: 'Day 4', focus: 'Shoulders & Arms', exercises: ['Overhead Press', 'Lateral Raises', 'Rear Delt Flies', 'Cable Curls', 'Overhead Tricep'] },
          { day: 'Day 5', focus: 'Full Body', exercises: ['Squats', 'Bench Press', 'Rows', 'Deadlifts', 'Overhead Press'] }
        ],
        homeGym: [
          { day: 'Day 1', focus: 'Chest & Triceps', exercises: ['Dumbbell Press', 'Incline Press', 'Dumbbell Flies', 'Close-grip Press', 'Tricep Dips'] },
          { day: 'Day 2', focus: 'Back & Biceps', exercises: ['Deadlifts', 'Pull-ups', 'Dumbbell Rows', 'Cable Rows', 'Cable Curls'] },
          { day: 'Day 3', focus: 'Legs', exercises: ['Squats', 'Romanian Deadlifts', 'Bulgarian Split Squats', 'Leg Curls', 'Calf Raises'] },
          { day: 'Day 4', focus: 'Shoulders & Arms', exercises: ['Overhead Press', 'Lateral Raises', 'Rear Delt Flies', 'Cable Curls', 'Overhead Tricep'] },
          { day: 'Day 5', focus: 'Full Body', exercises: ['Squats', 'Dumbbell Press', 'Rows', 'Deadlifts', 'Overhead Press'] }
        ],
        limited: [
          { day: 'Day 1', focus: 'Chest & Triceps', exercises: ['Push-ups', 'Pike Push-ups', 'Diamond Push-ups', 'Archer Push-ups', 'Tricep Dips'] },
          { day: 'Day 2', focus: 'Back & Biceps', exercises: ['Pull-ups', 'Resistance Band Rows', 'Band Pull-aparts', 'Inverted Rows', 'Band Curls'] },
          { day: 'Day 3', focus: 'Legs', exercises: ['Squats', 'Lunges', 'Bulgarian Split Squats', 'Glute Bridges', 'Calf Raises'] },
          { day: 'Day 4', focus: 'Shoulders & Arms', exercises: ['Pike Push-ups', 'Band Lateral Raises', 'Band Rear Delt', 'Band Curls', 'Tricep Dips'] },
          { day: 'Day 5', focus: 'Full Body', exercises: ['Burpees', 'Mountain Climbers', 'Planks', 'Jump Squats', 'Bear Crawls'] }
        ],
        bodyweight: [
          { day: 'Day 1', focus: 'Chest & Triceps', exercises: ['Push-ups', 'Pike Push-ups', 'Diamond Push-ups', 'Archer Push-ups', 'Tricep Dips'] },
          { day: 'Day 2', focus: 'Back & Biceps', exercises: ['Pull-ups', 'Inverted Rows', 'Bodyweight Rows', 'Chin-ups', 'Hanging Leg Raises'] },
          { day: 'Day 3', focus: 'Legs', exercises: ['Squats', 'Lunges', 'Bulgarian Split Squats', 'Glute Bridges', 'Single-leg Deadlifts'] },
          { day: 'Day 4', focus: 'Shoulders & Arms', exercises: ['Pike Push-ups', 'Handstand Push-ups', 'Archer Push-ups', 'Diamond Push-ups', 'Plank Hold'] },
          { day: 'Day 5', focus: 'Full Body', exercises: ['Burpees', 'Mountain Climbers', 'Planks', 'Jump Squats', 'Bear Crawls'] }
        ]
      }
    };

    // Determine level and equipment type
    const level = formData.fitnessLevel.toLowerCase().includes('beginner') ? 'beginner' :
                  formData.fitnessLevel.toLowerCase().includes('intermediate') ? 'intermediate' : 'advanced';
    
    const equipment = formData.equipment.includes('Full gym') ? 'fullGym' :
                     formData.equipment.includes('Home gym') ? 'homeGym' :
                     formData.equipment.includes('Limited') ? 'limited' : 'bodyweight';

    const availableWorkouts = workoutTemplates[level][equipment];
    const selectedWorkouts = availableWorkouts.slice(0, daysPerWeek);

    setFitnessPlan({
      level,
      equipment,
      daysPerWeek,
      goals: formData.goals,
      weeklyPlan: selectedWorkouts,
      notes: formData.injuries ? `Note: ${formData.injuries}` : null
    });
  };

  const handleGoalChange = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleEquipmentChange = (equipment) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [equipment] // Only one equipment option at a time
    }));
  };

  return (
    <div className="fitness-plan-generator">
      <h3>Create Your Custom Fitness Plan</h3>
      <p className="generator-description">Fill out your preferences and we'll generate a personalized workout plan tailored to your needs.</p>

      <div className="generator-form">
        <div className="form-group">
          <label htmlFor="fitnessLevel">Fitness Level</label>
          <select
            id="fitnessLevel"
            value={formData.fitnessLevel}
            onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
          >
            <option value="">Select your fitness level</option>
            {fitnessLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>Goals (select all that apply)</label>
          <div className="checkbox-grid">
            {goalOptions.map(goal => (
              <label key={goal} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.goals.includes(goal)}
                  onChange={() => handleGoalChange(goal)}
                />
                <span>{goal}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="daysPerWeek">Days Per Week</label>
          <select
            id="daysPerWeek"
            value={formData.daysPerWeek}
            onChange={(e) => setFormData({ ...formData, daysPerWeek: e.target.value })}
          >
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5 days</option>
            <option value="6">6 days</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>Equipment Available</label>
          <div className="checkbox-grid">
            {equipmentOptions.map(equipment => (
              <label key={equipment} className="checkbox-label">
                <input
                  type="radio"
                  name="equipment"
                  checked={formData.equipment.includes(equipment)}
                  onChange={() => handleEquipmentChange(equipment)}
                />
                <span>{equipment}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="currentRoutine">Current Routine (optional)</label>
          <textarea
            id="currentRoutine"
            value={formData.currentRoutine}
            onChange={(e) => setFormData({ ...formData, currentRoutine: e.target.value })}
            placeholder="Describe your current workout routine, if any..."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="injuries">Injuries or Limitations (optional)</label>
          <textarea
            id="injuries"
            value={formData.injuries}
            onChange={(e) => setFormData({ ...formData, injuries: e.target.value })}
            placeholder="List any injuries, limitations, or areas to avoid..."
            rows="3"
          />
        </div>

        <button className="generate-btn" onClick={generateFitnessPlan}>
          Generate Fitness Plan
        </button>
      </div>

      {fitnessPlan && (
        <div className="fitness-plan-results">
          <h4>Your Custom {fitnessPlan.daysPerWeek}-Day Workout Plan</h4>
          <div className="plan-summary">
            <p><strong>Fitness Level:</strong> {fitnessPlan.level.charAt(0).toUpperCase() + fitnessPlan.level.slice(1)}</p>
            <p><strong>Goals:</strong> {fitnessPlan.goals.join(', ')}</p>
            <p><strong>Equipment:</strong> {formData.equipment[0]}</p>
          </div>
          <div className="workout-plan-grid">
            {fitnessPlan.weeklyPlan.map((workout, index) => (
              <div key={index} className="workout-card">
                <h5>{workout.day}</h5>
                <div className="workout-focus">
                  <span className="focus-label">Focus:</span>
                  <span className="focus-value">{workout.focus}</span>
                </div>
                <div className="exercises-list">
                  <h6>Exercises:</h6>
                  <ul>
                    {workout.exercises.map((exercise, exIndex) => (
                      <li key={exIndex}>{exercise}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {fitnessPlan.notes && (
            <div className="plan-notes">
              <p>{fitnessPlan.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FitnessPlanGenerator;

