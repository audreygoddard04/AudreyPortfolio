import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectDetail.css';
import './Articles.css';

function About() {
  return (
    <div className="articles-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>About Me</h1>
            <p className="project-detail-subtitle">A bit more about who I am.</p>
          </div>
        </header>

        <section className="main-section project-detail-section articles-about-section">
          <p>
            I have just completed my undergraduate degree pursuing an Honors Specialization in Genetics at Western University (2022-2026), where I was a varsity track & field athlete. My passions involve health, science, longevity, and helping others grow through curiosity and wellness.
          </p>
          <p>
            This is where I write about the things I'm learning and thinking about, from genetics and longevity to business and books. Reach out through my socials with any questions, comments, and feedback.
          </p>

          <h3 className="pillars-heading">My Pillars</h3>
          <div className="pillars-grid">
            <div className="pillar-card">
              <h4>Research & Curiosity</h4>
              <div className="pillar-links">
                <Link to="/articles">Articles →</Link>
              </div>
            </div>
            <div className="pillar-card">
              <h4>Building & Creating</h4>
              <div className="pillar-links">
                <Link to="/projects">Projects →</Link>
              </div>
            </div>
            <div className="pillar-card">
              <h4>Health & Fitness</h4>
              <div className="pillar-links">
                <Link to="/fitness">Fitness →</Link>
                <Link to="/nutrition">Nutrition →</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
