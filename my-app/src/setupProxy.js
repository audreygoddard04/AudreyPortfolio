const { getSubstackArticles } = require('../api/_substackFeed');

// Mirrors api/substack-feed.js so `npm start` can serve the same endpoint
// locally without needing `vercel dev`.
module.exports = function setupProxy(app) {
  app.get('/api/substack-feed', async (req, res) => {
    try {
      const articles = await getSubstackArticles();
      res.json({ articles });
    } catch (error) {
      console.error('Error fetching Substack feed:', error);
      res.status(500).json({
        error: 'Failed to fetch Substack feed',
        message: error.message || 'An unexpected error occurred',
      });
    }
  });
};
