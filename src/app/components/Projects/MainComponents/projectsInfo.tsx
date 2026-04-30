import dynamic from 'next/dynamic';
import type { PortfolioProject } from './portfolioProject';

export type { PortfolioProject } from './portfolioProject';

const JstorRag = dynamic(() => import('../JstorRag/index'), { ssr: false });
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

const projects: PortfolioProject[] = [
  {
    category: 'intelligent-generative-ai',
    title: 'Maknoon',
    description: `A multi-agent research assistant for Arabic novels: it cleans text in stages, reasons over the story in a structured, graph-like way, and pulls out characters’ traits, relationships, and key events as the analysis runs, with live updates in the UI.`,
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
    description: `A research extension for JSTOR: When you’re on an article, it ingests that paper, builds a search index for it, and answers questions and follow-ups about it.`,
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
    description: `A pharmacy platform that links shop operations with a customer storefront: expiry-aware stock handling, prescription checks, fast catalog discovery, owner dashboards for analytics, inventory, and staff, and safeguards that surface drug interactions and allergies at the right moments.`,
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
    description: `A volunteer data-quality pass on messy Arabic census records: a large validation rule set across dozens of fields, automated checking, and structured reports that flagged hundreds of concrete issues across the surveyed entries.`,
    technologies: ['Python', 'Pandas', 'Draw.io', 'Excel', 'JSON'],
    docUrl:
      'https://drive.google.com/file/d/1OnfAxi3yKwZiNC60K3a0dzXTlBPtmk0H/view?usp=sharing',
    interactiveComponent: <CensusDataCleaning />,
    interactive: true,
  },
  {
    category: 'data-mining-quality',
    title: 'Capitol Cycles: DC Bikeshare Data Mining',
    description: `A bikeshare data study using trip and weather data: how rides relate to downtown, neighborhoods, and transit, engineered trip features, exploratory charts, statistical tests, seasonal forecasting, and rider segmentation.`,
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
    description: `A generative furniture visualizer that turns photos and text prompts into 3D pieces you can inspect. It has a 3D room where you can visualize the furniture, but this part is not included in this demo.`,
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
    description: `An automated news digest where sources are collected on a schedule, lightly filtered, summarized in English and Arabic, and delivered to subscribers on a Telegram channel.`,
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
    description: `A diamond price regression model.`,
    technologies: ['Scikit-learn', 'Pandas', 'Seaborn', 'VotingRegressors'],
    colabUrl:
      'https://colab.research.google.com/drive/1Daa2cYRXZdD8_yH9Z0mJ4Z8xf3JCoR8B?usp=sharing',
    interactiveComponent: <DiamondPricePrediction />,
    interactive: true,
  },
  {
    category: 'ml-supervised',
    title: 'Music Genre Classification',
    description: `A music genre classification model.`,
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
    description: `A digital consultation marketplace (early full-stack project).`,
    technologies: ['Laravel', 'MySQL'],
    githubUrl: 'https://github.com/mohamadtshehab/expert-management-system',
    interactiveComponent: <ConsultationApp />,
    interactive: false,
  },
];

export default projects;
