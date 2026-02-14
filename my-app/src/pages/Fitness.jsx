import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './ProjectDetail.css';
import '../pages/Health.css';
import trackImg2 from '../images/IMG_3562.jpg';
import trackImg3 from '../images/IMG_9299.JPG';
import trackImg4 from '../images/Screenshot-2025-11-06-at-4.42.19-PM.png';
import volleyballImg1 from '../images/081522_AshleyBustonWhite034.JPG';
import volleyballImg2 from '../images/081822_BradDemers031.JPG';
import volleyballImg3 from '../images/081522_AshleyBustonWhite020.JPG';

function Fitness() {
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#athletics') {
      const el = document.getElementById('athletics');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="project-detail-bg health-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Fitness & Athletics</h1>
            <p className="project-detail-subtitle">Strength, conditioning, and competitive athletics. Build muscle, improve conditioning, and see visible changes without living in the gym.</p>
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

          <div id="athletics" className="project-detail-section" style={{ marginTop: '48px', marginBottom: '24px', padding: '24px' }}>
            <h2>Athletics</h2>
            
            <div style={{ marginBottom: '32px' }}>
              <h3>Varsity Track & Field Athlete – Western University</h3>
              <p style={{ color: '#2e5d34', fontSize: '1rem', marginBottom: '20px', fontStyle: 'italic' }}>2022–Present</p>
              <ul className="research-areas-list">
                <li>Compete in pentathlon; top OUA results</li>
                <li>20+ hrs/week of training and competition</li>
                <li>Mentor for younger athletes; organize off-season training</li>
              </ul>
              <div className="athletics-images-container" style={{ marginTop: '24px' }}>
                <img src={trackImg2} alt="Track & Field" />
                <img src={trackImg3} alt="Track & Field" />
                <img src={trackImg4} alt="Track & Field" />
              </div>
            </div>

            <div>
              <h3>Team Ontario Volleyball – Canada Summer Games</h3>
              <p style={{ color: '#2e5d34', fontSize: '1rem', marginBottom: '20px', fontStyle: 'italic' }}>2022</p>
              <ul className="research-areas-list">
                <li>Represented Ontario at national multi-sport games</li>
                <li>Developed high-level teamwork and resilience under pressure</li>
              </ul>
              <div className="athletics-images-container" style={{ marginTop: '24px' }}>
                <img src={volleyballImg1} alt="Volleyball" />
                <img src={volleyballImg2} alt="Volleyball" />
                <img src={volleyballImg3} alt="Volleyball" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Fitness;
