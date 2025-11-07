import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectDetail.css';
import '../pages/Health.css';
// Track & Field images
import trackImg2 from '../images/IMG_3562.jpg';
import trackImg3 from '../images/IMG_9299.JPG';
import trackImg4 from '../images/Screenshot-2025-11-06-at-4.42.19-PM.png';

// Volleyball images
import volleyballImg1 from '../images/081522_AshleyBustonWhite034.JPG';
import volleyballImg2 from '../images/081822_BradDemers031.JPG';
import volleyballImg3 from '../images/081522_AshleyBustonWhite020.JPG';


function Athletics() {
  const [searchTerm, setSearchTerm] = useState('');

  // Helper function to check if content matches search term
  const matchesSearch = (text) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return text.toLowerCase().includes(searchLower);
  };

  return (
    <div className="project-detail-bg health-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Athletics, Fitness, & Nutrition</h1>
            <p className="project-detail-subtitle">Track & Field, Volleyball, Training, and Wellness</p>
            <div className="project-detail-meta">
              <span className="project-year-badge">2025</span>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for sections, vitamins, fasting types, FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Athletics Section */}
        <section className={`main-section project-detail-section ${!matchesSearch('Athletics Track Field Volleyball Varsity Team Ontario') ? 'search-hidden' : ''}`}>
          <h2>Athletics</h2>
          
          <div className="project-detail-section" style={{ marginBottom: '24px', padding: '24px' }}>
            <h3>Varsity Track & Field Athlete – Western University</h3>
            <p style={{ color: '#2e5d34', fontSize: '1rem', marginBottom: '20px', fontStyle: 'italic' }}>2022–Present</p>
            <ul className="research-areas-list">
              <li>Compete in pentathlon; top OUA results</li>
              <li>20+ hrs/week of training and competition</li>
              <li>Mentor for younger athletes; organize off-season training</li>
            </ul>
            
            {/* Track & Field Images */}
            <div className="athletics-images-container" style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <img src={trackImg2} alt="Track & Field" style={{ height: '300px', width: 'auto', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
              <img src={trackImg3} alt="Track & Field" style={{ height: '300px', width: 'auto', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
              <img src={trackImg4} alt="Track & Field" style={{ height: '300px', width: 'auto', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
            </div>
          </div>

          <div className="project-detail-section" style={{ marginBottom: '0', padding: '24px' }}>
            <h3>Team Ontario Volleyball – Canada Summer Games</h3>
            <p style={{ color: '#2e5d34', fontSize: '1rem', marginBottom: '20px', fontStyle: 'italic' }}>2022</p>
            <ul className="research-areas-list">
              <li>Represented Ontario at national multi-sport games</li>
              <li>Developed high-level teamwork and resilience under pressure</li>
            </ul>
            
            {/* Volleyball Images */}
            <div className="athletics-images-container" style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <img src={volleyballImg1} alt="Volleyball" style={{ height: '220px', width: 'auto', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
              <img src={volleyballImg2} alt="Volleyball" style={{ height: '220px', width: 'auto', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
              <img src={volleyballImg3} alt="Volleyball" style={{ height: '220px', width: 'auto', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* Nutrition Link Box */}
        <Link to="/athletics/nutrition" className="athletics-featured-box" style={{ textDecoration: 'none', color: 'inherit', marginTop: '48px', marginBottom: '48px' }}>
          <div className="athletics-featured-content">
            <div className="athletics-featured-left">
              <h3 className="athletics-featured-title">Nutrition</h3>
              <p className="athletics-featured-subtitle">Evidence-based nutrition, vitamins, and wellness</p>
            </div>
            <div className="athletics-featured-right">
              <ul className="athletics-featured-list">
                <li>Nutrition hacks and smart eating habits</li>
                <li>Fasting protocols and dietary guidelines</li>
                <li>Vitamins, supplements, and FAQs</li>
              </ul>
              <div className="athletics-featured-link">Read more →</div>
            </div>
          </div>
        </Link>

        {/* Fitness Section */}
        <section id="fitness" className={`main-section project-detail-section ${!matchesSearch('Fitness Non-Negotiables Lifting Exercises Cardio') ? 'search-hidden' : ''}`}>
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

export default Athletics;
