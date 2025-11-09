import React from 'react';
import { FaInstagram } from 'react-icons/fa';
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
          <h1 className="home-headline">My name is Audrey Goddard.</h1>
          <p className="home-desc">I am a currently an undergraduate student pursuing an Honors Specialization in Genetics at Western University (2022-2026), and a varsity track & field athlete. My passions involve health, science, longevity, and helping others grow through curiosity and wellness.</p>
          <p className="home-desc">To learn more about me, enjoy my website and click on my socials for more information. </p>
          
          <div className="home-social-row">
            <a href="https://www.instagram.com/audrey_goddard/" className="home-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://x.com/audreygoddard_" className="home-social-icon" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>X</span>
            </a>
          </div>
          
          <button className="view-projects-btn" onClick={()=>window.location='/projects'}>View projects</button>
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