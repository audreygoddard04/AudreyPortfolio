import React from 'react';
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

  return (
    <div className="project-detail-bg health-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Athletics</h1>
            <p className="project-detail-subtitle">Track & Field & Volleyball</p>
            <div className="project-detail-meta">
              <span className="project-year-badge">2025</span>
            </div>
          </div>
        </header>

        {/* Athletics Section */}
        <section className="main-section project-detail-section">
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
            <div className="athletics-images-container" style={{ marginTop: '24px' }}>
              <img src={trackImg2} alt="Track & Field" style={{ objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
              <img src={trackImg3} alt="Track & Field" style={{ objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
              <img src={trackImg4} alt="Track & Field" style={{ objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
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
            <div className="athletics-images-container" style={{ marginTop: '24px' }}>
              <img src={volleyballImg1} alt="Volleyball" style={{ objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
              <img src={volleyballImg2} alt="Volleyball" style={{ objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
              <img src={volleyballImg3} alt="Volleyball" style={{ objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Athletics;
