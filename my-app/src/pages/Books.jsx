import React, { useState, useMemo } from 'react';
import './Books.css';
import './ProjectDetail.css';
import BookModal from '../components/BookModal';

const books = [
    // Business
    { title: 'The $100 Startup', author: 'Chris Guillebeau', category: 'Business', rating: 3, summary: 'Guillebeau profiles people who turned modest, low-cost ideas into profitable one-person businesses, offering a practical framework for validating and launching them.', review: '' },
    { title: 'Skin in the Game', author: 'Nassim Nicholas Taleb', category: 'Business', rating: 4, summary: 'Taleb argues that fairness, risk-sharing, and personal accountability — having real skin in the game — are essential to trustworthy decision-making in business, ethics, and life.', review: '' },
    { title: 'Influence: The Psychology of Persuasion', author: 'Robert B. Cialdini', category: 'Business', rating: 3, summary: 'Cialdini breaks down six core principles — reciprocity, commitment, social proof, authority, liking, and scarcity — that drive why people say yes.', review: '' },
    { title: 'A Random Walk Down Wall Street', author: 'Burton G. Malkiel', category: 'Business', rating: 4, summary: "A classic case for low-cost index investing, arguing that stock prices largely follow a random walk that's nearly impossible to consistently beat.", review: '' },
    { title: 'Accounting Made Simple', author: 'Mike Piper', category: 'Business', rating: 4, summary: 'A short, plain-English primer on the core accounting concepts — balance sheets, income statements, and cash flow — needed to read a company\'s financials.', review: '' },
    { title: 'Never Split the Difference', author: 'Chris Voss', category: 'Business', rating: 5, summary: "A former FBI hostage negotiator's field-tested tactics for negotiating — from tactical empathy to calibrated questions — applied to everyday deals and conflicts.", review: '' },
    { title: 'Zero to One', author: 'Peter Thiel', category: 'Business', rating: 3, summary: 'Thiel\'s contrarian take on startups argues real progress comes from building something genuinely new (going from 0 to 1) rather than copying what works.', review: '' },
    { title: 'Rich Dad, Poor Dad', author: 'Robert T. Kiyosaki', category: 'Business', rating: 4, summary: "Kiyosaki contrasts two father figures' views on money to argue for building assets and financial literacy over trading time for a paycheck.", review: '' },
    { title: 'The Birth of a Building', author: 'Ben Stevens', category: 'Business', rating: 5, summary: 'A behind-the-scenes look at how a building comes together, from initial concept and financing through design and construction to final delivery.', review: '' },
    { title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', category: 'Business', rating: 0, summary: "Carnegie's foundational guide to building rapport, winning people over, and handling others with tact — still a staple of business and self-help writing.", review: '' },
    { title: 'The Black Swan', author: 'Nassim Nicholas Taleb', category: 'Business', rating: 0, summary: 'Taleb examines how rare, hard-to-predict events shape history and markets far more than we like to admit, and how fragile our models are to them.', review: '' },
    { title: 'Broken Money', author: 'Lyn Alden', category: 'Business', rating: 0, summary: "A history of monetary systems arguing that today's money is fundamentally broken, tracing how currency evolved and what a sounder alternative might look like.", review: '' },
    { title: 'The Laws of Human Nature', author: 'Robert Greene', category: 'Business', rating: 0, summary: 'Greene draws on psychology and history to map the hidden drivers of human behavior — envy, narcissism, grandiosity — and how to work with them.', review: '' },
    { title: 'The 48 Laws of Power', author: 'Robert Greene', category: 'Business', rating: 0, summary: 'A compendium of historical strategies for acquiring, keeping, and defending power, illustrated through examples from military, political, and business history.', review: '' },
    { title: 'Pre-Suasion', author: 'Robert Cialdini', category: 'Business', rating: 0, summary: "Cialdini's follow-up to Influence focuses on the moment before a message lands — how to prime attention and context so people are already receptive.", review: '' },
    { title: 'The 4-Hour Workweek', author: 'Timothy Ferriss', category: 'Business', rating: 0, summary: "Ferriss's playbook for automating, outsourcing, and delegating work to escape the traditional 9-to-5 and design a more flexible, mobile lifestyle.", review: '' },
    { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', category: 'Business', rating: 0, summary: "A venture capitalist's unvarnished account of the hardest calls in building and running a startup, with fewer easy answers than most business books.", review: '' },
    { title: 'The Basic Laws of Human Stupidity', author: 'Carlo M. Cipolla', category: 'Business', rating: 0, summary: 'A tongue-in-cheek economic essay classifying human behavior into four types, arguing that stupid people — who harm others while gaining nothing themselves — are the most dangerous.', review: '' },
    { title: '101 Things I Learned in Architecture School', author: 'Matthew Frederick', category: 'Business', rating: 0, summary: 'A compact, illustrated collection of core design and architecture principles, from proportion and structure to how architects think about space.', review: '' },
    // $100M Series
    { title: '$100M Lost Chapters', author: 'Alex Hormozi', category: '$100M Series', rating: 5, summary: "Previously unreleased material from Hormozi's $100M series, covering additional tactics on offers, pricing, and business growth.", review: '' },
    { title: '$100M Offers: How To Make Offers So Good People Feel Stupid Saying No', author: 'Alex Hormozi', category: '$100M Series', rating: 5, summary: 'A framework for building offers so compelling that price becomes a non-issue, centered on value stacking and risk reversal.', review: '' },
    { title: '$100M Leads: How to Get Strangers To Want To Buy Your Stuff (Acquisition.com $100M Series)', author: 'Alex Hormozi', category: '$100M Series', rating: 5, summary: 'A tactical breakdown of the core methods for generating strangers who want to buy — warm outreach, cold outreach, content, and paid ads.', review: '' },
    { title: '$100M Money Models: How To Make Money', author: 'Alex Hormozi', category: '$100M Series', rating: 5, summary: "Hormozi's playbook for structuring how a business actually makes money — offer sequencing, upsells, and pricing models that compound revenue.", review: '' },
    // Philosophy / Classic
    { title: 'The Use of Knowledge in Society', author: 'Friedrich Hayek', category: 'Philosophy / Classic', rating: 3, summary: 'An essay on how prices coordinate the scattered, local knowledge held by individuals across an economy far better than any central planner could.', review: '' },
    { title: 'Atlas Shrugged', author: 'Ayn Rand', category: 'Philosophy / Classic', rating: 5, summary: "Rand's sprawling novel of a world where innovators and producers go on strike, dramatizing her philosophy of rational self-interest and individualism.", review: '' },
    { title: 'Pocket Guide to Capitalism', author: 'Richard Salsman', category: 'Philosophy / Classic', rating: 4, summary: 'A concise defense of free-market capitalism, tracing its philosophical and historical case against more interventionist economic systems.', review: '' },
    { title: 'Pocket Guide to Ayn Rand', author: 'Robert Tracinski', category: 'Philosophy / Classic', rating: 5, summary: "A short introduction to Ayn Rand's life, novels, and philosophy of Objectivism for readers new to her work.", review: '' },
    { title: 'Pocket Guide to Free Speech', author: 'Robert Tracinski', category: 'Philosophy / Classic', rating: 3, summary: 'A brief argument for free expression as a foundational right, and a look at the pressures it faces today.', review: '' },
    { title: 'Pocket Guide to Objectivism', author: 'David Kelley', category: 'Philosophy / Classic', rating: 4, summary: "An accessible overview of Ayn Rand's philosophical system — reason, individualism, and rational self-interest — distilled into its core tenets.", review: '' },
    { title: 'Politics and the English Language', author: 'George Orwell', category: 'Philosophy / Classic', rating: 4, summary: "Orwell's essay on how vague, dishonest language corrupts political thought, and his case for clear, precise writing as a form of intellectual honesty.", review: '' },
    { title: 'Dostoyevsky Short Stories', author: 'Fyodor Dostoevsky', category: 'Philosophy / Classic', rating: 5, summary: "A collection including 'The Beggar Boy at Christ's Christmas Tree,' 'The Dream of a Ridiculous Man,' and 'White Nights' — Dostoevsky's shorter meditations on suffering, redemption, and longing.", review: '' },
    { title: 'Letters from a Stoic', author: 'Seneca', category: 'Philosophy / Classic', rating: 4, summary: "A collection of Seneca's letters to a friend, offering Stoic guidance on mortality, wealth, friendship, and how to live well.", review: '' },
    { title: 'The Fable of the Dragon-Tyrant', author: 'Nick Bostrom', category: 'Philosophy / Classic', rating: 4, summary: 'An allegorical essay reframing aging and death as a monstrous, defeatable problem rather than an inevitability to be quietly accepted.', review: '' },
    { title: 'Meditations', author: 'Marcus Aurelius', category: 'Philosophy / Classic', rating: 0, summary: 'The private journal of a Roman emperor, working through Stoic philosophy as a practical guide to duty, discipline, and equanimity.', review: '' },
    { title: 'The Art of War', author: 'Sun Tzu', category: 'Philosophy / Classic', rating: 0, summary: 'An ancient military treatise on strategy, deception, and adaptability — widely applied today well beyond the battlefield, in business and competition.', review: '' },
    { title: 'The Obstacle Is the Way', author: 'Ryan Holiday', category: 'Philosophy / Classic', rating: 0, summary: 'A modern primer on Stoic philosophy arguing that obstacles themselves contain the fuel to overcome them, drawing on historical figures who turned adversity into advantage.', review: '' },
    { title: 'Bible', author: '', category: 'Philosophy / Classic', rating: 0, summary: 'The foundational text of Judeo-Christian tradition and one of the most influential works in Western history, literature, and moral thought.', review: '' },
    // Science
    { title: "Lifespan: Why We Age―and Why We Don't Have To", author: 'David Sinclair', category: 'Science', rating: 2, summary: "A longevity researcher's case that aging is a treatable disease rather than an inevitability, and a look at the science aiming to slow it.", review: '' },
    { title: 'A Crack in Creation: Gene Editing and the Unthinkable Power to Control Evolution', author: 'Jennifer A. Doudna', category: 'Science', rating: 2, summary: "CRISPR co-inventor Doudna's account of discovering gene-editing technology and grappling with its power to reshape evolution itself.", review: '' },
    { title: 'The Gene: An Intimate History', author: 'Siddhartha Mukherjee', category: 'Science', rating: 4, summary: "A sweeping history of genetics, from Mendel's pea plants to modern gene editing, woven together with the author's own family history of mental illness.", review: '' },
    { title: 'Outlive: The Science and Art of Longevity', author: 'Peter Attia', category: 'Science', rating: 0, summary: 'A framework for extending healthspan, not just lifespan, focused on preventing the chronic diseases that most commonly shorten life.', review: '' },
    { title: 'The Story of the Human Body: Evolution, Health, and Disease', author: 'Daniel E. Lieberman', category: 'Science', rating: 0, summary: 'An evolutionary biologist traces how the human body evolved for a very different environment than the one we live in now, and what that mismatch costs us.', review: '' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Science', rating: 0, summary: 'Nobel laureate Kahneman\'s landmark account of the two systems that drive human thought — fast, intuitive judgment and slow, deliberate reasoning — and the biases that follow.', review: '' },
    // Memoir / Biography
    { title: 'Far Beyond Gold: Running from Fear to Faith', author: 'Sydney McLaughlin', category: 'Memoir / Biography', rating: 5, summary: 'Olympic hurdler Sydney McLaughlin-Levrone\'s memoir on faith, fear, and the mental discipline behind her record-breaking career.', review: '' },
    { title: 'The Face Laughs While the Brain Cries: The Education of a Doctor', author: 'Stephen L. Hauser', category: 'Memoir / Biography', rating: 5, summary: "A neurologist's memoir on his career studying multiple sclerosis and the broader education of a doctor confronting disease he couldn't yet cure.", review: '' },
    { title: 'The Choice: Embrace the Possible', author: 'Edith Eger', category: 'Memoir / Biography', rating: 5, summary: 'A Holocaust survivor and psychologist\'s memoir on how she found freedom from trauma by choosing how to respond to what happened to her.', review: '' },
    { title: "Man's Search for Meaning", author: 'Viktor E. Frankl', category: 'Memoir / Biography', rating: 3, summary: "A psychiatrist's account of surviving Nazi concentration camps, and the theory of finding meaning through suffering that grew out of it.", review: '' },
    { title: 'Team of Rivals: The Political Genius of Abraham Lincoln', author: 'Doris Kearns Goodwin', category: 'Memoir / Biography', rating: 0, summary: "Goodwin's account of how Lincoln filled his cabinet with former rivals and political opponents, and led them through the Civil War.", review: '' },
    { title: 'Catherine the Great: Portrait of a Woman', author: 'Robert K. Massie', category: 'Memoir / Biography', rating: 0, summary: 'A biography of the German-born princess who seized the Russian throne and ruled as one of its most consequential monarchs.', review: '' },
    { title: 'The Wright Brothers', author: 'David McCullough', category: 'Memoir / Biography', rating: 0, summary: 'McCullough\'s account of the two self-taught bicycle mechanics who solved powered flight through relentless, methodical experimentation.', review: '' },
    { title: '41: A Portrait of My Father', author: 'George W. Bush', category: 'Memoir / Biography', rating: 0, summary: 'George W. Bush\'s memoir of his father, President George H.W. Bush, told through personal letters, photos, and reflections on his life and legacy.', review: '' },
    // Self-Help / Personal Development
    { title: "Fast Like a Girl: A Woman's Guide to Using the Healing Power of Fasting to Burn Fat, Boost Energy, and Balance Hormones", author: 'Mindy Pelz', category: 'Self-Help / Personal Development', rating: 5, summary: 'A guide to fasting protocols tailored to female hormonal cycles, aimed at fat loss, energy, and hormone balance.', review: '' },
    { title: 'Relentless: From Good to Great to Unstoppable (Tim Grover Winning Series)', author: 'Tim S. Grover', category: 'Self-Help / Personal Development', rating: 3, summary: "Michael Jordan and Kobe Bryant's trainer breaks down the mindset separating merely good performers from the relentlessly driven.", review: '' },
    { title: 'The Creative Act: A Way of Being', author: 'Rick Rubin', category: 'Self-Help / Personal Development', rating: 4, summary: "Legendary producer Rick Rubin's meditation on creativity as a practice of attention and openness, applicable well beyond music.", review: '' },
    { title: 'The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness', author: 'Morgan Housel', category: 'Self-Help / Personal Development', rating: 5, summary: 'Housel argues that financial success has less to do with what you know and more with how you behave — covering greed, risk, and long-term thinking.', review: '' },
    { title: 'Good Energy: The Surprising Connection Between Metabolism and Limitless Health', author: 'Casey Means', category: 'Self-Help / Personal Development', rating: 5, summary: "A physician's case that metabolic health — not just individual diseases — is the root cause behind most chronic illness, and how to protect it.", review: '' },
    { title: 'The Pivot Year', author: 'Brianna Wiest', category: 'Self-Help / Personal Development', rating: 3, summary: 'A week-by-week collection of reflective prompts and essays for navigating a year of personal change and transition.', review: '' },
    // Fiction / Short Stories
    { title: 'Anthem', author: 'Ayn Rand', category: 'Fiction / Short Stories', rating: 5, summary: "A dystopian novella imagining a collectivist future where the word 'I' has been erased, and one man rediscovers individuality.", review: '' },
    { title: 'Hamlet', author: 'William Shakespeare', category: 'Fiction / Short Stories', rating: 3, summary: "Shakespeare's tragedy of the Danish prince torn between grief, revenge, and doubt after his father's murder.", review: '' },
    { title: 'The Fault in Our Stars', author: 'John Green', category: 'Fiction / Short Stories', rating: 4, summary: 'A love story between two teenagers navigating cancer, mortality, and what it means to leave a mark in a short life.', review: '' },
    { title: 'The Hobbit, or There and Back Again', author: 'J.R.R. Tolkien', category: 'Fiction / Short Stories', rating: 5, summary: 'Bilbo Baggins is swept from his quiet hobbit-hole into a quest to reclaim a dwarven kingdom from a dragon.', review: '' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Fiction / Short Stories', rating: 3, summary: "Austen's comedy of manners follows Elizabeth Bennet and Mr. Darcy as first impressions give way to a more honest reckoning with pride and prejudice.", review: '' },
    { title: 'The Boy in the Striped Pajamas', author: 'John Boyne', category: 'Fiction / Short Stories', rating: 5, summary: 'A young German boy befriends a Jewish boy on the other side of a concentration camp fence, unaware of what that fence really means.', review: '' },
    { title: 'Other People', author: 'Neil Gaiman', category: 'Fiction / Short Stories', rating: 3, summary: 'A brief, unsettling short story from Gaiman on guilt, punishment, and the nature of hell.', review: '' },
    { title: 'The Fountainhead', author: 'Ayn Rand', category: 'Fiction / Short Stories', rating: 0, summary: 'Rand\'s novel of an uncompromising architect, Howard Roark, who refuses to sacrifice his creative vision to convention or public opinion.', review: '' },
    { title: 'The Importance of Being Earnest', author: 'Oscar Wilde', category: 'Fiction / Short Stories', rating: 0, summary: "Wilde's comedy of mistaken identities and double lives, skewering the manners and hypocrisies of Victorian high society.", review: '' },
];

function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const searchLower = searchTerm.toLowerCase();
      return (
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.category.toLowerCase().includes(searchLower)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, sortBy]);

  const renderStars = (rating) => {
    if (!rating) {
      return <span className="not-rated">Not yet rated</span>;
    }
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 === 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Format rounded rating to show .0 or .5 (always one decimal place)
    const displayRating = roundedRating.toFixed(1);

    return (
      <span className="rating-container">
        <span className="stars-container">
          <span style={{ color: '#FFD700' }}>{'★'.repeat(fullStars)}</span>
          {hasHalfStar && <span className="half-star">★</span>}
          {emptyStars > 0 && <span style={{ color: '#ddd' }}>{'★'.repeat(emptyStars)}</span>}
        </span>
        <span className="rating-number">({displayRating})</span>
      </span>
    );
  };

  return (
    <div className="bookshelf-outer">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Bookshelf</h1>
            <p className="project-detail-subtitle">My growing library :D</p>
          </div>
        </header>

        <div className="main-section project-detail-section">
          <div className="bookshelf-controls">
          <input
            type="text"
            className="bookshelf-search"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="bookshelf-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
            <option value="category">Sort by Category</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        <table className="bookshelf-table">
          <thead>
            <tr>
              <th>BOOK</th>
              <th>AUTHOR</th>
              <th>CATEGORY</th>
              <th>RATING</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBooks.map((book, index) => (
              <tr key={index} className="book-row" onClick={() => setSelectedBook(book)}>
                <td className="book-title-cell">{book.title}</td>
                <td className="book-author-cell">{book.author}</td>
                <td className="book-category-cell">{book.category}</td>
                <td className="book-rating-cell">{renderStars(book.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default Books;
