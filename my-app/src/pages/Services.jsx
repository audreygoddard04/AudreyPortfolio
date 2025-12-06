import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import './ProjectDetail.css';

function Services() {
  const services = [
    {
      id: 'website-development',
      title: 'Website Design & Development',
      subtitle: 'Custom Web Development & Design Services',
      description: 'Interested in having a website built for your business or personal portfolio? Fill out our contact form to get started. Creating beautiful, functional, and user-friendly websites tailored to client needs.',
      link: '/contact',
      thumbnail: '/website-design-thumbnail.png'
    },
    {
      id: 'nutrition',
      title: 'Nutrition',
      subtitle: 'Evidence-based nutrition, vitamins, and wellness',
      description: 'Nutrition hacks and smart eating habits, fasting protocols and dietary guidelines, vitamins, supplements, and FAQs. Learn about evidence-based nutrition strategies for optimal health and wellness.',
      link: '/athletics/nutrition',
      thumbnail: null
    },
    {
      id: 'fitness',
      title: 'Fitness',
      subtitle: 'Training, exercises, and health practices',
      description: 'Little tidbits about the health practices I like most. Non-negotiables, lifting exercises, cardio options, and fitness routines. For more detailed information, stay tuned for my dedicated health coaching website.',
      link: '/athletics',
      thumbnail: null
    }
  ];

  return (
    <div className="projects-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Services</h1>
            <p className="project-detail-subtitle">What we can do for you</p>
          </div>
        </header>

        <section className="main-section project-detail-section">
          <div className="projects-grid">
            {services.map((service) => {
              const cardContent = (
                <>
                  <div className="project-content">
                    <div className="project-card-header">
                      <h3>{service.title}</h3>
                    </div>
                    <p className="project-subtitle">{service.subtitle}</p>
                    <p className="project-description">{service.description}</p>
                    <div className="project-card-footer">
                      <span className="project-link">
                        Learn more →
                      </span>
                    </div>
                  </div>
                  {service.thumbnail ? (
                    <div className="project-thumbnail">
                      <div className="project-thumbnail-wrapper">
                        <img 
                          src={service.thumbnail} 
                          alt={service.title}
                          className="project-screenshot"
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="project-thumbnail">
                      <div className="coming-soon-thumbnail">
                        <div className="coming-soon-content">
                          <span className="coming-soon-text">Service</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );

              return (
                <Link 
                  key={service.id} 
                  to={service.link} 
                  className="project-card"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Services;
