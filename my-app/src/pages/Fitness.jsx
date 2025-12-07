import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './ProjectDetail.css';
import '../pages/Health.css';

function Fitness() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="project-detail-bg health-bg">
      <div className="project-detail-container">
        <Link to="/services" className="back-link">Back to Services</Link>
        
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Fitness</h1>
            <p className="project-detail-subtitle">Strength and conditioning plans that fit your week. Build muscle, improve conditioning, and see visible changes without living in the gym.</p>
            <div className="project-detail-meta">
              <span className="project-year-badge">2025</span>
            </div>
          </div>
        </header>

        <section className="main-section project-detail-section">
          <div className={`cta-section ${expandedSections.nonNegotiables ? 'has-expanded' : ''}`}>
            <button className={`cta-card ${expandedSections.nonNegotiables ? 'expanded' : ''}`} onClick={() => toggleSection('nonNegotiables')}>
              <div className="cta-content">
                <h2>My Non-Negotiables</h2>
                <p>Essential daily habits and principles for consistent progress</p>
              </div>
              {expandedSections.nonNegotiables ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedSections.nonNegotiables && (
              <div className="cta-expanded-content">
                <div className="info-subsection">
                  <h3>Daily Non-Negotiables</h3>
                  <ul className="info-list">
                    <li><strong>10,000 steps a day</strong> - Minimum daily movement goal for overall health and activity</li>
                    <li><strong>7-9 hours of sleep</strong> - Essential for recovery, muscle growth, and performance</li>
                    <li><strong>Protein with every meal</strong> - Aim for 30g+ of protein per meal for optimal muscle protein synthesis</li>
                    <li><strong>Daily mobility work</strong> - 10-15 minutes of stretching, foam rolling, or mobility exercises</li>
                    <li><strong>Stay hydrated</strong> - Drink at least half your body weight (lbs) in ounces of water daily</li>
                  </ul>
                </div>

                <div className="info-subsection">
                  <h3>Weekly Non-Negotiables</h3>
                  <ul className="info-list">
                    <li><strong>Progressive overload</strong> - Increase weight, reps, or sets each week when possible</li>
                    <li><strong>Track your workouts</strong> - Log exercises, sets, reps, and weights to monitor progress</li>
                    <li><strong>Active recovery day</strong> - Light activity like walking, yoga, or stretching on rest days</li>
                    <li><strong>Form over ego</strong> - Prioritize proper technique and form over lifting heavier weights</li>
                  </ul>
                </div>

                <div className="info-subsection">
                  <h3>Training Principles</h3>
                  <ul className="info-list">
                    <li><strong>Consistency beats intensity</strong> - Showing up consistently is more important than occasional intense sessions</li>
                    <li><strong>Recovery is part of training</strong> - Rest days and sleep are when your body actually gets stronger</li>
                    <li><strong>Compound movements first</strong> - Prioritize multi-joint exercises (squats, deadlifts, presses) over isolation work</li>
                    <li><strong>Listen to your body</strong> - Adjust intensity based on how you feel, but don't skip workouts entirely</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Fitness;
