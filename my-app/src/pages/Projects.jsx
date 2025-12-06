import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import './ProjectDetail.css';
import notionDashboardImage from '../images/notion-dashboard.png';

function Projects() {
  const projects = [
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
      id: 'home-dashboard',
      title: 'Notion Home Dashboard',
      subtitle: 'Personal Dashboard & Organization Hub',
      description: 'A comprehensive dashboard for organizing personal projects, tasks, and information using Notion.',
      year: '2025',
      externalLink: 'https://homedashboard-ag.notion.site/HOME-DASHBOARD-2bdc98089aed8172aa34d4c59a8adfaa',
      thumbnail: notionDashboardImage
    },
    {
      id: 'rhamm-breast-cancer',
      title: 'Thesis Proposal',
      subtitle: 'Breast Cancer & Tumor Heterogeneity | PacBio HIFI Long-read sequencing | Genomic, Epigenetic, & Mitochondrial Diversity',
      description: `Characterizing nuclear, epigenetic, and mitochondrial heterogeneity in RHAMM-deficient breast cancer lung metastases using PacBio HiFi sequencing. A multi-omic project bridging cancer genetics, long-read analysis, and therapeutic insight.`,
      year: '2025',
      comingSoon: true
    }
  ];

  return (
    <div className="projects-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Projects</h1>
            <p className="project-detail-subtitle">The things that occupy my time :D</p>
            <div className="project-detail-meta">
              <span className="project-year-badge">2025</span>
            </div>
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
                    <span className="project-year">{project.year}</span>
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
                  {project.comingSoon ? (
                    <div className="coming-soon-thumbnail">
                      <div className="coming-soon-text">
                        <h4>Coming Soon</h4>
                      </div>
                    </div>
                  ) : project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="project-screenshot"
                    />
                  ) : project.externalLink ? (
                    <div className="project-thumbnail-wrapper">
                      <iframe
                        src={project.externalLink}
                        title={project.title}
                        className="project-preview-iframe"
                        frameBorder="0"
                        scrolling="no"
                      />
                    </div>
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

      {/* Coming Soon Section */}
      <section className="main-section project-detail-section coming-soon-section">
        <h2>Coming Soon...</h2>
        <div className="coming-soon-grid">
          <div className="coming-soon-card">
            <h3>Gymify</h3>
            <p className="coming-soon-subtitle">AI-powered fitness and nutrition assistant</p>
            <p className="coming-soon-description">An intelligent fitness coach that automates goal tracking, meal planning, and workout optimization. Eliminates manual tracking with personalized AI coaching for training, nutrition, and recovery.</p>
          </div>
          <div className="coming-soon-card">
            <h3>ROSY</h3>
            <p className="coming-soon-subtitle">The genetics creative supertool</p>
            <p className="coming-soon-description">A genetics tool that makes genomic work accessible and easy, empowering users to work with genetic data without requiring extensive technical expertise.</p>
          </div>
          <div className="coming-soon-card">
            <h3>TLC</h3>
            <p className="coming-soon-subtitle">Your accountability on having hobbies</p>
            <p className="coming-soon-description">An app for hobbies to be browsed and instructed for users, helping people discover new interests and learn new skills with guided instruction and accountability.</p>
          </div>
          <div className="coming-soon-card">
            <h3>NutraNova</h3>
            <p className="coming-soon-subtitle">Nutrition & Genetics and all the health benefits imaginable</p>
            <p className="coming-soon-description">A company idea with genetically enhanced foods that provide all the nutritional value needed at great prices, making optimal nutrition accessible to everyone.</p>
          </div>
          <div className="coming-soon-card">
            <h3>Tutoring Company</h3>
            <p className="coming-soon-subtitle">Educational Services</p>
            <p className="coming-soon-description">Coming soon - personalized tutoring services to help students excel in their studies.</p>
          </div>
          <div className="coming-soon-card">
            <h3>AI Agent</h3>
            <p className="coming-soon-subtitle">Intelligent Automation</p>
            <p className="coming-soon-description">Coming soon - an advanced AI agent designed to automate tasks and provide intelligent assistance.</p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

export default Projects;
