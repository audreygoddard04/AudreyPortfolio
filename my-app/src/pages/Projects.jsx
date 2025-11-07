import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

function Projects() {
  const projects = [
    {
      id: 'rhamm-breast-cancer',
      title: 'RHAMM-deficient Breast Cancer & Tumor Heterogeneity Thesis Proposal',
      subtitle: 'PacBio HIFI Long-read sequencing | Genomic, Epigenetic, & Mitochondrial Diversity',
      description: `Characterizing nuclear, epigenetic, and mitochondrial heterogeneity in RHAMM-deficient breast cancer lung metastases using PacBio HiFi sequencing. A multi-omic project bridging cancer genetics, long-read analysis, and therapeutic insight.`,
      year: '2025',
      comingSoon: true
    },
    {
      id: 'pathology-website',
      title: 'Pathology Website',
      subtitle: 'Interactive Pathology Learning Platform',
      description: 'An educational website for pathology learning, featuring interactive content and comprehensive pathology resources.',
      year: '2025',
      externalLink: 'https://symphonious-tanuki-1fe5d1.netlify.app/'
    }
  ];

  return (
    <div className="projects-bg">
      <header className="projects-header">
        <h1>Projects</h1>
        <p className="projects-subtitle">The things that occupy my time :D</p>
      </header>

      {/* Projects List */}
      <section className="main-section">
        <div className="projects-grid">
          {projects.map((project) => {
            if (project.externalLink) {
              return (
                <a
                  key={project.id}
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                >
                  <div className="project-card-header">
                    <h3>{project.title}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-card-footer">
                    <span className="project-link">Visit site →</span>
                  </div>
                </a>
              );
            }
            return (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`} 
                className="project-card"
              >
                <div className="project-card-header">
                  <h3>{project.title}</h3>
                  <span className="project-year">{project.year}</span>
                </div>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-card-footer">
                  <span className="project-link">Read more →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="main-section coming-soon-section">
        <h2>Coming Soon...</h2>
        <div className="coming-soon-grid">
          <div className="coming-soon-card">
            <h3>ROSY</h3>
            <p className="coming-soon-subtitle">The genetics creative supertool</p>
          </div>
          <div className="coming-soon-card">
            <h3>TLC</h3>
            <p className="coming-soon-subtitle">Your accountability on having hobbies</p>
          </div>
          <div className="coming-soon-card">
            <h3>NutraNova</h3>
            <p className="coming-soon-subtitle">Nutrition & Genetics and all the health benefits imaginable</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
