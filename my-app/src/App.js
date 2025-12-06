import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Health from './pages/Health.jsx';
import Books from './pages/Books.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Athletics from './pages/Athletics.jsx';
import Nutrition from './pages/Nutrition.jsx';
import Fitness from './pages/Fitness.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
        <Header />
        <main style={{ flex: '1', margin: 0, padding: 0 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/nutrition" element={<Nutrition />} />
            <Route path="/services/fitness" element={<Fitness />} />
            <Route path="/athletics" element={<Athletics />} />
            <Route path="/athletics/nutrition" element={<Nutrition />} />
            <Route path="/health" element={<Health />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <BottomNav />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
