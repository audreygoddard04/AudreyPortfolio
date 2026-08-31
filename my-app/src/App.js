import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Health from './pages/Health.jsx';
import Books from './pages/Books.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Nutrition from './pages/Nutrition.jsx';
import Fitness from './pages/Fitness.jsx';
import Contact from './pages/Contact.jsx';
import Articles from './pages/Articles.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import About from './pages/About.jsx';
import siteConfig from './data/siteConfig';
// import WebsiteDesign from './pages/WebsiteDesign.jsx';

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.author,
  url: siteConfig.siteUrl,
  sameAs: siteConfig.sameAs,
  description: siteConfig.defaultDescription,
};

const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
};

function App() {
  useEffect(() => {
    const upsertJsonLd = (id, data) => {
      let el = document.head.querySelector(`script[data-seo-jsonld="${id}"]`);
      if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.setAttribute('data-seo-jsonld', id);
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };
    upsertJsonLd('site-person', personStructuredData);
    upsertJsonLd('site-website', websiteStructuredData);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
        <Header />
        <main style={{ flex: '1', margin: 0, padding: 0 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            {/* <Route path="/website-design" element={<WebsiteDesign />} /> */}
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/health" element={<Health />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
