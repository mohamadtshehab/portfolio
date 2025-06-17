const certificates = [
    {
      title: 'TOEFL Preparation Specialization',
      institution: "University of California, Irvine",
      description: `Successfully completed a verified Specialization in TOEFL Preparation, 
      demonstrating strong proficiency in English language skills and strategic test-taking. 
      Achieved grades of 95% in both "TOEFL Reading and Listening Sections Skills Mastery" and 
      "TOEFL Speaking and Writing Sections Skills Mastery," and 90% in "TOEFL Test-Taking Strategies." 
      This specialization honed my ability to understand and solve TOEFL questions effectively for academic.`,
      skills: ['TOEFL reading', 'TOEFl writing', 'TOEFL speaking', 'TOEFL listening'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93',
      image: 'certificates/toefl-preparation.jpeg'
    },
    {
      title: 'Ath.ai - AI Furniture Visualizer',
      description: `Developed an innovative AI-powered 3D furniture visualizer with diffusion models, transformers, Django for the backend, and Flask for
      the model deployment.`,
      technologies: ['Transformers', 'Diffusion Models', 'Django', 'Flask'],
      githubUrl: 'https://github.com/mohamadshehab/athai',
      docUrl: 'https://drive.google.com/file/d/1apabdA9Z-bb4SeAoyxPZJIvSB7ChQDfX/view?usp=sharing',
      interactiveComponent: <AthaiProject />,
    },
    {
      title: 'Automated AI News Aggregator & Digest',
      description: `Leveraging an automated n8n workflow, I developed a system to collect, filter, and summarize daily AI news, integrating RSS feeds and
      utilizing the Google Gemini API to provide summaries in both English and Arabic, which are then delivered to subscribers via the Telegram API on my
      channel: <a href="https://t.me/shehab_newsletter" target="_blank" rel="noopener noreferrer" className="text-[#ffc64a] hover:underline">Starfall AI</a>
      (Do not forget to subscribe 😉).`,
      technologies: ['n8n', 'RSS', 'Google Gemini API', 'Telegram API', 'JavaScript'],
      docUrl: 'https://drive.google.com/file/d/1fxyomUNtPIOY1wKHO9KH_bBywZaFz8Tk/view?usp=sharing',
      interactiveComponent: <AiNewsAggregator />,
      telegramUrl: 'https://t.me/shehab_newsletter',
    },
    {
      title: 'Diamond Pricing Prediction',
      description: `During my internship at SHAI For AI, I ranked 7th/100 in a Kaggle competition after I developed a Diamond Pricing Prediction model, achieving an RMSE of 517 by 
      exploring and engineering features, building a preprocessing pipeline, and implementing an ensemble of regression models.`,
      technologies: ['Scikit-learn', 'Pandas', 'Seaborn', 'VotingRegressors'],
      colabUrl: 'https://colab.research.google.com/drive/1Daa2cYRXZdD8_yH9Z0mJ4Z8xf3JCoR8B?usp=sharing',
      interactiveComponent: <DiamondPricePrediction />,
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
    },
    {
      title: 'Basic Digital Consultation Application',
      description: `My first project in web development - a digital consultation platform that connects users with experts 
      in fields like medicine, mental health, business, family, and career guidance. Key features include: 
      expert listings, private consultations, wallet System, and role management`,
      technologies: ['Laravel', 'MySQL' ],
      githubUrl: 'https://github.com/mohamadtshehab/expert-management-system',
      interactiveComponent: <ConsultationApp />,
    },
  ];

export default certificates;
