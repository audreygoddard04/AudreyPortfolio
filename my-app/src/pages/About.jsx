import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './ProjectDetail.css';
import './Articles.css';

function About() {
  return (
    <div className="articles-bg">
      <SEO
        title="About Me"
        description="Audrey Goddard is a Genetics graduate from Western University and varsity track & field athlete, writing on research, business, and the built world."
        path="/about"
      />
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>About Me</h1>
          </div>
        </header>

        <section className="main-section project-detail-section life-stages-section">
          <h3 className="pillars-heading">Who am I?</h3>
          <div className="life-stages-grid">
            <div className="life-stage-card">
              <span className="life-stage-label">Past</span>
              <p>Growing up in competitive sports taught me discipline and grit. Alongside that was a pull toward problem-solving that led me to genetics.</p>
            </div>
            <div className="life-stage-card">
              <span className="life-stage-label">Present / Recent</span>
              <p>Completed my undergraduate BSc degree pursuing an Honors Specialization in Genetics at Western University (2022-2026), where I was a varsity track & field athlete.</p>
            </div>
            <div className="life-stage-card">
              <span className="life-stage-label">Future</span>
              <p>I want to build something that outlasts me (and would make my dad and the people I look up to proud). I aim to keep accumulating knowledge and stand on the shoulders of the giants to advance civilization.</p>
            </div>
          </div>
        </section>

        <section className="main-section project-detail-section articles-about-section">
          <h3 className="pillars-heading">My Pillars</h3>
          <p className="pillars-intro">
            Here I write about the things I'm learning and thinking about, from science to business to biographies.
          </p>

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
