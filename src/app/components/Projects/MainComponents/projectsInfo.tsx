import type { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import JstorRag from '../JstorRag/index';
import type { ProjectCategoryId } from './projectCategories';

const Maknoon = dynamic(() => import('../Maknoon/index'), { ssr: false });
const Remedya = dynamic(() => import('../Remedya/index'), { ssr: false });
const CensusDataCleaning = dynamic(() => import('../CensusDataCleaning/index'), {
  ssr: false,
});
const CapitolCycles = dynamic(() => import('../CapitolCycles/index'), { ssr: false });
const AthaiProject = dynamic(() => import('../Athai/index'), { ssr: false });
const AiNewsAggregator = dynamic(() => import('../AiNewsAggregator/index'), {
  ssr: false,
});
const DiamondPricePrediction = dynamic(
  () => import('../DiamondPricePrediction/index'),
  { ssr: false },
);
const MusicGenreClassification = dynamic(
  () => import('../MusicGenreClassification/index'),
  { ssr: false },
);
const ConsultationApp = dynamic(() => import('../ConsultationApp/index'), {
  ssr: false,
});

export type PortfolioProject = {
  category: ProjectCategoryId;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  docUrl?: string;
  interactiveComponent: ReactElement;
  telegramUrl?: string;
  colabUrl?: string;
  interactive?: boolean;
  note?: string;
};

const projects: PortfolioProject[] = [
  {
    category: 'intelligent-generative-ai',
    title: 'Maknoon',
    description: `I built Maknoon as a multi-agent Arabic novel research tool: Django and LangGraph orchestrate progressive cleaning and graph-style reasoning, Celery and Redis handle async work, and Gemini plus Cohere back extraction of character traits, relationships, and events with LangSmith observability and WebSockets for live UI updates. The reader below is the portfolio-embedded demo—full backend services are not wired to production from this page.`,
    technologies: [
      'LangGraph',
      'LangSmith',
      'Django REST Framework',
      'Celery',
      'Redis',
      'Google Gemini',
      'Websockets',
      'Cohere',
    ],
    interactiveComponent: <Maknoon />,
    interactive: true,
  },
  {
    category: 'intelligent-generative-ai',
    title: 'JSTOR RAG — article-scoped research assistant',
    description: `I built jstor-rag as a Chrome extension (MV3, Svelte 5) paired with a local FastAPI backend that turns a single JSTOR article URL into a searchable vector collection, then answers questions with LangGraph-driven agentic RAG: document-scoped retrieval, checkpointed multi-turn memory, Playwright-based ingestion, section-aware chunking, Chroma embeddings, and Gemini/Groq for embed and chat. The demo below is a static preview of the side-panel experience (sample article, digest, and preset Q&A)—the full stack does not run in the browser here.`,
    technologies: [
      'FastAPI',
      'LangGraph',
      'LangChain',
      'ChromaDB',
      'Playwright',
      'Chrome MV3',
      'Svelte 5',
      'Google Gemini',
      'Groq',
      'Pydantic Settings',
      'WebSockets',
    ],
    githubUrl: 'https://github.com/mohamadtshehab/jstor-rag',
    interactiveComponent: <JstorRag />,
    interactive: true,
  },
  {
    category: 'full-stack',
    title: 'Remedya',
    description: `I built Remedya as a Laravel/MySQL pharmacy platform that merges back-office operations with a customer storefront: custom commerce rules (FIFO stock for expiry-sensitive inventory, prescription checks), Meilisearch-backed discovery, owner dashboards for analytics, inventory, and staff, plus a shopper experience with drug-interaction and allergy alerts and WebSockets where needed. The carousel below is a static UI walkthrough—not a live deployment of the full stack.`,
    technologies: ['PHP', 'Laravel', 'MySQL', 'SQL', 'Mellisearch', 'Websockets'],
    githubUrl: 'https://github.com/mohamadtshehab/PROJECT-1',
    docUrl:
      'https://drive.google.com/file/d/1h44eCRw7MZmIHlKdecxkiyCyDWjDSbi9/view?usp=sharing',
    interactiveComponent: <Remedya />,
    interactive: false,
  },
  {
    category: 'data-mining-quality',
    title: 'Population Census Data Cleaning',
    description: `I built a volunteer census-quality pipeline on messy Arabic administrative records: 150+ validation rules spanning 66 fields, automated Pandas checks, and structured JSON reports that flagged 300+ concrete issues across most of 203 entries. The table below is an interactive portfolio slice of that workflow—source systems and raw exports are not connected here.`,
    technologies: ['Python', 'Pandas', 'Draw.io', 'Excel', 'JSON'],
    docUrl:
      'https://drive.google.com/file/d/1OnfAxi3yKwZiNC60K3a0dzXTlBPtmk0H/view?usp=sharing',
    interactiveComponent: <CensusDataCleaning />,
    interactive: true,
  },
  {
    category: 'data-mining-quality',
    title: 'Capitol Cycles: DC Bikeshare Data Mining',
    description: `I built Capitol Cycles as a full bikeshare data-mining study (DC-style trip and weather data): GeoPandas spatial joins (CBD polygon, residential zones, transit proximity), engineered fares and geohash tiers, Plotly-heavy EDA, inferential tests (chi-square, OLS), Prophet seasonality and forecasts, and K-means / DBSCAN segmentation in Google Colab. The chapter scroll below pairs each figure with the original Arabic methodology notes—heavy compute stayed in Colab, not in the browser.`,
    technologies: [
      'Python',
      'Pandas',
      'GeoPandas',
      'Plotly',
      'Prophet',
      'scikit-learn',
      'statsmodels',
      'NumPy',
      'Google Colab',
    ],
    interactiveComponent: <CapitolCycles />,
    interactive: true,
  },
  {
    category: 'intelligent-generative-ai',
    title: 'Ath.ai - AI Furniture Visualizer',
    description: `I built Ath.ai as a generative furniture visualizer: a Django (and Flask-serviced) backend with a React + Three.js client, pairing NLP and transformer tooling with diffusion (Zero123++) and large reconstruction models for parallel 2D-to-3D and text-to-3D pipelines. The block below is a portfolio-embedded viewer and sample flow—full model training and GPU inference are not executed on this site.`,
    technologies: ['Transformers', 'Diffusion Models', 'Django', 'Flask'],
    githubUrl: 'https://github.com/mohamadshehab/athai',
    docUrl:
      'https://drive.google.com/file/d/1apabdA9Z-bb4SeAoyxPZJIvSB7ChQDfX/view?usp=sharing',
    interactiveComponent: <AthaiProject />,
    interactive: true,
  },
  {
    category: 'intelligent-generative-ai',
    title: 'Automated AI News Aggregator & Digest',
    description: `I built an automated AI news digest on n8n: scheduled RSS ingestion, light filtering, Google Gemini for bilingual English/Arabic summaries, and Telegram delivery to the Starfall AI channel via the Bot API. The panel below previews the subscriber-facing experience—use the Telegram link on the card for the live feed; n8n and Gemini are not invoked from this page.`,
    technologies: ['n8n', 'RSS', 'Google Gemini API', 'Telegram API', 'JavaScript'],
    docUrl:
      'https://drive.google.com/file/d/1fxyomUNtPIOY1wKHO9KH_bBywZaFz8Tk/view?usp=sharing',
    interactiveComponent: <AiNewsAggregator />,
    telegramUrl: 'https://t.me/shehab_newsletter',
    interactive: true,
  },
  {
    category: 'ml-supervised',
    title: 'Diamond Pricing Prediction',
    description: `I built a diamond price regressor for a SHAI For AI internal competition (7th of 100, RMSE 517): exploratory analysis, feature engineering, a reusable preprocessing pipeline, and a scikit-learn voting ensemble over several base regressors. The widget below runs a lightweight in-browser estimator on curated sample rows—not the full Colab training stack.`,
    technologies: ['Scikit-learn', 'Pandas', 'Seaborn', 'VotingRegressors'],
    colabUrl:
      'https://colab.research.google.com/drive/1Daa2cYRXZdD8_yH9Z0mJ4Z8xf3JCoR8B?usp=sharing',
    interactiveComponent: <DiamondPricePrediction />,
    interactive: true,
  },
  {
    category: 'ml-supervised',
    title: 'Music Genre Classification',
    description: `I built a music genre classifier on ~18k tracks: missing-value and outlier handling, custom audio-derived features, standardization and normalization, and PyCaret-driven model search where CatBoost led on F1. The UI below is a portfolio playground on sample rows and static metrics—model training and dataset IO are not re-run in the browser.`,
    technologies: [
      'Scikit-learn',
      'Pandas & Numpy',
      'PyCaret',
      'Matplotlib & Seaborn',
      'CatBoost',
    ],
    colabUrl:
      'https://colab.research.google.com/drive/12bByJ8MSbapHg65P4hIvW7oIT08_YwNn?usp=sharing',
    docUrl:
      'https://drive.google.com/file/d/1PgiEbHtIXNIQNuUT7iYbcGnQfmRRDROK/view?usp=drivesdk',
    interactiveComponent: <MusicGenreClassification />,
    interactive: true,
  },
  {
    category: 'full-stack',
    title: 'Basic Digital Consultation Application',
    description: `I built a Laravel/MySQL digital consultation marketplace (early full-stack project): categorized expert listings, booking flows, wallets, and role separation for clients, experts, and admins across medicine, mental health, business, family, and career verticals. The carousel below is a static UI tour—the app is not hosted as a live service from this portfolio.`,
    technologies: ['Laravel', 'MySQL'],
    githubUrl: 'https://github.com/mohamadtshehab/expert-management-system',
    interactiveComponent: <ConsultationApp />,
    interactive: false,
  },
];

export default projects;
