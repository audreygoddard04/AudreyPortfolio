import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetail.css';
import '../pages/Health.css';

function ProjectDetail() {
  const { projectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Start at top of page when component mounts or projectId changes (no scroll animation)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [projectId]);

  const faqs = [
    { question: 'Light-headed?', answer: 'Could be low iron, dehydration, or low blood sugar.', more: 'Eat iron-rich foods like spinach or red meat, hydrate well, and pair iron with vitamin C (like oranges or peppers). If symptoms persist, consult a doctor.' },
    { question: 'Need more vitamin D?', answer: 'Take it with healthy fats to help absorption.', more: 'Good options: avocado, salmon, eggs. Bonus: take with magnesium for better uptake.' },
    { question: 'What\'s a calorie deficit?', answer: 'You\'re eating fewer calories than your body burns.', more: 'This forces your body to use stored fat for energy. A 250–500 calorie daily deficit is ideal for safe, sustainable fat loss.' },
    { question: 'What should my calorie deficit be?', answer: 'Subtract 10–20% from your Total Daily Energy Expenditure (TDEE).', more: 'Estimate TDEE (see TDEE Calculator), then reduce slightly. Avoid drastic deficits to protect muscle and energy.' },
    { question: 'What is Total Daily Energy Expenditure (TDEE) and how do I calculate it?', answer: 'It\'s how many calories you burn per day.', more: 'Try the TDEE Calculator on the Health page! TDEE = BMR × Activity Factor.' },
    { question: 'How fast should I lose weight?', answer: 'Aim for 0.5–1 lb per week.', more: 'Faster = risk of muscle loss, fatigue, and rebound. Slow = sustainable.' },
    { question: 'How much protein should I eat?', answer: 'About 1g of protein per pound of body weight daily.', more: 'Protein helps you preserve muscle, stay full, and recover. Split it across all meals.' },
    { question: 'Can I lose fat and gain muscle at the same time?', answer: 'Yes, but slowly — especially if you\'re new to training.', more: 'Eat at a slight deficit with high protein, strength train 3–5x/week, and sleep well.' }
  ];

  // Project data - in a real app, this would come from an API or database
  const projects = {
    'fitness': {
      title: 'Fitness & Health',
      subtitle: 'Health Practices & Wellness',
      year: '2025',
      status: 'Ongoing'
    },
    'rhamm-breast-cancer': {
      title: 'Characterizing Nuclear, Epigenetic, & Mitochondrial Heterogeneity in RHAMM-Deficient Breast Cancer Lung Metastases Using PacBio Long-Read Sequencing',
      subtitle: 'Audrey Anna Goddard, 2025\nSupervisor: Dr. Kathleen Hill\nAdvisors: Dr. Anthony Percival-Smith & Dr. Robert Cumming\nMentor: Joseph Butler',
      year: '2025',
      overview: `This project investigates how RHAMM affects tumor heterogeneity in breast cancer lung metastases, focusing on nuclear, epigenetic, and mitochondrial variation using cutting-edge PacBio long-read sequencing in the MMTV-PyMT mouse model.`,
      abstract: [
        `Breast cancer remains one of the most aggressive and prevalent malignancies, with poor patient prognosis often driven by metastasis. A key protein upregulated in breast cancer is The Receptor for Hyaluronan-Mediated Motility (RHAMM). This protein is a multifunctional protein implicated in mitotic regulation, genomic integrity, progenitor cell pluripotency, oncogenic pathway activation, and tumor survival. Despite RHAMM’s established association with cancer progression, the precise mechanisms by which RHAMM influences metastatic properties of tumors and tumor homogeneity remain poorly understood. To investigate RHAMM’s role in metastatic progression, the MMTV-PyMT mouse model has been used to evaluate the effects of Rhamm deletion (Rhamm-/-) on primary mammary epithelium tumors and lung tissue metastases. Absence of Rhamm was associated with reduced genetic heterogeneity. By leveraging emerging next generation sequencing technologies such as PacBio long-read sequencing, reduced genetic heterogeneity will be quantified genome wide. Single nucleotide mutations and structural variants will be characterized in lung metastases with and without the presence of Rhamm. Through this analysis, the expected findings will likely support the hypothesis that RHAMM(+) promotes metastatic heterogeneity and genomic instability, while RHAMM(-) results in genetic homogeneity and clonal expansion of mutant cell populations of a particular genotype. These findings could be leveraged to enhance therapeutic responsiveness in RHAMM(-) homogeneous tumors.`
      ],
      background: `RHAMM (HMMR) is a multifunctional protein integral to mitosis, genomic integrity, and oncogenic signaling. Its dynamic localization to centrosomes and microtubules influences chromosomal segregation during mitosis and cell signaling pathways that regulate proliferation, immune response, and DNA damage. Aberrant RHAMM disrupts these networks, contributing to tumor progression, metastasis, and increasing heterogeneity. Capturing nuclear, epigenetic, and mitochondrial variation with high-fidelity, long-read sequencing allows new insight into how RHAMM shapes cancer evolution and therapeutic resistance. The MMTV-PyMT mouse recapitulates key features of human luminal B mammary tumors and spontaneous lung metastasis, serving as a robust preclinical platform for these studies.`,
      researchQuestion: `Does RHAMM expression alter nuclear, epigenetic, and mitochondrial heterogeneity in MMTV-PyMT lung metastases?`,
      hypothesis: `RHAMM expression promotes diversity in the tumor genome and epigenome; deletion of Rhamm results in clonal homogeneity dominated by genotypes adapted to lung metastasis.`,
      aims: [
        'Aim 1: Scoping review of RHAMM’s impact on genetic heterogeneity in cancer; optimization of DNA extraction and sequencing protocols.',
        'Aim 2: Quantify genome-wide nuclear variation (SNV/SV burden, mutation spectra, signatures) between Rhamm+/+ and Rhamm-/- metastases.',
        'Aim 3: Assemble and characterize mitochondrial genomes, heteroplasmy levels, and their associations with nuclear/epigenetic changes.',
        'Aim 4: Infer and quantify DNA methylation heterogeneity; integrate data for clonal architecture and diversity comparison.'
      ],
      experimentalDesign: `Cohorts: MMTV-PyMT; Rhamm+/+ (wild-type) and MMTV-PyMT; Rhamm-/- (knockout), 3-4 biological replicates per group (pending tissue). Collect lung metastases for high-resolution analysis. Stage 2 (if resourced): analyze primary tumors.`,
      methods: [
        'Homogenize lung tissue; extract high-molecular-weight (HMW) DNA using Nanobind kit.',
        'Quantify yield/purity (NanoDrop, Qubit); verify integrity (gel electrophoresis; SYBRGreen).',
        'Ship samples for PacBio HiFi sequencing (Sequel IIe/Revio; ~13–15 kb HiFi reads).',
        'Align reads (pbmm2/minimap2); call SNVs/indels (DeepVariant, TRGT); SVs, CNVs (pbsv, HiFiCNV); methylation (SMRT Link); mtDNA assembly/heteroplasmy analysis.',
        'Reconstruct clonal haplotypes (WhatsHap, HapCUT2); annotate variants (slivar, svpack); validate findings (PCR, ddPCR).',
        'Perform mutational signature analysis (COSMIC framework); visualize data (rainfall, spectra); statistical testing (Fisher’s exact, permutation/J-statistics).'
      ],
      timeline: [
        'Oct 2025: Proposal approval, procurement.',
        'Nov–Dec 2025: Pilot DNA extraction, sample prep.',
        'Dec 2025: Full extraction, shipment to sequencing center.',
        'Jan 2026: Bioinformatics testing/validation using public/simulated data.',
        'Feb–Mar 2026: Sequencing, data receipt, primary analysis.',
        'Mar–Apr 2026: Thesis writing, final submission.'
      ],
      impact: `Anticipate Rhamm+/+ metastases will display greater diversity in genetic and mitochondrial domains with complex subclonal hierarchies. Rhamm-/- expected to lead to homogeneity and dominance of a few clones adapted to lung environment, clarifying how RHAMM shapes evolution, treatment resistance, and may reveal new therapeutic vulnerabilities. This study will also establish validated PacBio HiFi pipelines for multi-omic tumor profiling.`,
      references: `See full thesis proposal and Nature Genetics-style citations for details (available on request).`,
      status: 'In Progress'
    }
  };

  // Check for specific project IDs that don't need the projects object first
  if (projectId === 'athletics') {
    return (
      <div className="project-detail-bg">
        <div className="project-detail-container">
          <Link to="/projects" className="back-link">Back to Projects</Link>
          <header className="project-detail-header">
            <div className="project-detail-title-section">
              <h1>Athletics</h1>
              <p className="project-detail-subtitle">Track & Field and Volleyball</p>
              <div className="project-detail-meta">
                <span className="project-year-badge">2025</span>
              </div>
            </div>
          </header>

          <section className="project-detail-section">
            <h2>Varsity Track & Field Athlete – Western University</h2>
            <p style={{ color: '#2e5d34', fontSize: '1rem', marginBottom: '20px', fontStyle: 'italic' }}>2022–Present</p>
            <ul className="research-areas-list">
              <li>Compete in pentathlon; top OUA results</li>
              <li>20+ hrs/week of training and competition</li>
              <li>Mentor for younger athletes; organize off-season training</li>
            </ul>
          </section>

          <section className="project-detail-section">
            <h2>Team Ontario Volleyball – Canada Summer Games</h2>
            <p style={{ color: '#2e5d34', fontSize: '1rem', marginBottom: '20px', fontStyle: 'italic' }}>2022</p>
            <ul className="research-areas-list">
              <li>Represented Ontario at national multi-sport games</li>
              <li>Developed high-level teamwork and resilience under pressure</li>
            </ul>
          </section>
        </div>
      </div>
    );
  }

  if (projectId === 'rhamm-breast-cancer') {
    return (
      <div className="project-detail-bg">
        <div className="project-detail-container">
          <Link to="/projects" className="back-link">Back to Projects</Link>
          <div className="project-not-found" style={{ padding: '80px 20px', textAlign: 'center' }}>
            <h1 style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: '#183820', fontSize: '2.5rem', marginBottom: '16px' }}>
              Coming Soon
            </h1>
            <p style={{ color: '#183820', fontSize: '1.2rem', marginBottom: '32px' }}>
              This thesis proposal is not yet publicly available. Please check back later for updates.
            </p>
            <Link to="/projects" className="back-link">Back to Projects</Link>
          </div>
        </div>
      </div>
    );
  }

  const project = projects[projectId];

  if (!project) {
    return (
      <div className="project-detail-bg">
        <div className="project-not-found">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="back-link">Back to Projects</Link>
        </div>
      </div>
    );
  }

  // Helper function to check if content matches search term
  const matchesSearch = (text) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return text.toLowerCase().includes(searchLower);
  };

  // Render fitness/health content
  if (projectId === 'fitness') {
    return (
      <div className="project-detail-bg health-bg">
        <div className="project-detail-container">
          <Link to="/projects" className="back-link">Back to Projects</Link>
          
          <header className="project-detail-header">
            <div className="project-detail-title-section">
              <h1>{project.title}</h1>
              <p className="project-detail-subtitle">{project.subtitle}</p>
              <div className="project-detail-meta">
                <span className="project-year-badge">{project.year}</span>
              </div>
            </div>
          </header>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for sections, vitamins, fasting types, FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Fitness Section - Redesigned */}
          <section id="fitness" className={`main-section project-detail-section ${!matchesSearch('Fitness Non-Negotiables Lifting Exercises Cardio') ? 'search-hidden' : ''}`}>
            <h2>Fitness</h2>
            <p className="section-intro">Little tidbits about the health practices I like most. For more detailed information, stay tuned for my dedicated health coaching website.</p>
            
            <div className="fitness-grid">
              <div className="fitness-card">
                <h3>Non-Negotiables</h3>
                <ul className="fitness-list">
                  <li>Consistency is key</li>
                  <li>10k steps per day</li>
                  <li>1 hour of movement per day</li>
                  <li>2 weight training sessions per week</li>
                  <li>Mix it up: Combine strength, cardio, and flexibility</li>
                  <li>Track your progress: Keep a workout journal or download my app (Coming Soon)</li>
                  <li>Rest and recovery: Allow time for your body to heal</li>
                  <li>Listen to your body: Adjust intensity as needed</li>
                </ul>
              </div>

              <div className="fitness-card">
                <h3>Lifting Exercises</h3>
                <div className="exercise-group">
                  <div className="exercise-category">
                    <h4>Legs</h4>
                    <p>Squats, Lunges, Romanian Deadlifts, Leg Press, Calf Raises</p>
                  </div>
                  <div className="exercise-category">
                    <h4>Arms</h4>
                    <p>Bicep Curls, Tricep Dips, Hammer Curls, Tricep Pushdowns</p>
                  </div>
                  <div className="exercise-category">
                    <h4>Back</h4>
                    <p>Pull-Ups, Bent Over Rows, Lat Pulldowns, Deadlifts</p>
                  </div>
                  <div className="exercise-category">
                    <h4>Chest</h4>
                    <p>Bench Press, Push-Ups, Chest Flyes, Incline Dumbbell Press</p>
                  </div>
                </div>
              </div>

              <div className="fitness-card">
                <h3>Cardio Options</h3>
                <ul className="fitness-list">
                  <li>Stair Master</li>
                  <li>Elliptical</li>
                  <li>Treadmill</li>
                  <li>Jump Rope</li>
                  <li>Swimming</li>
                  <li>Running (intervals or steady-state)</li>
                  <li>Cycling</li>
                  <li>Rowing</li>
                  <li>HIIT Circuits</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Nutrition Section - Redesigned */}
          <section id="nutrition" className={`main-section project-detail-section ${!matchesSearch('Nutrition Hacks Craving Control Smart Eating Habits Macronutrient') ? 'search-hidden' : ''}`}>
            <h2>Nutrition</h2>
            
            <div className="nutrition-hacks-container">
              <h3>Nutrition Hacks</h3>
              <div className="hacks-grid">
                <div className="hack-card">
                  <h4>Craving Control</h4>
                  <ul>
                    <li>Craving salty? You might be dehydrated. Drink water first.</li>
                    <li>Craving sugar? Eat protein to stabilize blood sugar.</li>
                    <li>Nighttime hunger? Test with a healthy snack. If you won't eat it, you're not truly hungry.</li>
                    <li>Boiled egg test: "Would I eat a boiled egg right now?" If not, you're likely just bored or stressed.</li>
                    <li>Avoid artificial sweeteners if they trigger cravings.</li>
                    <li>Brush your teeth after dinner to signal the end of eating.</li>
                  </ul>
                </div>

                <div className="hack-card">
                  <h4>Smart Eating Habits</h4>
                  <ul>
                    <li>Eat slowly and mindfully—it takes ~20 minutes for satiety hormones to work.</li>
                    <li>Use smaller plates to naturally control portion size.</li>
                    <li>Don't drink your calories—liquid calories don't trigger fullness the same way.</li>
                    <li>Say no at the store—avoiding junk at purchase is easier than resisting daily.</li>
                    <li>Keep tempting foods out of sight—out of sight = out of mind.</li>
                    <li>Always plate your snacks—eating from the bag encourages overeating.</li>
                  </ul>
                </div>

                <div className="hack-card">
                  <h4>Macronutrient Strategies</h4>
                  <ul>
                    <li>Eat 1g of protein per lb of body weight per day (especially if training).</li>
                    <li>Front-load protein early in the day to reduce cravings later.</li>
                    <li>Pair carbs with protein or fat to blunt blood sugar spikes.</li>
                    <li>Limit refined sugars to stabilize mood and energy.</li>
                    <li>Limit simple carbs—especially ultra-processed, low-fiber versions.</li>
                    <li>Aim for fiber with every meal for gut health and satiety.</li>
                    <li>Prioritize whole foods over macros—quality matters more.</li>
                  </ul>
                </div>

                <div className="hack-card">
                  <h4>Meal Planning & Timing</h4>
                  <ul>
                    <li>Meal prep weekly to avoid decision fatigue.</li>
                    <li>Don't skip meals—leads to blood sugar crashes and binge eating.</li>
                    <li>Eat within 60–90 minutes of waking up to jump-start metabolism.</li>
                    <li>Try time-restricted eating (e.g. 8–12 hr eating window) if it fits your schedule.</li>
                    <li>Prep high-protein snacks ahead of time (hard-boiled eggs, Greek yogurt, cottage cheese, trail mix).</li>
                  </ul>
                </div>

                <div className="hack-card">
                  <h4>Psychology & Behavior</h4>
                  <ul>
                    <li>Don't moralize food—one indulgence doesn't "ruin" your day.</li>
                    <li>Use "if/then" planning: If I crave sweets, then I'll go for a walk or drink water.</li>
                    <li>Associate healthy food with a reward (nice music, presentation, enjoyable environment).</li>
                    <li>Avoid all-or-nothing thinking—aim for consistency, not perfection.</li>
                    <li>Change your identity first: Think "I'm a healthy person" rather than "I'm trying to be healthy."</li>
                  </ul>
                </div>

                <div className="hack-card">
                  <h4>Gut & Digestion</h4>
                  <ul>
                    <li>Chew your food thoroughly to aid digestion and prevent bloating.</li>
                    <li>Eat fermented foods (yogurt, kimchi, sauerkraut) to support gut bacteria.</li>
                    <li>Stay hydrated throughout the day—water supports digestion and hunger regulation.</li>
                    <li>Avoid lying down after eating to prevent acid reflux.</li>
                    <li>Start meals with greens or vinegar-based foods to help with glycemic control.</li>
                  </ul>
                </div>

                <div className="hack-card">
                  <h4>Sleep, Stress & Hormones</h4>
                  <ul>
                    <li>Sleep at least 7–8 hours—poor sleep increases ghrelin (hunger hormone) and cravings.</li>
                    <li>Manage stress proactively—chronic stress elevates cortisol, which increases fat storage.</li>
                    <li>Caffeine curfew—cut off caffeine ~6–8 hours before bed to protect sleep quality.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={`fasting-container ${!matchesSearch('Fasting Intermittent Autophagy Gut-Reset Fat-Burner Dopamine-Reset Immune-Reset') ? 'search-hidden' : ''}`}>
              <h3>Fasting Protocols</h3>
              <div className="fasting-grid">
                <div className="fasting-card">
                  <h4 className="fasting-title">Intermittent Fasting</h4>
                  <div className="fasting-content">
                    <p><strong>Duration:</strong> 12-16 hours</p>
                    <p><strong>Benefits:</strong> Helps you lose weight, decreases brain fog, increases energy</p>
                  </div>
                </div>
                
                <div className="fasting-card">
                  <h4 className="fasting-title">Autophagy Fasting</h4>
                  <div className="fasting-content">
                    <p><strong>Duration:</strong> 17-72 hours</p>
                    <p><strong>Benefits:</strong> Helps detox, improve brain function and cognition, prevents colds, and balances sex hormones</p>
                  </div>
                </div>
                
                <div className="fasting-card">
                  <h4 className="fasting-title">Gut-Reset Fasting</h4>
                  <div className="fasting-content">
                    <p><strong>Duration:</strong> 24+ hours</p>
                    <p><strong>Benefits:</strong> Helps counteract antibiotic use, offsets birth control use, helps tackle SIBO</p>
                  </div>
                </div>
                
                <div className="fasting-card">
                  <h4 className="fasting-title">Fat-Burner Fasting</h4>
                  <div className="fasting-content">
                    <p><strong>Duration:</strong> 36+ hours</p>
                    <p><strong>Benefits:</strong> Helps minimize weight-loss resistance, releases stored sugar, reduces cholesterol</p>
                  </div>
                </div>
                
                <div className="fasting-card">
                  <h4 className="fasting-title">Dopamine-Reset Fasting</h4>
                  <div className="fasting-content">
                    <p><strong>Duration:</strong> 48+ hours</p>
                    <p><strong>Benefits:</strong> Helps reboot dopamine levels, and lower anxiety levels</p>
                  </div>
                </div>
                
                <div className="fasting-card">
                  <h4 className="fasting-title">Immune-Reset Fasting</h4>
                  <div className="fasting-content">
                    <p><strong>Duration:</strong> 72+ hours</p>
                    <p><strong>Benefits:</strong> Helps ease chronic conditions, prevent chronic disease, alleviate pain and stiffness, and slow down the effects of aging</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`dietary-guidelines-container ${!matchesSearch('Dietary Guidelines 5 In 3 Out Omega Probiotics Fiber Protein') ? 'search-hidden' : ''}`}>
              <h3>Dietary Guidelines</h3>
              <div className="dietary-guidelines">
                <div className="guidelines-column">
                  <h4>5 In</h4>
                  <ul className="guidelines-list">
                    <li><strong>Omega 3 Fats:</strong> Minimum 2 grams per day</li>
                    <li><strong>Probiotics:</strong> Three or more servings per day</li>
                    <li><strong>Micronutrients/Antioxidants:</strong> Through colorful plant diversity and spices</li>
                    <li><strong>Fiber:</strong> Over 50 grams per day</li>
                    <li><strong>Protein:</strong> At least 30 grams of whole food protein per meal</li>
                  </ul>
                </div>
                <div className="guidelines-column">
                  <h4>3 Out</h4>
                  <ul className="guidelines-list avoid">
                    <li>Refined or "added" sugars of any kind</li>
                    <li>Refined grains of any kind</li>
                    <li>Refined industrial vegetable or seed oils</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Vitamins Section */}
          <section className={`main-section project-detail-section ${!matchesSearch('Vitamins Supplements B1 B2 B3 B6 Biotin Folic Acid B12 A C D E K Antioxidants') ? 'search-hidden' : ''}`}>
            <h2>Vitamins & Supplements</h2>
            <div className="vitamins-grid">
              {[
                { title: 'B1 (Thiamine)', function: 'Important for carbohydrate metabolism', note: 'Body doesn\'t store the vitamin • TPP', sources: 'Sources: liver, spinach, green peas, navy and pinto beans, whole grain cereals, legumes' },
                { title: 'B2 (Riboflavin)', function: 'Essential for FMN and FAD (coenzymes for redox reactions)', sources: 'Sources: soybeans, liver, milk, cheese, green leafy vegetables' },
                { title: 'B3 (Niacin)', function: 'Part of coenzyme essential to form NAD+ and NADP+', note: 'Catalyzes redox reactions • Body can synthesize (but isn\'t efficient)', sources: 'Sources: meats, veggies, milk, cheese, and grains' },
                { title: 'B6 (Pyridoxine)', function: 'Coenzyme that interconverts A-keto acids into amino acids', note: 'Too much leads to irreversible nerve damage', sources: 'Sources: avocado, chicken, fish, nuts, liver, bananas' },
                { title: 'Biotin', function: 'Carbon transporter in lipid and carbohydrate metabolism', note: 'Bacteria in intestinal tract synthesizes it' },
                { title: 'Folic Acid', function: 'Also produced by intestinal tract', sources: 'Sources: leafy greens, dried beans, and liver' },
                { title: 'B12', function: 'Must obtain by food', sources: 'Sources: meat, eggs, milk, cereal' },
                { title: 'Vitamin A', function: 'Antioxidant • Important for vision and development of epithelial cells', sources: 'Sources: carrots' },
                { title: 'Vitamin C (Ascorbic Acid)', function: 'Helps prevent oxidant damage • Helps keep iron in the 2+ state', note: 'Helps convert proline to hydroxyproline in collagen (stabilizes it) • Citrus vitamin • Antioxidant' },
                { title: 'Vitamin D (Sunshine)', function: 'Helps body absorb calcium and phosphorus' },
                { title: 'Vitamin E', function: 'Antioxidant', sources: 'Sources: vegetable oils, nuts, whole grains, leafy greens' },
                { title: 'Vitamin K', function: 'Helps blood clots', sources: 'Sources: leafy greens, cauliflower, broccoli, organ meats, milk, soybeans, avocados, bananas' },
                { title: 'Antioxidants', function: 'Help prevent oxidant damage and protect cells', sources: 'Sources: Vitamin E, C, selenium, dark chocolate (>90%), pecans, blueberries, strawberries, raspberries, goji berries, kale' }
              ].filter(vitamin => matchesSearch(vitamin.title + ' ' + vitamin.function + (vitamin.note ? ' ' + vitamin.note : '') + (vitamin.sources ? ' ' + vitamin.sources : ''))).map((vitamin, idx) => (
                <div key={idx} className="vitamin-card">
                  <span className="vitamin-title">{vitamin.title}</span>
                  <span className="vitamin-function">{vitamin.function}</span>
                  {vitamin.note && <span className="vitamin-note">{vitamin.note}</span>}
                  {vitamin.sources && <span className="vitamin-sources">{vitamin.sources}</span>}
                </div>
              ))}
            </div>
          </section>

          <section className={`main-section project-detail-section faq-main-section ${!matchesSearch('FAQ Light-headed vitamin D calorie deficit protein weight muscle') ? 'search-hidden' : ''}`}>
            <h2>FAQs</h2>
            <div className="faq-grid">
              {faqs.filter(faq => matchesSearch(faq.question + ' ' + faq.answer + ' ' + faq.more)).map((faq, idx) => (
                <div key={idx} className="faq-card">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                  <p className="faq-detail">{faq.more}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="recipes" className={`main-section project-detail-section ${!matchesSearch('Recipes') ? 'search-hidden' : ''}`}>
            <h2>Recipes</h2>
            <p>Delicious and healthy recipes coming soon!</p>
          </section>
        </div>
      </div>
    );
  }

  // Fallback for any other project IDs
  return (
    <div className="project-detail-bg">
      <div className="project-not-found">
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/projects" className="back-link">Back to Projects</Link>
      </div>
    </div>
  );
}

export default ProjectDetail;

