const FEED_URL = 'https://audreyannagoddard.substack.com/feed';

function extract(pattern, text) {
  const match = pattern.exec(text);
  return match ? match[1].trim() : '';
}

function parseItem(itemXml) {
  const title = extract(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/, itemXml)
    || extract(/<title>([\s\S]*?)<\/title>/, itemXml);
  const link = extract(/<link>([\s\S]*?)<\/link>/, itemXml);
  const pubDate = extract(/<pubDate>([\s\S]*?)<\/pubDate>/, itemXml);
  const excerpt = extract(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/, itemXml);

  const parsedDate = pubDate ? new Date(pubDate) : null;

  return {
    title,
    link,
    date: parsedDate && !isNaN(parsedDate)
      ? parsedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '',
    excerpt,
  };
}

async function getSubstackArticles() {
  const response = await fetch(FEED_URL, {
    headers: { 'User-Agent': 'AudreyPortfolio/1.0' },
  });

  if (!response.ok) {
    throw new Error(`Substack feed request failed with status ${response.status}`);
  }

  const xml = await response.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  return items
    .map(parseItem)
    .filter((article) => article.title && article.link);
}

module.exports = { getSubstackArticles };
