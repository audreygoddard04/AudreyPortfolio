import React, { useState } from 'react';
import './Thesis.css';

const findings = [
  {
    stat: '15x',
    label: 'More Cohort-Shared Variants',
    detail: 'RHAMM-deficient mice had 4,078 cohort-exclusive shared variants vs. 269 in wild-type controls (p < 2.2 x 10^-16)',
  },
  {
    stat: '82%',
    label: 'High VAF in KO Variants',
    detail: 'Mean variant allele frequency of 0.939 in RHAMM-deficient variants, consistent with clonal dominance across all four knockout animals',
  },
  {
    stat: '1.6x',
    label: 'Higher Mutation Burden in KO',
    detail: 'Mean 23,159 variants per sample in KO vs. 14,349 in WT (p = 0.002), yet KO showed markedly less inter-animal variability',
  },
  {
    stat: '48x',
    label: 'Mean Genome Coverage',
    detail: 'PacBio HiFi sequencing at mean Q23.2 across 8 samples, exceeding the 25-40x target and enabling high-confidence variant calling',
  },
];

const pipeline = [
  { step: '1', label: 'Low VAF Filtering', desc: 'Removed variants with VAF < 0.30 to eliminate sequencing noise' },
  { step: '2', label: 'C57BL/6 Background', desc: 'Subtracted inherited C57BL/6 germline polymorphisms using bcftools isec' },
  { step: '3', label: 'FVB/N Background', desc: 'Removed FVB/N strain-specific SNPs by subtracting a remapped FVB reference VCF' },
  { step: '4', label: 'Quality Filtering', desc: 'QUAL >= 50, GQ >= 30, DP >= 30, AD[ALT] >= 5 to retain only high-confidence calls' },
  { step: '5', label: 'Cohort Comparison', desc: 'Merged within cohorts; bcftools isec identified variants exclusive to all 4 KO or all 4 WT mice' },
];

const tools = [
  'PacBio HiFi', 'DeepVariant', 'HiPhase', 'pbmm2', 'bcftools',
  'samtools', 'mosdepth', 'SnpEff', 'DAVID', 'ClusterProfiler', 'R v4.5.0', 'Linux / CLI',
];

function Thesis() {
  const [pipelineOpen, setPipelineOpen] = useState(false);

  return (
    <div className="thesis-bg">
      <div className="thesis-container">

        {/* Hero */}
        <header className="thesis-hero">
          <p className="thesis-eyebrow">Honours Thesis · Biology 4999E · University of Western Ontario · April 2026</p>
          <h1>Long-Read Sequencing Reveals Reduced Genomic Heterogeneity in RHAMM-Deficient Metastases</h1>
          <p className="thesis-tagline">
            PacBio HiFi whole-genome sequencing of breast cancer lung metastases shows that loss of the RHAMM protein drives clonal dominance, suggesting a potential therapeutic vulnerability.
          </p>
          <div className="thesis-hero-links">
            <a
              href="https://github.com/audreygoddard04/RHAMM-HiFi-lung-metastasis"
              target="_blank"
              rel="noopener noreferrer"
              className="thesis-btn thesis-btn-primary"
            >
              GitHub Repository
            </a>
            <a
              href="https://github.com/audreygoddard04/RHAMM-HiFi-lung-metastasis"
              target="_blank"
              rel="noopener noreferrer"
              className="thesis-btn thesis-btn-outline"
            >
              View Full Thesis
            </a>
          </div>
          <p className="thesis-supervisor">
            Supervised by Dr. Kathleen Hill &nbsp;|&nbsp; Advisory Panel: Dr. Robert Cumming and Dr. Anthony Percival-Smith &nbsp;|&nbsp; Mentor: Joseph Butler
          </p>
        </header>

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
            {findings.map((f) => (
              <div className="thesis-stat-card" key={f.stat}>
                <span className="thesis-stat-number">{f.stat}</span>
                <span className="thesis-stat-label">{f.label}</span>
                <p className="thesis-stat-detail">{f.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Findings Narrative */}
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

          {/* Pipeline Accordion */}
          <div className="thesis-pipeline-toggle">
            <button
              className="thesis-pipeline-btn"
              onClick={() => setPipelineOpen(!pipelineOpen)}
              aria-expanded={pipelineOpen}
            >
              {pipelineOpen ? 'Hide' : 'Show'} Bioinformatics Pipeline
              <span className="thesis-pipeline-arrow">{pipelineOpen ? '▲' : '▼'}</span>
            </button>
            {pipelineOpen && (
              <div className="thesis-pipeline">
                {pipeline.map((p) => (
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
            {tools.map((t) => (
              <span className="thesis-tool-tag" key={t}>{t}</span>
            ))}
          </div>
        </section>

        {/* Limitations and Future Work */}
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

export default Thesis;
