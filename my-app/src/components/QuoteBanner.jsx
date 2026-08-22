import React from 'react';
import './QuoteBanner.css';

const QUOTES = [
  'Every man builds his world in his own image. He has the power to choose, but no power to escape the necessity of choice.',
  "The things you do and regret, you'll get over.",
  "The things you don't do, you'll never get over.",
  'Take science fiction and make it science.',
  'Sometimes doing your best simply is not good enough.',
  "It's better to have it and not need it than to need it and not have it.",
  'Shortcuts will cut you short.',
  "Discipline is the memory of who you said you'd be.",
  'The only rules are the ones dictated by the laws of physics. The rest are recommendations.',
  "If the human brain were so simple that we could understand it, we would be so simple that we couldn't.",
  'Give up hoping that your tears can bring some change in the decision of the gods.',
];

function QuoteBanner() {
  return (
    <div className="quote-banner">
      <div className="quote-banner-track">
        {[...QUOTES, ...QUOTES].map((quote, i) => (
          <span className="quote-banner-item" key={i}>
            {quote}
            <span className="quote-banner-divider">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default QuoteBanner;
