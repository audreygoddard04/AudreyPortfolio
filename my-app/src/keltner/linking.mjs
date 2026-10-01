import { getCategory } from "./config.js";
const id = (value) => value?._ref || value?._id;
const section = (article) => getCategory(article.category?.slug)?.slug;
const topics = (article) => new Set((article.topics || []).map(t => t.trim().toLowerCase()).filter(Boolean));
// Curated launch pair: the founding editorial introduces enduring design,
// and the estate feature explores that theme. CMS selections take precedence.
const launchConnections = {
  "things-worth-keeping": ["value-in-beautiful-estates"],
  "value-in-beautiful-estates": ["things-worth-keeping"],
};
const references = (article) => [
  ...(article.relatedArticles || []), ...(article.relatedGuides || []),
  article.commercialGuide, article.pillarArticle,
].map(id).filter(Boolean);

// Only receive published stories from getArticles(). Resolve references against
// that pool so drafts, deleted documents, and future posts never become links.
export function editorialLinks(article, stories) {
  const pool = [...new Map(stories.filter(s => s?._id && s.slug && s._id !== article._id).map(s => [s._id, s])).values()];
  const ownTopics = topics(article);
  const explicit = references(article);
  if (!article.relatedArticles?.length) {
    explicit.push(...pool.filter(s => launchConnections[article.slug]?.includes(s.slug)).map(s => s._id));
  }
  const rank = (s) => {
    if (explicit.includes(s._id)) return 100;
    if (references(s).includes(article._id)) return 90;
    const overlap = [...topics(s)].filter(t => ownTopics.has(t)).length;
    return overlap * 20 + (section(article) && section(s) === section(article) ? 5 : 0);
  };
  const ranked = pool.map(s => ({ story: s, score: rank(s) }))
    .filter(s => s.score > 0)
    .sort((a,b) => b.score-a.score || (b.story.publishedAt || '').localeCompare(a.story.publishedAt || '') || a.story._id.localeCompare(b.story._id))
    .map(s => s.story);
  const commercial = pool.find(s => s._id === id(article.commercialGuide)) || ranked.find(s => s.isCommercialGuide);
  const pillar = pool.find(s => s._id === id(article.pillarArticle) && s._id !== commercial?._id);
  const related = ranked.filter(s => s._id !== commercial?._id && s._id !== pillar?._id).slice(0,4);
  return { related, commercial, pillar, section: getCategory(article.category?.slug) };
}
