'use client';

/**
 * Contact.jsx
 *
 * Website design inquiry form. Collects the visitor's name, email,
 * optional business name, project type, and a message, then POSTs
 * to /api/send-email (pages/api/send-email.js).
 *
 * Form state is reset 5 seconds after a successful submission so the
 * user can submit again if needed without refreshing the page.
 */

import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Shape of the form's controlled state — used for both initial value and reset */
const EMPTY_FORM = {
  name:          '',
  email:         '',
  businessName:  '',
  projectType:   '',
  otherSpecify:  '',
  message:       '',
};

/** Simple email format check */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function Contact() {
  // --- State ---
  const [formData,     setFormData]     = useState(EMPTY_FORM);
  const [submitted,    setSubmitted]     = useState(false);
  const [error,        setError]         = useState('');
  const [isSubmitting, setIsSubmitting]  = useState(false);

  // --- Handlers ---

  /** Syncs each field to formData and clears any previous error message */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  /** Validates the form and sends the request to the API route */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // --- Client-side validation (mirrors server-side checks) ---

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

    if (!EMAIL_REGEX.test(formData.email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // --- API call ---

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
          const text = await response.text();
          console.error('JSON parse error. Response text:', text.substring(0, 200));
          throw new Error('Server returned an invalid response. The API endpoint may not be configured correctly.');
        }
      } else {
        // Non-JSON response usually means the API route is misconfigured
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 500));

        if (response.status === 404) {
          throw new Error('API endpoint not found. Ensure the Root Directory is set to "my-app" in Vercel settings.');
        }
        throw new Error(`Server returned an invalid response (${response.status}).`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send email');
      }

      // --- Success ---
      setSubmitted(true);

      // Reset the form after 5 s so the user can submit again without refreshing
      setTimeout(() => {
        setSubmitted(false);
        setFormData(EMPTY_FORM);
      }, 5000);

    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to send email. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---

  return (
    <div className="projects-bg">
      <div className="project-detail-container">

        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Website Design &amp; Development</h1>
            <p className="project-detail-subtitle">
              Get a custom website built for your business or personal portfolio
            </p>
          </div>
        </header>

        <section className="main-section project-detail-section contact-form-section">

          {/* Success confirmation — shown after a successful submission */}
          {submitted ? (
            <div className="contact-success">
              <h2>Thank you for your inquiry!</h2>
              <p>I've received your message and will get back to you soon.</p>
            </div>
          ) : (
            <>
              <p className="contact-intro">
                Fill out the form below to get started. I'll review your project details
                and get back to you with a quote and timeline.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>

                {/* Required fields */}
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

                {/* Optional fields */}
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

                {/* Conditional: only shown when "Other" is selected */}
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

                {/* Inline error message */}
                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="submit-button" disabled={isSubmitting}>
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
