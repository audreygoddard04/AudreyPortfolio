import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import './ProjectDetail.css';
import notionDashboardImage from '../images/notion-dashboard.png';
import thesisThumbnail from '../images/ThesisThumbnail.png';
import keycraftLogo from '../images/keycraft-logo.png';

function Projects() {
  const projects = [
    {
      id: 'rhamm-breast-cancer',
      title: 'Honors Thesis in Genetics',
      subtitle: 'Western University | Breast Cancer & Tumor Heterogeneity | PacBio HiFi Long-read sequencing | Genomic Diversity',
      description: `Used PacBio HiFi long-read sequencing to show that RHAMM loss drives clonal dominance in breast cancer lung metastases. A multi-stage bioinformatics pipeline revealed 15x more cohort-shared variants in RHAMM-deficient mice, suggesting a potential therapeutic vulnerability.`,
      year: '2026',
      thumbnail: thesisThumbnail,
      containThumbnail: true
    },
    {
      id: 'keycraft',
      title: 'KeyCraft',
      subtitle: 'Desktop Music Composition App | Tauri, React, Tone.js',
      description: 'A full-featured music composition desktop app with a piano roll editor, virtual keyboard, sheet music view, MIDI import/export, and AI audio-to-MIDI transcription.',
      year: '2026',
      thumbnail: keycraftLogo,
      containThumbnail: true,
      externalLink: 'https://github.com/audreygoddard04/KeyCraft-Windows-Desktop-App'
    },
    {
      id: 'gymify',
      title: 'Gymify',
      subtitle: 'AI-Powered Fitness & Nutrition Assistant',
      description: 'An AI fitness coach that automates goal tracking, meal planning, and workout optimization, with biometric-aware nutrition, adaptive training blocks, and physique analysis.',
      year: '2025',
      externalLink: 'https://github.com/audreygoddard04/Gymify'
    },
    {
      id: 'pathology-website',
      title: 'Pathology Website',
      subtitle: 'Interactive Pathology Learning Platform',
      description: 'An educational website for pathology learning, featuring interactive content and comprehensive pathology resources.',
      year: '2025',
      externalLink: 'https://symphonious-tanuki-1fe5d1.netlify.app/',
      useIframe: true
    },
    {
      id: 'substack',
      title: 'Substack',
      subtitle: 'Writing & Newsletter',
      description: 'My Substack, where I write about health, science, and the things I care about.',
      year: '2026',
      externalLink: 'https://substack.com/@audreyannagoddard'
    },
    {
      id: 'home-dashboard',
      title: 'Notion Home Dashboard',
      subtitle: 'Personal Dashboard & Organization Hub',
      description: 'A comprehensive dashboard for organizing personal projects, tasks, and information using Notion.',
      year: '2025',
      externalLink: 'https://homedashboard-ag.notion.site/HOME-DASHBOARD-2bdc98089aed8172aa34d4c59a8adfaa',
      thumbnail: notionDashboardImage
    }
  ];

  return (
    <div className="projects-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Projects</h1>
            <p className="project-detail-subtitle">The things that occupy my time :D</p>
          </div>
        </header>

      {/* Projects List */}
      <section className="main-section project-detail-section">
        <div className="projects-grid">
          {projects.map((project) => {
            const cardContent = (
              <>
                <div className="project-content">
                  <div className="project-card-header">
                    <h3>{project.title}</h3>
                  </div>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-card-footer">
                    <span className="project-link">
                      {project.contactForm ? 'Get started →' : project.externalLink ? 'Visit site →' : 'Read more →'}
                    </span>
                  </div>
                </div>
                <div className="project-thumbnail">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className={project.containThumbnail ? 'project-screenshot-contain' : 'project-screenshot'}
                    />
                  ) : project.externalLink ? (
                    !project.externalLink.includes('netlify.app') ? (
                      <div className="notion-placeholder">
                        <div className="notion-text">
                          <h4>{project.title}</h4>
                          <p>
                            {project.externalLink.includes('github.com') ? 'View on GitHub →'
                              : project.externalLink.includes('substack.com') ? 'Read on Substack →'
                              : 'Visit site →'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="project-thumbnail-wrapper">
                        <iframe
                          src={project.externalLink}
                          title={project.title}
                          className="project-preview-iframe"
                          frameBorder="0"
                          scrolling="no"
                        />
                      </div>
                    )
                  ) : null}
                </div>
              </>
            );

            if (project.contactForm) {
              return (
                <Link 
                  key={project.id} 
                  to="/contact" 
                  className="project-card"
                >
                  {cardContent}
                </Link>
              );
            }
            if (project.externalLink) {
              return (
                <a
                  key={project.id}
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                >
                  {cardContent}
                </a>
              );
            }
            return (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`} 
                className="project-card"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>
      </div>
    </div>
  );
}

export default Projects;
