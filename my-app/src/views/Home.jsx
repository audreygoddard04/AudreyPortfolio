/**
 * Home.jsx
 *
 * Homepage hero section. Displays the headline, a short bio list,
 * CTA buttons, and a 4-image grid on the right.
 *
 * Images are imported as Next.js static assets. The `.src` property gives
 * the resolved public URL, which is passed to a plain <img> tag here
 * because the grid uses precise CSS layout that works best with native img.
 */

import React from 'react';
import Link from 'next/link';

// Static image imports — Next.js resolves these to optimised public URLs at build time
import img1Asset from '../images/5D53BECC-FAF0-446A-A6C4-BD43F2593935_1_105_c.jpeg';
import img2Asset from '../images/IMG_8914.jpg';
import img3Asset from '../images/921979.jpg';
import img4Asset from '../images/IMG_7427.jpg';

// Extract the string URL from each asset object
const img1 = img1Asset.src;
const img2 = img2Asset.src;
const img3 = img3Asset.src;
const img4 = img4Asset.src;

function Home() {
  return (
    <div className="home-bg">

      <div className="hero-section-redesign">

        {/* Left column: text content */}
        <div className="hero-left-content">
          <h1 className="home-headline">Hi, I'm Audrey.</h1>
          <p className="home-subtitle">Personal Portfolio</p>

          <ul className="home-bio-list">
            <li>BSc Honors Specialization in Genetics at Western University (2022–2026) graduate.</li>
            <li>Provincial varsity track &amp; field Rookie of the Year.</li>
            <li>Placed 2nd, 4th, &amp; 7th at National Championships.</li>
            <li>Hobbies: reading, running, drawing &amp; design, hiking, baking &amp; cooking, biking, yoga &amp; pilates, learning languages, piano, &amp; guitar.</li>
          </ul>

          {/* CTA buttons */}
          <div className="home-btn-row">
            <Link href="/articles" className="view-resume-btn">Articles</Link>
            <Link href="/projects" className="view-projects-btn">Projects</Link>
          </div>
        </div>

        {/* Right column: 2×2 photo grid */}
        <div className="hero-image-grid">
          <figure className="grid-item grid-item-tall">
            <img src={img2} alt="Audrey playing piano" />
          </figure>
          <figure className="grid-item grid-item-portrait-top">
            <img src={img3} alt="Audrey smiling portrait" />
          </figure>
          <figure className="grid-item grid-item-portrait-bottom">
            <img src={img1} alt="Audrey athletic portrait" />
          </figure>
          <figure className="grid-item grid-item-landscape">
            <img src={img4} alt="Audrey running on track" />
          </figure>
        </div>

      </div>
    </div>
  );
}

export default Home;
