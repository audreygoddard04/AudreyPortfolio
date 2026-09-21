import React from 'react';
import Link from 'next/link';
import img1Asset from '../images/5D53BECC-FAF0-446A-A6C4-BD43F2593935_1_105_c.jpeg';
const img1 = img1Asset.src;
import img2Asset from '../images/IMG_8914.jpg';
const img2 = img2Asset.src;
import img3Asset from '../images/921979.jpg';
const img3 = img3Asset.src;
import img4Asset from '../images/IMG_7427.jpg';
const img4 = img4Asset.src;

function Home() {
  return (
    <div className="home-bg">

      <div className="hero-section-redesign">
        <div className="hero-left-content">
          <h1 className="home-headline">Audrey Anna Goddard.</h1>
          <p className="home-subtitle">Personal Portfolio</p>
          <ul className="home-bio-list">
            <li>BSc Honors Specialization in Genetics at Western University (2022-2026) graduate.</li>
            <li>Provincial varsity track & field Rookie of the Year.</li>
            <li>Placed 2nd, 4th, & 7th at National Championships.</li>
            <li>Hobbies: reading, running, drawing & design, hiking, baking & cooking, biking, yoga & pilates, learning languages, piano, & guitar.</li>
          </ul>

          <div className="home-btn-row">
            <Link href="/articles" className="view-resume-btn">Articles</Link>
            <Link href="/projects" className="view-projects-btn">Projects</Link>
          </div>
        </div>

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
