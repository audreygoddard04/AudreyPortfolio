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
import thesisThumbnailAsset from '../images/ThesisThumbnail.png';
import keycraftImageAsset from '../images/keycraft-image.png';

const thesisThumbnail = thesisThumbnailAsset.src;
const keycraftImage = keycraftImageAsset.src;

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const PROJECTS = [
  {
    id: 'rhamm-breast-cancer',
    title: 'Honours Thesis in Genetics',
    subtitle: 'Western University | Breast Cancer & Long-Read Sequencing',
    description: 'PacBio long-read sequencing uncovered a clonal bottleneck in RHAMM-deficient lung metastases.',
    year: '2026',
    thumbnail: thesisThumbnail,
  },
  {
    id: 'keycraft',
    title: 'KeyCraft',
    subtitle: 'Desktop music composition app',
    description: 'A composition workflow for drafting melodies, arranging ideas, and exporting MIDI.',
    year: '2026',
    thumbnail: keycraftImage,
    externalLink: 'https://www.keycraft.org/',
  },
  {
    id: 'pathology-website',
    title: 'Pathology Website',
    subtitle: 'Interactive learning platform',
    description: 'An educational site for structured pathology study and visual review.',
    year: '2025',
    externalLink: 'https://symphonious-tanuki-1fe5d1.netlify.app/',
    thumbnail: '/pathology-preview.jpg',
  },
  {
    id: 'keltner',
    title: 'KELTNER',
    subtitle: 'Independent editorial publication',
    description: 'A journal on style, places, and culture.',
    year: '2026',
    thumbnail: '/keltner/lake-como.png',
    externalLink: 'https://keltnerpress.com/',
    cta: 'Explore KELTNER →',
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ProjectThumbnail({ project }) {
  return (
    <div className="project-thumbnail">
      <img
        src={project.thumbnail}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        className="project-screenshot"
      />
    </div>
  );
}

/**
 * Shared inner content for every project card.
 * Extracted so the same JSX isn't duplicated across three link variants.
 */
function ProjectCardContent({ project }) {
  const cta = project.cta || (project.externalLink ? 'Visit site →' : 'Read more →');

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
      <div className="projects-container">

        <header className="projects-header">
          <div className="projects-title">
            <h1>Projects</h1>
            <p className="projects-subtitle">The things that occupy my time :D</p>
          </div>
        </header>

        <section className="projects-list">
          <div className="projects-grid">
            {PROJECTS.map((project) => {
              const href = project.externalLink || project.internalLink || `/projects/${project.id}`;
              const content = <ProjectCardContent project={project} />;

              if (project.externalLink || project.internalLink) {
                return (
                  <a
                    key={project.id}
                    href={href}
                    className="project-card"
                    {...(project.externalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {content}
                  </a>
                );
              }

              return <Link key={project.id} href={href} className="project-card">{content}</Link>;
            })}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Projects;
