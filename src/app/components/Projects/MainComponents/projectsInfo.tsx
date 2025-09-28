import CensusDataCleaning from '../CensusDataCleaning/index';
import AthaiProject from '../Athai/index';
import AiNewsAggregator from '../AiNewsAggregator/index';
import DiamondPricePrediction from '../DiamondPricePrediction/index';
import MusicGenreClassification from '../MusicGenreClassification/index';
import ConsultationApp from '../ConsultationApp/index';
import Remedya from '../Remedya/index';
import Maknoon from '../Maknoon/index';
const projects = [
    {
      title: 'Maknoon',
      description: `Faced with the challenge of analyzing long, complex Arabic novels without a dedicated tool, I architected and developed
      Maknoon, a first-of-its-kind multi-agent system, to efficiently extract and organize detailed character data. My action involved
      designing an innovative AI workflow built with Django and LangGraph, which progressively cleans, analyzes, and builds character
      profiles. The result is a highly effective system that extracts and organizes detailed
      information about character traits, relationships, and key events, clearly demonstrating my expertise in both backend and AI engineering.`,
      technologies: ['LangGraph', 'LangSmith', 'Django REST Framework', 'Celery', 'Redis', 'Google Gemini', 'Websockets', 'Cohere'],
      interactiveComponent: <Maknoon />,
      interactive: true
    },
    {
      title: 'Remedya',
      description: `Faced with the challenge of the pharmacy market being fragmented between complex management systems and basic e-commerce
      sites, I architected and led the development of Remedya, an all-in-one platform that unifies both functions. My action involved
      implementing a custom e-commerce engine that enforces critical safety and efficiency rules, such as FIFO (First-In, First-Out)
      sales for waste reduction and strict verification for prescription medications, alongside building two distinct user experiences:
      a robust management dashboard with detailed analytics, inventory, and staff management for owners, and a safe customer marketplace
      with features like a built-in Drug Interaction Checker and Allergy Alerts. The result is a single platform that makes pharmacies
      run more smoothly and provides customers with a safer, more reliable online experience.`,
      technologies: ['PHP', 'Laravel', 'MySQL', 'SQL', 'Mellisearch', 'Websockets', ],
      githubUrl: 'https://github.com/mohamadtshehab/PROJECT-1',
      docUrl: 'https://drive.google.com/file/d/1h44eCRw7MZmIHlKdecxkiyCyDWjDSbi9/view?usp=sharing',
      interactiveComponent: <Remedya />,
      interactive: false
    },
    {
      
      title: 'Population Census Data Cleaning',
      description: `Facing the critical challenge of working with unstructured Arabic census data that contained numerous errors, I volunteered
      as a data analyst with the task of cleaning and validating this data to ensure its integrity. My action involved developing over
      150 granular validation rules across 66 distinct fields and implementing automation using the Pandas library to streamline error
      detection and output structured JSON reports. This rigorous process resulted in the successful identification of more than 300 data
      quality issues present in 90% of the 203 census entries, significantly improving the reliability of the dataset.`,
      technologies: ['Python', 'Pandas', 'Draw.io', 'Excel', 'JSON'],
      docUrl: 'https://drive.google.com/file/d/1OnfAxi3yKwZiNC60K3a0dzXTlBPtmk0H/view?usp=sharing',
      interactiveComponent: <CensusDataCleaning />,
      interactive: true
    },
    {
      title: 'Ath.ai - AI Furniture Visualizer',
      description: `Facing the significant 

challenge of a market where users had to choose between complex 3D modeling software (like Blender) or costly, non-custom advice from interior designers, my task was to architect and develop Ath.ai , an 

AI-powered web application to enable swift, customized in-room furniture visualization. My 

action involved building a system on a Django backend with a React/ThreeJS frontend that utilizes state-of-the-art generative capabilities, including NLP, transformer architectures, diffusion models (Zero123++), and Large Reconstruction Models (LRMs), implementing two pipelines (2D-to-3D and Text-to-3D) for model generation. The 

result is a highly efficient platform that assists users in generating high-quality 3D furniture models from just a single image or text description, successfully overcoming the limitations of previous applications.`,
      technologies: ['Transformers', 'Diffusion Models', 'Django', 'Flask'],
      githubUrl: 'https://github.com/mohamadshehab/athai',
      docUrl: 'https://drive.google.com/file/d/1apabdA9Z-bb4SeAoyxPZJIvSB7ChQDfX/view?usp=sharing',
      interactiveComponent: <AthaiProject />,
      interactive: true
    },
    {
      title: 'Automated AI News Aggregator & Digest',
      description: `Facing the constant challenge of staying updated on the rapidly moving field of AI news, I decided to
      develop an automated system that could efficiently collect, filter, and provide multi-lingual summaries to subscribers.
      My action involved architecting an n8n workflow that automatically ingested various RSS feeds, filtered the content, and then
      leveraged the Google Gemini API to generate high-quality news summaries in both English and Arabic. The resulting summaries are
      then seamlessly delivered directly to subscribers via the Telegram API on the Starfall AI channel, providing a reliable, dual-language
      daily news digest with minimal manual effort. (Don't forget to subscribe to the channel from URL above. 😉)`,
      technologies: ['n8n', 'RSS', 'Google Gemini API', 'Telegram API', 'JavaScript'],
      docUrl: 'https://drive.google.com/file/d/1fxyomUNtPIOY1wKHO9KH_bBywZaFz8Tk/view?usp=sharing',
      interactiveComponent: <AiNewsAggregator />,
      telegramUrl: 'https://t.me/shehab_newsletter',
      interactive: true
    },
    {
      title: 'Diamond Pricing Prediction',
      description: `During my internship at SHAI For AI, I ranked 7th/100 in a Kaggle competition after I developed a Diamond Pricing Prediction model, achieving an RMSE of 517 by 
      exploring and engineering features, building a preprocessing pipeline, and implementing an ensemble of regression models.`,
      technologies: ['Scikit-learn', 'Pandas', 'Seaborn', 'VotingRegressors'],
      colabUrl: 'https://colab.research.google.com/drive/1Daa2cYRXZdD8_yH9Z0mJ4Z8xf3JCoR8B?usp=sharing',
      interactiveComponent: <DiamondPricePrediction />,
      interactive: true
    },
    {
      title: 'Music Genre Classification',
      description: `I developed a machine learning model to classify songs by genre using a dataset of around 18,000 songs. The work involved data
      analysis, handling missing and outlier values, creating new features, and applying standardization and normalization techniques. After comparing
      several models using the PyCaret library, the CatBoost Classifier achieved the best performance based on the F1-score.`,
      technologies: ['Scikit-learn', 'Pandas & Numpy', 'PyCaret', 'Matplotlib & Seaborn', 'CatBooost'],
      colabUrl: 'https://colab.research.google.com/drive/12bByJ8MSbapHg65P4hIvW7oIT08_YwNn?usp=sharing',
      docUrl: 'https://drive.google.com/file/d/1PgiEbHtIXNIQNuUT7iYbcGnQfmRRDROK/view?usp=drivesdk',
      interactiveComponent: <MusicGenreClassification />,
      interactive: true
    },
    {
      title: 'Basic Digital Consultation Application',
      description: `My first project in web development - a digital consultation platform that connects users with experts 
      in fields like medicine, mental health, business, family, and career guidance. Key features include: 
      expert listings, private consultations, wallet System, and role management`,
      technologies: ['Laravel', 'MySQL' ],
      githubUrl: 'https://github.com/mohamadtshehab/expert-management-system',
      interactiveComponent: <ConsultationApp />,
      interactive: false
    },
  ];

export default projects;
