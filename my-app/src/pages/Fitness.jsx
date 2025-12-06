import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectDetail.css';
import '../pages/Health.css';

function Fitness() {
  return (
    <div className="project-detail-bg health-bg">
      <div className="project-detail-container">
        <Link to="/services" className="back-link">Back to Services</Link>
        
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Fitness</h1>
            <p className="project-detail-subtitle">Training, exercises, and health practices</p>
            <div className="project-detail-meta">
              <span className="project-year-badge">2025</span>
            </div>
          </div>
        </header>

        <section className="main-section project-detail-section">
          <h2>Fitness</h2>
          <p className="section-intro">Little tidbits about the health practices I like most. For more detailed information, stay tuned for my dedicated health coaching website.</p>
          
          <div className="fitness-grid">
            <div className="fitness-card">
              <h3>Non-Negotiables</h3>
              <ul className="fitness-list">
                <li>Consistency is key</li>
                <li>10k steps per day</li>
                <li>1 hour of movement per day</li>
                <li>2 weight training sessions per week</li>
                <li>Mix it up: Combine strength, cardio, and flexibility</li>
                <li>Track your progress: Keep a workout journal or download my app (Coming Soon)</li>
                <li>Rest and recovery: Allow time for your body to heal</li>
                <li>Listen to your body: Adjust intensity as needed</li>
              </ul>
            </div>

            <div className="fitness-card">
              <h3>Lifting Exercises</h3>
              <div className="exercise-group">
                <div className="exercise-category">
                  <h4>Legs</h4>
                  <p>Squats, Lunges, Romanian Deadlifts, Leg Press, Calf Raises</p>
                </div>
                <div className="exercise-category">
                  <h4>Arms</h4>
                  <p>Bicep Curls, Tricep Dips, Hammer Curls, Tricep Pushdowns</p>
                </div>
                <div className="exercise-category">
                  <h4>Back</h4>
                  <p>Pull-Ups, Bent Over Rows, Lat Pulldowns, Deadlifts</p>
                </div>
                <div className="exercise-category">
                  <h4>Chest</h4>
                  <p>Bench Press, Push-Ups, Chest Flyes, Incline Dumbbell Press</p>
                </div>
              </div>
            </div>

            <div className="fitness-card">
              <h3>Cardio Options</h3>
              <ul className="fitness-list">
                <li>Stair Master</li>
                <li>Elliptical</li>
                <li>Treadmill</li>
                <li>Jump Rope</li>
                <li>Swimming</li>
                <li>Running (intervals or steady-state)</li>
                <li>Cycling</li>
                <li>Rowing</li>
                <li>HIIT Circuits</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Fitness;

