import React from 'react';
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
          <h1 className="home-headline">Audrey Goddard's Personal Portfolio</h1>
          <p className="home-desc">I have just completed my undergraduate degree pursuing an Honors Specialization in Genetics at Western University (2022-2026), where I was a varsity track & field athlete. My passions involve health, science, longevity, and helping others grow through curiosity and wellness.</p>
          <p className="home-desc">Enjoy my website and click on my socials for more information and a way to contact me. </p>
          
          <div className="home-btn-row">
            <a href="/projects/rhamm-breast-cancer" className="view-projects-btn">View my Honours Genetics Thesis (BSc)</a>
            <a href="/AudreyGoddardResume.pdf" target="_blank" rel="noopener noreferrer" className="view-resume-btn">View my Official Resume</a>
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