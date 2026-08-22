import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './ProjectDetail.css';
import '../pages/Health.css';
import './Thesis.css';
import fitnessImg1 from '../images/Screenshot-2025-11-06-at-4.42.19-PM.png';
import fitnessImg2 from '../images/IMG_9299.JPG';
import fitnessImg3 from '../images/IMG_7427.jpg';
import fitnessImg4 from '../images/IMG_3562.jpg';
import fitnessImg5 from '../images/52163810-EFF1-4012-A146-3B56C5FD5862.jpg';
import fitnessImg6 from '../images/081822_BradDemers031.JPG';
import fitnessImg7 from '../images/081522_AshleyBustonWhite034.JPG';
import fitnessImg8 from '../images/081522_AshleyBustonWhite020.JPG';
import fitnessImg9 from '../images/5D53BECC-FAF0-446A-A6C4-BD43F2593935_1_105_c.jpeg';

function ProjectDetail() {
  const { projectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [pipelineOpen, setPipelineOpen] = useState(false);

  // Start at top of page when component mounts or projectId changes (no scroll animation)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [projectId]);

  // Project data - in a real app, this would come from an API or database
  const projects = {
    'fitness': {
      title: 'Fitness',
      subtitle: 'Evidence-based fitness routines and training',
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

  // Redirect /projects/athletics to /fitness (athletics merged into fitness)
  if (projectId === 'athletics') {
    return <Navigate to="/fitness" replace />;
  }

  const thesisFindings = [
    { stat: '15x', label: 'More Cohort-Shared Variants', detail: 'RHAMM-deficient mice had 4,078 cohort-exclusive shared variants vs. 269 in wild-type controls (p < 2.2 x 10^-16)' },
    { stat: '82%', label: 'High VAF in KO Variants', detail: 'Mean variant allele frequency of 0.939 in RHAMM-deficient variants, consistent with clonal dominance across all four knockout animals' },
    { stat: '1.6x', label: 'Higher Mutation Burden in KO', detail: 'Mean 23,159 variants per sample in KO vs. 14,349 in WT (p = 0.002), yet KO showed markedly less inter-animal variability' },
    { stat: '48x', label: 'Mean Genome Coverage', detail: 'PacBio HiFi sequencing at mean Q23.2 across 8 samples, exceeding the 25-40x target and enabling high-confidence variant calling' },
  ];

  const thesisPipeline = [
    { step: '1', label: 'Low VAF Filtering', desc: 'Removed variants with VAF < 0.30 to eliminate sequencing noise' },
    { step: '2', label: 'C57BL/6 Background', desc: 'Subtracted inherited C57BL/6 germline polymorphisms using bcftools isec' },
    { step: '3', label: 'FVB/N Background', desc: 'Removed FVB/N strain-specific SNPs by subtracting a remapped FVB reference VCF' },
    { step: '4', label: 'Quality Filtering', desc: 'QUAL >= 50, GQ >= 30, DP >= 30, AD[ALT] >= 5 to retain only high-confidence calls' },
    { step: '5', label: 'Cohort Comparison', desc: 'Merged within cohorts; bcftools isec identified variants exclusive to all 4 KO or all 4 WT mice' },
  ];

  const thesisTools = [
    'PacBio HiFi', 'DeepVariant', 'HiPhase', 'pbmm2', 'bcftools',
    'samtools', 'mosdepth', 'SnpEff', 'DAVID', 'ClusterProfiler', 'R v4.5.0', 'Linux / CLI',
  ];

  // Check for specific project IDs that don't need the projects object first
  if (projectId === 'rhamm-breast-cancer') {
    return (
      <div className="thesis-bg">
        <div className="thesis-container">
          <Link to="/projects" className="back-link">Back to Projects</Link>

          {/* Hero */}
          <header className="thesis-hero">
            <p className="thesis-eyebrow">Honours Thesis · Biology 4999E · University of Western Ontario · April 2026</p>
            <h1>Long-Read Sequencing Reveals Reduced Genomic Heterogeneity in RHAMM-Deficient Metastases</h1>
            <p className="thesis-tagline">
              PacBio HiFi whole-genome sequencing of breast cancer lung metastases shows that loss of the RHAMM protein drives clonal dominance, suggesting a potential therapeutic vulnerability.
            </p>
            <div className="thesis-hero-links">
              <a href="https://github.com/audreygoddard04/RHAMM-HiFi-lung-metastasis" target="_blank" rel="noopener noreferrer" className="thesis-btn thesis-btn-primary">GitHub Repository</a>
              <a href="/AudreyGoddard_FinalThesis.pdf" target="_blank" rel="noopener noreferrer" className="thesis-btn thesis-btn-outline">View Full Thesis</a>
            </div>
            <p className="thesis-supervisor">
              Supervised by Dr. Kathleen Hill &nbsp;|&nbsp; Advisory Panel: Dr. Robert Cumming and Dr. Anthony Percival-Smith &nbsp;|&nbsp; Mentor: Joseph Butler
            </p>
          </header>

          {/* Presentation */}
          <section className="thesis-section">
            <h2>Thesis Presentation</h2>
            <div className="thesis-slides-wrapper" onFocus={(e) => e.preventDefault()}>
              <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vRwHkw0a81hWC63xGwgm-32fEn0Vzzi1vwZ-AvoNbp586IrfzTA1J_g9WZzsrXon8PT99atml_DH0lI/embed?start=false&loop=false&delayms=10000"
                title="Thesis Presentation"
                allowFullScreen
                scrolling="no"
                className="thesis-slides-iframe"
              />
            </div>
          </section>

          {/* Overview */}
          <section className="thesis-section">
            <h2>Overview</h2>
            <p>
              Tumor heterogeneity is a defining feature of aggressive cancers. Genetically diverse tumors can resist treatment by allowing different subclones to survive selective pressures. Understanding which proteins regulate that diversity is critical for identifying vulnerabilities in metastatic disease.
            </p>
            <p>
              This thesis investigated whether <strong>RHAMM (Receptor for Hyaluronan-Mediated Motility; HMMR)</strong>, a protein overexpressed in aggressive breast cancer, influences genome-wide genetic diversity during metastasis. Using the MMTV-PyMT transgenic mouse model and PacBio HiFi long-read sequencing, I compared the mutational landscapes of lung metastases from RHAMM-deficient (Rhamm -/-) and wild-type (Rhamm +/+) cohorts.
            </p>
            <p>
              The central finding is that RHAMM loss is associated with <strong>clonal dominance</strong>: RHAMM-deficient metastases converge on a single dominant genotype shared across all animals, while wild-type metastases maintain a diverse, actively diversifying population of subclones. This pattern is consistent with a metastatic bottleneck model in which RHAMM normally sustains genetic diversity, and its absence allows one well-adapted clone to sweep to dominance in the lung microenvironment.
            </p>
          </section>

          {/* Key Findings */}
          <section className="thesis-section">
            <h2>Key Findings</h2>
            <div className="thesis-stats-grid">
              {thesisFindings.map((f) => (
                <div className="thesis-stat-card" key={f.stat}>
                  <span className="thesis-stat-number">{f.stat}</span>
                  <span className="thesis-stat-label">{f.label}</span>
                  <p className="thesis-stat-detail">{f.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What the Data Show */}
          <section className="thesis-section">
            <h2>What the Data Show</h2>
            <div className="thesis-two-col">
              <div className="thesis-col-card thesis-col-wt">
                <h3>Wild-Type Metastases (Rhamm +/+)</h3>
                <ul>
                  <li>Mean 14,349 variants per sample</li>
                  <li>Only 269 variants shared across all 4 WT mice</li>
                  <li>Broad VAF distribution; mean VAF 0.695</li>
                  <li>Only 34% of exclusive variants at VAF >= 0.8</li>
                  <li>Pattern consistent with ongoing subclonal diversification</li>
                  <li>Enriched for cadherin-mediated adhesion and cell morphogenesis genes</li>
                </ul>
              </div>
              <div className="thesis-col-card thesis-col-ko">
                <h3>RHAMM-Deficient Metastases (Rhamm -/-)</h3>
                <ul>
                  <li>Mean 23,159 variants per sample (1.6x higher)</li>
                  <li>4,078 variants shared across all 4 KO mice (15x more)</li>
                  <li>High VAF distribution; mean VAF 0.939</li>
                  <li>82% of exclusive variants at VAF >= 0.8</li>
                  <li>Pattern consistent with clonal dominance and selection</li>
                  <li>Enriched for RasGEF / Wnt signaling and RNA silencing pathways</li>
                </ul>
              </div>
            </div>
            <p className="thesis-note">
              A 1.6-fold increase in overall mutation burden cannot account for a 15-fold increase in cohort-shared variants. The observed pattern reflects genuine biological clonal selection, not just a higher mutation rate.
            </p>
          </section>

          {/* Biological Interpretation */}
          <section className="thesis-section">
            <h2>Biological Interpretation</h2>
            <p>
              RHAMM contributes to centrosome function, spindle stability, and ERK signaling through interactions with hyaluronan and CD44. In wild-type tumors, RHAMM-mediated genomic instability continuously generates new variants during cell division, maintaining a heterogeneous population even after metastatic colonization. This diversification may help wild-type tumors explore multiple adaptive strategies.
            </p>
            <p>
              In RHAMM-deficient tumors, reduced ongoing variant acquisition allows the metastatic bottleneck to fully manifest. One or a small number of clones best adapted to the pulmonary microenvironment expand and outcompete others, producing convergent genotypes across unrelated animals. The enrichment of RasGEF and Wnt signaling genes in KO-exclusive variants supports a compensatory model: clones that acquire activating mutations in the RAS-ERK axis may gain a selective advantage in the absence of RHAMM-mediated ERK scaffolding.
            </p>
            <p>
              The clonal homogeneity observed in RHAMM-deficient metastases may represent a <strong>therapeutic vulnerability</strong>. A tumor dominated by a single genotype could be more susceptible to targeted therapy, and less likely to generate resistant subclones, than a heterogeneous tumor population.
            </p>
          </section>

          {/* Methods */}
          <section className="thesis-section">
            <h2>Methods</h2>
            <div className="thesis-methods-grid">
              <div className="thesis-method-card">
                <h4>Mouse Model</h4>
                <p>MMTV-PyMT transgenic mice on a mixed FVB/N x C57BL/6 background. RHAMM-deficient (Rhamm -/-, n=4) and wild-type (Rhamm +/+, n=4) cohorts. Bulk lung tissue containing metastatic lesions collected from all 8 animals.</p>
              </div>
              <div className="thesis-method-card">
                <h4>DNA Extraction</h4>
                <p>High-molecular-weight DNA extracted using the Nanobind PanDNA kit (PacBio). All 8 samples achieved TapeStation DIN 9.9 and A260/280 >= 1.85, confirming intact, non-degraded genomic DNA suitable for long-read library prep.</p>
              </div>
              <div className="thesis-method-card">
                <h4>PacBio HiFi Sequencing</h4>
                <p>Libraries prepared using SMRTbell Express Template Prep Kit 2.0 (3.0 ug input per sample) and sequenced on the PacBio Sequel IIe platform at The Centre for Applied Genomics (SickKids, Toronto). Mean coverage 48.38x; mean quality Q23.2.</p>
              </div>
              <div className="thesis-method-card">
                <h4>Variant Calling and Phasing</h4>
                <p>Reads aligned to mm39 using pbmm2. Variants called with DeepVariant v1.6.0 and phased with HiPhase v1.6.0. Phased VCF files used as input for all downstream filtering.</p>
              </div>
              <div className="thesis-method-card">
                <h4>Functional Annotation</h4>
                <p>Cohort-exclusive genes analyzed using DAVID (primary) and ClusterProfiler v4.18.4 in R (validation) with Benjamini-Hochberg correction. GO Biological Process, Cellular Component, Molecular Function, and KEGG pathway enrichment performed for both cohorts.</p>
              </div>
              <div className="thesis-method-card">
                <h4>Statistical Analysis</h4>
                <p>Two-sample t-test for per-sample variant burden; binomial test for cohort-exclusive variant split; Kolmogorov-Smirnov test for VAF distribution comparison. All analyses in R v4.5.0.</p>
              </div>
            </div>

            <div className="thesis-pipeline-toggle">
              <button
                className="thesis-pipeline-btn"
                onClick={() => setPipelineOpen(p => !p)}
                aria-expanded={pipelineOpen}
              >
                {pipelineOpen ? 'Hide' : 'Show'} Bioinformatics Pipeline
                <span className="thesis-pipeline-arrow">{pipelineOpen ? '▲' : '▼'}</span>
              </button>
              {pipelineOpen && (
                <div className="thesis-pipeline">
                  {thesisPipeline.map((p) => (
                    <div className="thesis-pipeline-step" key={p.step}>
                      <span className="thesis-pipeline-num">Stage {p.step}</span>
                      <div>
                        <strong>{p.label}</strong>
                        <p>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Tools */}
          <section className="thesis-section">
            <h2>Tools and Technologies</h2>
            <div className="thesis-tools-grid">
              {thesisTools.map((t) => (
                <span className="thesis-tool-tag" key={t}>{t}</span>
              ))}
            </div>
          </section>

          {/* Limitations and Future Directions */}
          <section className="thesis-section">
            <h2>Limitations and Future Directions</h2>
            <div className="thesis-two-col">
              <div>
                <h3>Key Limitations</h3>
                <ul className="thesis-list">
                  <li>Bulk lung tissue sequencing includes stromal and immune cells; VAF reflects frequency across the full cell mixture, not just tumor cells</li>
                  <li>Small cohort size (n=4 per group) limits statistical power; findings are exploratory and hypothesis-generating</li>
                  <li>RHAMM allele is a frameshift, not a complete deletion; residual function cannot be excluded</li>
                  <li>Residual strain-specific polymorphisms may remain despite two-stage filtering, though cohort-level recurrence filtering mitigates this</li>
                </ul>
              </div>
              <div>
                <h3>Future Directions</h3>
                <ul className="thesis-list">
                  <li>ddPCR validation of key cohort-exclusive variants in an expanded cohort (8-10 animals per group)</li>
                  <li>Primary tumor sequencing to establish temporal framework for variant acquisition</li>
                  <li>Structural variant analysis using pbsv on existing HiFi data</li>
                  <li>Laser capture microdissection or single-cell whole genome sequencing for cell-type-specific clonal reconstruction</li>
                  <li>Single-cell RNA sequencing for direct transcriptome profiling of clonal populations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Acknowledgements */}
          <section className="thesis-section thesis-acknowledgements">
            <h2>Acknowledgements</h2>
            <p>
              Thank you to my supervisor, Dr. Kathleen Hill, whose mentorship, patience, and guidance were fundamental to this project. Thank you to my advisory panel, Dr. Robert Cumming and Dr. Anthony Percival-Smith, for their thoughtful feedback and multidisciplinary perspective. I am grateful to Dr. Eva Turley and Dr. Cornelia Tolg for their generosity and expertise in the wet lab work, and to Joseph Butler for endless support and advice throughout. Funding was provided by the Department of Biology, the Faculty of Science, NSERC, and a generous anonymous donor.
            </p>
          </section>

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

  // Render fitness content
  if (projectId === 'fitness') {
    return (
      <div className="project-detail-bg health-bg">
        <div className="project-detail-container">
          <Link to="/projects" className="back-link">Back to Projects</Link>
          
          <header className="project-detail-header">
            <div className="project-detail-title-section">
              <h1>{project.title}</h1>
              <p className="project-detail-subtitle">{project.subtitle}</p>
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

          {/* Athletics Box */}
          <Link to="/fitness#athletics" className="athletics-featured-box">
            <div className="athletics-featured-content">
              <div className="athletics-featured-left">
                <h3 className="athletics-featured-title">Athletics</h3>
                <p className="athletics-featured-subtitle">Track & Field and Volleyball</p>
              </div>
              <div className="athletics-featured-right">
                <ul className="athletics-featured-list">
                  <li>Varsity Track & Field Athlete – Western University</li>
                  <li>Team Ontario Volleyball – Canada Summer Games</li>
                  <li>Competitive athletics and training highlights</li>
                </ul>
                <div className="athletics-featured-link">Read more →</div>
              </div>
            </div>
          </Link>

          {/* Fitness Images Grid 1 */}
          <div className="fitness-image-grid">
            <div className="grid-item large">
              <img src={fitnessImg2} alt="Fitness training" />
            </div>
            <div className="grid-item medium">
              <img src={fitnessImg3} alt="Fitness activity" />
            </div>
            <div className="grid-item small">
              <img src={fitnessImg4} alt="Fitness workout" />
            </div>
          </div>

          {/* Fitness Section - Redesigned */}
          <section id="fitness" className={`main-section project-detail-section ${!matchesSearch('Fitness Non-Negotiables Lifting Exercises Cardio Athletics Track Volleyball') ? 'search-hidden' : ''}`}>
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

          {/* Fitness Images Grid 2 */}
          <div className="fitness-image-grid">
            <div className="grid-item large">
              <img src={fitnessImg5} alt="Fitness training" />
            </div>
            <div className="grid-item medium">
              <img src={fitnessImg6} alt="Fitness activity" />
            </div>
            <div className="grid-item small">
              <img src={fitnessImg7} alt="Fitness workout" />
            </div>
          </div>

          {/* Fitness Images Grid 3 */}
          <div className="fitness-image-grid">
            <div className="grid-item large">
              <img src={fitnessImg8} alt="Fitness training" />
            </div>
            <div className="grid-item medium">
              <img src={fitnessImg9} alt="Fitness activity" />
            </div>
            <div className="grid-item small">
              <img src={fitnessImg1} alt="Fitness workout" />
            </div>
          </div>
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

