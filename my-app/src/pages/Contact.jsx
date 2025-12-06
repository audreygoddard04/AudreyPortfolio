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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Use the API endpoint (works in both dev and production on Vercel)
      const apiUrl = '/api/send-email';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type') || '';
      let data;
      
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonError) {
          // If JSON parsing fails, get the text response
          const text = await response.text();
          console.error('JSON parse error. Response text:', text.substring(0, 200));
          throw new Error('Server returned an invalid response. The API endpoint may not be configured correctly.');
        }
      } else {
        // If not JSON, get text response (likely an error page)
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 500));
        console.error('Response status:', response.status);
        console.error('Response headers:', Object.fromEntries(response.headers.entries()));
        
        // Provide more specific error message
        if (response.status === 404) {
          throw new Error('API endpoint not found. Please ensure Root Directory is set to "my-app" in Vercel settings.');
        } else if (text.includes('server error') || text.includes('Server Error')) {
          throw new Error('Server error occurred. Check Vercel function logs and ensure environment variables are set.');
        } else {
          throw new Error(`Server returned an invalid response (${response.status}). The API may not be properly deployed.`);
        }
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send email');
      }

      // Success
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
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to send email. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="projects-bg">
      <div className="project-detail-container">
        <Link to="/services" className="back-link">Back to Services</Link>
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Website Design & Development</h1>
            <p className="project-detail-subtitle">Get a custom website built for your business or personal portfolio</p>
          </div>
        </header>

        <section className="main-section project-detail-section contact-form-section">
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

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
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

