/* Website Design page disabled — Resend is used for another site.
   Uncomment below and restore App.js / Header / Footer / BottomNav to re-enable.

import React, { useState } from 'react';
import './ProjectDetail.css';
import './Projects.css';
import './Home.css';
import './Contact.css';

function WebsiteDesign() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }
    if (formData.projectType === 'other' && !formData.otherSpecify) {
      setError('Please specify your project type.');
      setIsSubmitting(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          throw new Error('Server returned an invalid response.');
        }
      } else {
        await response.text();
        if (response.status === 404) throw new Error('API endpoint not found.');
        throw new Error(`Server returned an invalid response (${response.status}).`);
      }

      if (!response.ok) throw new Error(data.error || data.message || 'Failed to send email');

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', businessName: '', projectType: '', otherSpecify: '', message: '' });
      }, 5000);
    } catch (err) {
      setError(err.message || 'Failed to send email. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="project-detail-bg health-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Website Design & Development</h1>
            <p className="project-detail-subtitle">Custom Web Development & Design Services</p>
          </div>
        </header>

        <section className="main-section project-detail-section contact-form-section">
          <p className="project-description" style={{ marginBottom: '1.5rem' }}>
            Interested in having a website built for your business or personal portfolio? I create beautiful, functional, and user-friendly websites tailored to your needs.
          </p>
          <p className="project-description" style={{ marginBottom: '2rem' }}>
            Whether you need a portfolio site, a business website, or something custom, I'd love to hear about your project.
          </p>

          {submitted ? (
            <div className="contact-success">
              <h2>Thank you for your inquiry!</h2>
              <p>I've received your message and will get back to you soon.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="wd-name">Name *</label>
                <input type="text" id="wd-name" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="wd-email">Email *</label>
                <input type="email" id="wd-email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="wd-businessName">Business/Organization Name</label>
                <input type="text" id="wd-businessName" name="businessName" value={formData.businessName} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="wd-projectType">Project Type</label>
                <select id="wd-projectType" name="projectType" value={formData.projectType} onChange={handleChange} className="form-input form-select">
                  <option value="">Select a project type</option>
                  <option value="business">Business Website</option>
                  <option value="portfolio">Personal Portfolio</option>
                  <option value="ecommerce">E-commerce Site</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {formData.projectType === 'other' && (
                <div className="form-group">
                  <label htmlFor="wd-otherSpecify">Please specify *</label>
                  <input type="text" id="wd-otherSpecify" name="otherSpecify" value={formData.otherSpecify} onChange={handleChange} required className="form-input" placeholder="Please describe your project type" />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="wd-message">Project Details *</label>
                <textarea id="wd-message" name="message" value={formData.message} onChange={handleChange} required rows="6" className="form-input" placeholder="Tell me about your project, goals, timeline, and any specific requirements..." />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export default WebsiteDesign;

*/

export default function WebsiteDesign() {
  return null;
}
