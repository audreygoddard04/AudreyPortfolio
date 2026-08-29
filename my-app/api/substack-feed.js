const { getSubstackArticles } = require('./_substackFeed');

// Vercel serverless function handler
module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const articles = await getSubstackArticles();
    return res.status(200).json({ articles });
  } catch (error) {
    console.error('Error fetching Substack feed:', error);
    return res.status(500).json({
      error: 'Failed to fetch Substack feed',
      message: error.message || 'An unexpected error occurred',
    });
  }
};

module.exports.default = module.exports;
