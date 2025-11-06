import React, { useState } from 'react';
import './Blog.css';

function Blog() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // TODO: Integrate with your email service (e.g., Mailchimp, ConvertKit, etc.)
    // For now, we'll just show a success message
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <div className="blog-bg">
      <header className="blog-header">
        <h1>Blog</h1>
        <p className="blog-subtitle">My thoughts...</p>
      </header>
      
      <section className="main-section">
        <h2>Latest Posts</h2>
        <p>Stay tuned for upcoming blog posts about my journey in science, research insights, and personal development tips.</p>
      </section>

      <section className="main-section subscribe-section">
        <h2>Subscribe to My Blog</h2>
        <p>Get notified when I publish new posts about science, research, personal development, and more.</p>
        
        {subscribed ? (
          <div className="subscribe-success">
            <p>✓ Thank you for subscribing! You'll receive email notifications when new posts are published.</p>
          </div>
        ) : (
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <div className="subscribe-input-group">
              <input
                type="email"
                className="subscribe-email-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />
              <button type="submit" className="subscribe-button">
                Subscribe
              </button>
            </div>
            {error && <p className="subscribe-error">{error}</p>}
          </form>
        )}
      </section>
    </div>
  );
}

export default Blog; 