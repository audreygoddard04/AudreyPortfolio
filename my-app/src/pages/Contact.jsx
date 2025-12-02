import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import './ProjectDetail.css';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    projectType: '',
    otherSpecify: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.projectType === 'other' && !formData.otherSpecify) {
      setError('Please specify your project type.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // TODO: Integrate with your email service or backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        businessName: '',
        projectType: '',
        otherSpecify: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="projects-bg">
      <div className="project-detail-container">
        <Link to="/projects" className="back-link">Back to Projects</Link>
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Website Design Inquiry</h1>
            <p className="project-detail-subtitle">Get a custom website built for your business or personal portfolio</p>
          </div>
        </header>

        <section className="main-section project-detail-section">
          {submitted ? (
            <div className="contact-success">
              <h2>Thank you for your inquiry!</h2>
              <p>I've received your message and will get back to you soon.</p>
            </div>
          ) : (
            <>
              <p className="contact-intro">
                Fill out the form below to get started. I'll review your project details and get back to you with a quote and timeline.
              </p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessName">Business/Organization Name</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="">Select a project type</option>
                    <option value="business">Business Website</option>
                    <option value="portfolio">Personal Portfolio</option>
                    <option value="ecommerce">E-commerce Site</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {formData.projectType === 'other' && (
                  <div className="form-group">
                    <label htmlFor="otherSpecify">Please specify *</label>
                    <input
                      type="text"
                      id="otherSpecify"
                      name="otherSpecify"
                      value={formData.otherSpecify}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Please describe your project type"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="form-input"
                    placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                  />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="submit-button">
                  Submit Inquiry
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Contact;

