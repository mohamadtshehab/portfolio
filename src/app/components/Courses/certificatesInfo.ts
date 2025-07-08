const certificates = [
    {
      title: 'TOEFL Preparation Specialization',
      institution: "University of California, Irvine",
      description: `Successfully completed a verified Specialization in TOEFL Preparation, demonstrating strong proficiency in English language skills and strategic test-taking. Achieved grades of 95% in both "TOEFL Reading and Listening Sections Skills Mastery" and "TOEFL Speaking and Writing Sections Skills Mastery," and 90% in "TOEFL Test-Taking Strategies." This specialization honed my ability to understand and solve TOEFL questions effectively for academic.`,
      skills: ['TOEFL reading', 'TOEFL writing', 'TOEFL speaking', 'TOEFL listening'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93',
      image: '/certificates/toefl-preparation.jpeg',
      date: 'February 11, 2022'
    },
    {
      title: 'Machine Learning Specialization',
      institution: "Stanford University & DeepLearning.AI",
      description: `Successfully completed a verified Specialization in Machine Learning, demonstrating comprehensive knowledge and practical skills in building and applying machine learning models. Achieved grades of 100% in "Supervised Machine Learning: Regression and Classification" and "Advanced Learning Algorithms," and 99.40% in "Unsupervised Learning, Recommenders, Reinforcement Learning." This specialization provided in-depth training in supervised and unsupervised learning, neural networks, decision trees, recommender systems, and deep reinforcement learning.`,
      skills: ['Scikit Learn', 'Supervised Learning', 'Classification And Regression Tree (CART)', 'NumPy', 'Unsupervised Learning', 'Decision Tree Learning', 'Reinforcement Learning', 'Deep Learning'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/machine-learning.jpeg',
      date: 'August 31, 2024'
    },
    {
      title: 'Generative AI and LLMs: Architecture and Data Preparation',
      institution: "IBM",
      description: `Successfully completed a verified Course Certificate in Generative AI and LLMs: Architecture and Data Preparation, demonstrating a strong understanding of generative AI architectures, large language models (LLMs), and data preparation techniques for natural language processing (NLP) tasks. Achieved a grade of 100%. This course covered differentiation between various generative AI models, application of LLMs in NLP, implementation of tokenization using NLP libraries, and creation of NLP data loaders in PyTorch.`,
      skills: ['PyTorch', 'Jupyter', 'Generative AI', 'Natural Language Processing', 'Data Processing', 'Text Mining', 'Large Language Modeling'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/generative-ai-llms.jpeg',
      date: 'February 14, 2025'
    },
    {
      title: 'Algorithmic Toolbox',
      institution: "University of California San Diego",
      description: `Successfully completed a verified Course Certificate in Algorithmic Toolbox, demonstrating proficiency in essential algorithmic techniques and the design of efficient algorithms. Achieved a grade of 74.97%. This course focused on practicing and implementing efficient and reliable solutions for algorithmic problems, providing a strong foundation in computational thinking and programming principles.`,
      skills: ['Computational Thinking', 'Algorithms', 'Development Testing', 'Computer Programming', 'Software Testing', 'Programming Principles', 'Program Development', 'Test Engineering', 'Theoretical Computer Science', 'Design Strategies', 'Bioinformatics', 'Test Case'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/algorithmic-toolbox.jpeg',
      date: 'March 17, 2025'
    },
    {
      title: 'Neural Networks and Deep Learning',
      institution: "DeepLearning.AI",
      description: `Successfully completed a verified Course Certificate in Neural Networks and Deep Learning, demonstrating strong foundational knowledge in building and training deep neural networks. Achieved a grade of 97%. This course provided expertise in artificial neural networks, supervised learning, and performance tuning within the realm of deep learning, utilizing concepts from calculus, linear algebra, and Python programming.`,
      skills: ['Artificial Neural Networks', 'Deep Learning', 'Performance Tuning', 'Supervised Learning', 'Machine Learning', 'Calculus', 'Linear Algebra', 'Artificial Intelligence', 'Python Programming'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/neural-networks-deep-learning.jpeg',
      date: 'September 22, 2024'
    },
    {
      title: 'Gen AI Foundational Models for NLP & Language Understanding',
      institution: "IBM",
      description: `Successfully completed a verified Course Certificate in Gen AI Foundational Models for NLP & Language Understanding, demonstrating a strong grasp of transforming text into numerical features for NLP models, implementing Word2Vec, and developing neural network-based language models. Achieved a grade of 100%. This course also covered building sequence-to-sequence models with encoder-decoder RNNs for tasks like machine translation and sequence transformation.`,
      skills: ['PyTorch (Machine Learning Library)', 'Deep Learning', 'Artificial Neural Networks', 'Generative AI', 'Natural Language Processing', 'Machine Learning Methods', 'Feature Engineering', 'Text Mining', 'Large Language Modeling'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/gen-ai-foundational-models.jpeg',
      date: 'March 16, 2025'
    },
    {
      title: 'Version Control',
      institution: "Meta",
      description: `Successfully completed a verified Course Certificate in Version Control, demonstrating proficiency in implementing version control systems, navigating and configuring using the command line, and managing code revisions. Achieved a grade of 90.62%. This course also provided practical experience with GitHub repositories, including creation and usage.`,
      skills: ['Command-Line Interface', 'Github', 'Software Development', 'Unix Commands', 'Version Control', 'Linux', 'Git (Version Control System)', 'File Management', 'Web Development', 'Software Versioning', 'Software Development Tools', 'Linux Commands'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/version-control.jpeg',
      date: 'August 31, 2023'
    },
    {
      title: 'Java Programming: Solving Problems with Software',
      institution: "Duke University",
      description: `Successfully completed a verified Course Certificate in Java Programming: Solving Problems with Software, demonstrating strong proficiency in Java programming, object-oriented principles, and software problem-solving techniques. Achieved a grade of 96.42%. This course focused on developing skills in algorithms, data analysis, software design, and debugging within the Java environment.`,
      skills: ['Algorithms', 'Data Analysis', 'Java', 'Software Testing', 'Computer Programming', 'Software Design', 'Object Oriented Programming (OOP)', 'Data Processing', 'Integrated Development Environments', 'Debugging', 'Problem Solving', 'Statistical Analysis'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/java-programming.jpeg',
      date: 'March 28, 2023'
    },
    {
      title: 'Django Web Framework',
      institution: "Meta",
      description: `Successfully completed a verified Course Certificate in Django Web Framework, demonstrating strong proficiency in building web servers, data modeling, and implementing web security best practices. Achieved a grade of 93.16%. This course provided practical experience in back-end web development, including the use of Django, database management, and HTML for building web applications.`,
      skills: ['Web Servers', 'Django (Web Framework)', 'Database Management', 'Application Frameworks', 'Data Modeling', 'Back-End Web Development', 'Application Security', 'Hypertext Markup Language (HTML)', 'MySQL', 'Web Development', 'Web Applications', 'Database Development'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/django-web-framework.jpeg',
      date: 'September 22, 2023'
    },
    {
      title: 'Programming in Python',
      institution: "Meta",
      description: `Successfully completed a verified Course Certificate in Programming in Python, demonstrating strong foundational programming skills with Python syntax, including the use of objects, classes, and methods. Achieved a grade of 96.04%. This course provided expertise in object-oriented programming, software testing, debugging, and data structures within a Python development environment.`,
      skills: ['Development Environment', 'Django (Web Framework)', 'Software Testing', 'Computer Programming', 'Object Oriented Programming (OOP)', 'Unit Testing', 'Integrated Development Environments', 'Debugging', 'Programming Principles', 'Data Structures', 'Test Driven Development (TDD)', 'Python Programming'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/programming-in-python.jpeg',
      date: 'August 27, 2023'
    },
    {
      title: 'Introduction to Back-End Development',
      institution: "Meta",
      description: `Successfully completed a verified Course Certificate in Introduction to Back-End Development, demonstrating the ability to distinguish between front-end, back-end, and full-stack development roles, and to create and style webpages using HTML and CSS. Achieved a grade of 94.75%. This course also provided an understanding of the benefits of UI frameworks and foundational knowledge in web servers and general networking.`,
      skills: ['Web Servers', 'User Interface (UI)', 'Hypertext Markup Language (HTML)', 'General Networking', 'Bootstrap (Front-End Framework)', 'Full-Stack Web Development', 'React.js', 'Back-End Web Development', 'Cascading Style Sheets (CSS)', 'Front-End Web Development', 'JavaScript Frameworks', 'Responsive Web Design'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/introduction-to-backend.jpeg',
      date: 'April 24, 2023'
    },
    {
      title: 'Introduction to Databases for Back-End Development',
      institution: "Meta",
      description: `Successfully completed a verified Course Certificate in Introduction to Databases for Back-End Development, demonstrating a strong understanding of database concepts and principles, as well as the ability to plan and execute simple database development projects. Achieved a grade of 93%. This course provided foundational skills in database design, query languages (including SQL), and working with both relational and NoSQL databases.`,
      skills: ['Database Design', 'Databases', 'Query Languages', 'MySQL', 'Database Management Systems', 'Relational Databases', 'NoSQL', 'SQL'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/introduction-to-databases.jpeg',
      date: 'September 1, 2023'
    },
    {
      title: 'Learning How to Learn: Powerful mental tools to help you master tough subjects',
      institution: "Deep Teaching Solutions",
      description: `Successfully completed a verified Course Certificate in Learning How to Learn: Powerful mental tools to help you master tough subjects, demonstrating proficiency in effective learning strategies, time management, and cognitive flexibility. Achieved a grade of 97.30%. This course equipped me with valuable mental tools for mastering challenging subjects, enhancing productivity, problem-solving, and self-discipline.`,
      skills: ['Learning Strategies', 'Productivity', 'Willingness To Learn', 'Time Management', 'Human Learning', 'Mental Concentration', 'Problem Solving', 'Cognitive flexibility', 'Creativity', 'Stress Management', 'Self-Discipline', 'Growth Mindedness'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/learning-how-to-learn.jpeg',
      date: 'March 25, 2023'
    },
    {
      title: 'APIs',
      institution: "Meta",
      description: `Successfully completed a verified Course Certificate in APIs, demonstrating proficiency in API development, principles of REST architecture, and building basic APIs. Achieved a grade of 86.36%. This course provided practical skills in API design, performance tuning, data validation, authorization, and working with JSON and XML, alongside debugging and software documentation.`,
      skills: ['Django', 'XML', 'API Design', 'Performance Tuning', 'Data Validation', 'Authorizatio', 'Restful API', 'JSON', 'Debugging', 'Application Programming Interface (API)', 'Software Documentation', 'Test Tools'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93', // URL from the first certificate
      image: '/certificates/apis.jpeg',
      date: 'October 14, 2023'
    },
    {
      title: 'Foundations: Data, Data, Everywhere',
      institution: "Google",
      description: `Successfully completed a verified Course Certificate in Foundations: Data, Data, Everywhere, demonstrating a strong foundational understanding of data analytics concepts, including data ecosystems, analytical thinking, and the roles of spreadsheets, query languages, and data visualization tools. Achieved a grade of 92.87%. This course also covered the role of a data analyst and data ethics.`,
      skills: ['Data Cleansing', 'Spreadsheet Software', 'Data Management', 'Data Analysis', 'Data Ethics', 'Data Processing', 'Data-Driven Decision-Making', 'Data Visualization', 'Google Sheets', 'Analytical Skills', 'Data Sharing', 'Data Visualization Software'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93',
      image: '/certificates/data-analysis-foundations.jpeg', // Assuming a relevant image name
      date: 'February 1, 2022'
    },
    {
      title: 'Technical Support Fundamentals',
      institution: "Google",
      description: `Successfully completed a verified Course Certificate in Technical Support Fundamentals, demonstrating a comprehensive understanding of core technical support concepts, including operating systems, computer networking, and software installation. Achieved a grade of 100%. This course provided essential skills in customer support, technical communication, and foundational knowledge of computer hardware and architecture across various operating systems like Windows and Linux.`,
      skills: ['Information Technology', 'Operating Systems', 'Technical Communication', 'Computer Networking', 'Software Installation', 'Customer Support', 'Technical Support', 'End User Training and Support', 'Computer Architecture', 'Microsoft Windows', 'Computer Hardware', 'Linux'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93',
      image: '/certificates/technical-support-fundamentals.jpeg', // Assuming a relevant image name
      date: 'February 1, 2022'
    },
    {
      title: 'Introduction to Artificial Intelligence (AI)',
      institution: "IBM",
      description: `Successfully completed a verified Course Certificate in Introduction to Artificial Intelligence (AI), demonstrating an understanding of fundamental AI concepts, applications across various domains, and core principles of machine learning, deep learning, and neural networks. Achieved a grade of 91.66%. This course also covered the role of generative AI in business operations, identifying innovation opportunities, and designing ethical generative AI solutions for organizational challenges.`,
      skills: ['Natural Language Processing', 'Generative AI', 'ChatGPT'],
      courseraUrl: 'https://coursera.org/share/63440a205d4aabb6773832044c5d0d93',
      image: '/certificates/introduction-to-artificial-intelligence.jpeg',
      date: 'February 26, 2023'
    },
    {
      title: 'Python Essentials for MLOps',    
      institution: "Duke University",
      description: `Completed with a grade of 94%. Wrote, ran and debugged tests using Pytest. Interacted with APIs and SDKs to build command-line tools and HTTP APIs to solve and automate Machine Learning problems.`,
      skills: ['Command-Line Interface',
'Software Testing',
'Test Automation',
'Data Manipulation',
'NumPy',
'Machine Learning',
'Data Import/Export',
'Program Development',
'Scripting',
'MLOps',
'Pandas'],
      courseraUrl: 'https://coursera.org/share/e0df2ef182ae3dd90470d2b45359cbdf',
      image: '/certificates/python-essentials-mlops.png',
      date: 'Jul 3, 2025'
    }
];

export default certificates;