import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import img1 from '../images/5D53BECC-FAF0-446A-A6C4-BD43F2593935_1_105_c.jpeg';
import img2 from '../images/IMG_8914.jpg';
import img3 from '../images/921979.jpg';
import img4 from '../images/IMG_7427.jpg';

function Home() {
  return (
    <div className="home-bg">
      <div className="hero-section-redesign">
        <div className="hero-left-content">
          <h1 className="home-headline">Audrey Anna Goddard.</h1>
          <p className="home-subtitle">Personal Portfolio</p>
          <ul className="home-bio-list">
            <li>BSc Honors Specialization in Genetics at Western University (2022-2026) graduate.</li>
            <li>Varsity track & field provincial Rookie of the Year.</li>
            <li>Placed 2nd, 4th, and 7th at National Championships.</li>
            <li>Favorite hobbies: reading, baking & cooking, running, biking, yoga/pilates, learning languages, hiking, piano & guitar, drawing & design.</li>
          </ul>

          <div className="home-btn-row">
            <Link to="/projects" className="view-projects-btn">Projects</Link>
            <Link to="/about" className="view-resume-btn">About Me</Link>
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
