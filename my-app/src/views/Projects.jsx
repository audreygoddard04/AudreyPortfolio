/**
 * Projects.jsx
 *
 * Displays the portfolio projects grid. Each project card links to either:
 *   - An internal detail page (/projects/:id) for research/thesis projects
 *   - An external site (GitHub, live app, etc.) for everything else
 *
 * The project data array is defined outside the component because it is
 * static — defining it inside would create a new array on every render.
 */

import React from 'react';
import Link from 'next/link';

// Static image imports — .src gives the resolved public URL
import notionDashboardImageAsset from '../images/notion-dashboard.png';
import thesisThumbnailAsset      from '../images/ThesisThumbnail.png';
import keycraftLogoAsset         from '../images/keycraft-logo.png';
import substackBannerAsset       from '../images/substack-banner.png';

const notionDashboardImage = notionDashboardImageAsset.src;
const thesisThumbnail      = thesisThumbnailAsset.src;
const keycraftLogo         = keycraftLogoAsset.src;
const substackBanner       = substackBannerAsset.src;

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

/**
 * Project list. Each object supports:
 *   id             — used to build the internal detail URL (/projects/:id)
 *   title          — card heading
 *   subtitle       — short descriptor below the title
 *   description    — 1–2 sentence summary shown on the card
 *   year           — displayed in the card footer
 *   thumbnail      — optional image URL; falls back to a text placeholder
 *   containThumbnail — if true, uses object-fit:contain instead of cover
 *   externalLink   — if set, the card links out instead of to an internal page
 *   useIframe      — if true AND externalLink is set, renders a live preview iframe
 */
const PROJECTS = [
  {
    id: 'rhamm-breast-cancer',
    title: 'Honors Thesis in Genetics',
    subtitle: 'Western University | Breast Cancer & Tumor Heterogeneity | PacBio HiFi Long-read sequencing | Genomic Diversity',
    description: 'Used PacBio HiFi long-read sequencing to show that RHAMM loss drives clonal dominance in breast cancer lung metastases. A multi-stage bioinformatics pipeline revealed 15× more cohort-shared variants in RHAMM-deficient mice, suggesting a potential therapeutic vulnerability.',
    year: '2026',
    thumbnail: thesisThumbnail,
    containThumbnail: true,
  },
  {
    id: 'keycraft',
    title: 'KeyCraft',
    subtitle: 'Desktop Music Composition App | Tauri, React, Tone.js',
    description: 'A full-featured music composition desktop app with a piano roll editor, virtual keyboard, sheet music view, MIDI import/export, and AI audio-to-MIDI transcription.',
    year: '2026',
    thumbnail: keycraftLogo,
    externalLink: 'https://www.keycraft.org/',
  },
  {
    id: 'gymify',
    title: 'Gymify',
    subtitle: 'AI-Powered Fitness & Nutrition Assistant',
    description: 'An AI fitness coach that automates goal tracking, meal planning, and workout optimization, with biometric-aware nutrition, adaptive training blocks, and physique analysis.',
    year: '2025',
    externalLink: 'https://github.com/audreygoddard04/Gymify',
  },
  {
    id: 'pathology-website',
    title: 'Pathology Website',
    subtitle: 'Interactive Pathology Learning Platform',
    description: 'An educational website for pathology learning, featuring interactive content and comprehensive pathology resources.',
    year: '2025',
    externalLink: 'https://symphonious-tanuki-1fe5d1.netlify.app/',
    useIframe: true,
  },
  {
    id: 'substack',
    title: 'Substack',
    subtitle: 'Writing & Newsletter',
    description: 'My Substack, where I write about health, science, and the things I care about.',
    year: '2026',
    thumbnail: substackBanner,
    externalLink: 'https://substack.com/@audreyannagoddard',
  },
  {
    id: 'home-dashboard',
    title: 'Notion Home Dashboard',
    subtitle: 'Personal Dashboard & Organization Hub',
    description: 'A comprehensive dashboard for organizing personal projects, tasks, and information using Notion.',
    year: '2025',
    thumbnail: notionDashboardImage,
    externalLink: 'https://homedashboard-ag.notion.site/HOME-DASHBOARD-2bdc98089aed8172aa34d4c59a8adfaa',
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/**
 * Renders the thumbnail area of a project card.
 * Chooses between: image, iframe preview, or a branded text placeholder.
 */
function ProjectThumbnail({ project }) {
  if (project.thumbnail) {
    return (
      <div className="project-thumbnail">
        <img
          src={project.thumbnail}
          alt={project.title}
          className={project.containThumbnail ? 'project-screenshot-contain' : 'project-screenshot'}
        />
      </div>
    );
  }

  if (project.useIframe && project.externalLink) {
    return (
      <div className="project-thumbnail">
        <div className="project-thumbnail-wrapper">
          <iframe
            src={project.externalLink}
            title={project.title}
            className="project-preview-iframe"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </div>
    );
  }

  if (project.externalLink) {
    // Derive a friendly call-to-action label from the URL
    let cta = 'Visit site →';
    if (project.externalLink.includes('github.com'))   cta = 'View on GitHub →';
    if (project.externalLink.includes('substack.com')) cta = 'Read on Substack →';

    return (
      <div className="project-thumbnail">
        <div className="notion-placeholder">
          <div className="notion-text">
            <h4>{project.title}</h4>
            <p>{cta}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Shared inner content for every project card.
 * Extracted so the same JSX isn't duplicated across three link variants.
 */
function ProjectCardContent({ project }) {
  const cta = project.externalLink ? 'Visit site →' : 'Read more →';

  return (
    <>
      <div className="project-content">
        <div className="project-card-header">
          <h3>{project.title}</h3>
        </div>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <div className="project-card-footer">
          <span className="project-link">{cta}</span>
        </div>
      </div>
      <ProjectThumbnail project={project} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

function Projects() {
  return (
    <div className="projects-bg">
      <div className="project-detail-container">

        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Projects</h1>
            <p className="project-detail-subtitle">The things that occupy my time :D</p>
          </div>
        </header>

        <section className="main-section project-detail-section">
          <div className="projects-grid">
            {PROJECTS.map((project) => {
              // External links → plain <a> that opens in a new tab
              if (project.externalLink) {
                return (
                  <a
                    key={project.id}
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card"
                  >
                    <ProjectCardContent project={project} />
                  </a>
                );
              }

              // Internal projects → Next.js <Link> to the detail page
              return (
                <Link key={project.id} href={`/projects/${project.id}`} className="project-card">
                  <ProjectCardContent project={project} />
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
