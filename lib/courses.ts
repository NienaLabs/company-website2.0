export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  students: number;
  instructors: {
    name: string;
    title: string;
    avatar: string;
  }[];
  curriculum: {
    week: number;
    title: string;
    topics: string[];
  }[];
  skills: string[];
  badge: string;
  badgeColor: string;
  featured: boolean;
}

const nienaInstructors = [
  {
    name: 'Adomako Yaw',
    title: '@ Niena Labs',
    avatar: '/avatars/adomako.jpg',
  },
  {
    name: 'Williams Adusei',
    title: '@ Niena Labs',
    avatar: '/avatars/williams.jpg',
  }
];

export const courses: Course[] = [
  {
    id: '1',
    slug: 'web-development',
    title: 'Full-Stack Web Development',
    description: 'Master HTML, CSS, JavaScript, React, Node.js and build production-grade web apps from scratch.',
    longDescription: 'This comprehensive bootcamp takes you from complete beginner to professional full-stack developer. You\'ll build real projects, learn modern frameworks, and gain the practical skills employers are actively hiring for. By the end, you\'ll have a portfolio of 5+ deployed web applications.',
    category: 'Development',
    level: 'Beginner',
    duration: '16 weeks',
    lessons: 120,
    price: 1,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 3241,
    students: 12847,
    instructors: nienaInstructors,
    curriculum: [
      { week: 1, title: 'HTML & CSS Fundamentals', topics: ['HTML5 semantics', 'CSS Grid & Flexbox', 'Responsive design', 'CSS animations'] },
      { week: 2, title: 'JavaScript Essentials', topics: ['ES6+ syntax', 'DOM manipulation', 'Async/await', 'Fetch API'] },
      { week: 3, title: 'React & State Management', topics: ['React hooks', 'Context API', 'React Router', 'Performance optimization'] },
      { week: 4, title: 'Backend with Node.js', topics: ['Express.js', 'REST APIs', 'Authentication', 'JWT & sessions'] },
      { week: 5, title: 'Databases', topics: ['PostgreSQL basics', 'Prisma ORM', 'MongoDB', 'Data modeling'] },
      { week: 6, title: 'Deployment & DevOps', topics: ['Docker basics', 'CI/CD pipelines', 'Vercel & Railway', 'Domain & SSL'] },
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs', 'Git', 'Docker'],
    badge: 'Most Popular',
    badgeColor: 'purple',
    featured: true,
  },
  {
    id: '2',
    slug: 'data-science',
    title: 'Data Science & Analytics',
    description: 'Learn Python, pandas, visualization, statistics, and machine learning to analyze and present data professionally.',
    longDescription: 'Dive deep into the world of data science. This bootcamp covers everything from data wrangling and exploratory analysis to building predictive models and deploying ML pipelines. You\'ll work with real-world datasets from finance, healthcare, and e-commerce.',
    category: 'Data',
    level: 'Intermediate',
    duration: '14 weeks',
    lessons: 98,
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 2105,
    students: 8932,
    instructors: nienaInstructors,
    curriculum: [
      { week: 1, title: 'Python for Data Science', topics: ['NumPy', 'Pandas', 'Data cleaning', 'File handling'] },
      { week: 2, title: 'Exploratory Data Analysis', topics: ['Matplotlib', 'Seaborn', 'Statistical thinking', 'Outlier detection'] },
      { week: 3, title: 'Machine Learning Fundamentals', topics: ['Scikit-learn', 'Regression', 'Classification', 'Model evaluation'] },
      { week: 4, title: 'Advanced ML & Deep Learning', topics: ['Neural networks', 'TensorFlow basics', 'NLP intro', 'Feature engineering'] },
    ],
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Tableau', 'SQL', 'Statistics'],
    badge: 'High Demand',
    badgeColor: 'cyan',
    featured: true,
  },
  {
    id: '3',
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    description: 'Build and deploy AI models. From classical ML to transformers and LLMs — become an AI engineer.',
    longDescription: 'The most comprehensive AI engineering bootcamp available. You\'ll learn the math behind ML, build neural networks from scratch, fine-tune large language models, and deploy AI APIs to production. This is the bootcamp for the next generation of AI builders.',
    category: 'AI',
    level: 'Advanced',
    duration: '20 weeks',
    lessons: 145,
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 1876,
    students: 5420,
    instructors: nienaInstructors,
    curriculum: [
      { week: 1, title: 'Math for ML', topics: ['Linear algebra', 'Calculus', 'Probability', 'Statistics'] },
      { week: 2, title: 'Deep Learning', topics: ['PyTorch', 'CNNs', 'RNNs', 'Transformers'] },
      { week: 3, title: 'LLMs & Generative AI', topics: ['Fine-tuning GPT', 'RAG systems', 'Prompt engineering', 'LangChain'] },
      { week: 4, title: 'MLOps & Deployment', topics: ['Model serving', 'FastAPI', 'Docker', 'Cloud deployment'] },
    ],
    skills: ['PyTorch', 'TensorFlow', 'LangChain', 'FastAPI', 'Python', 'MLOps', 'Hugging Face'],
    badge: 'Cutting Edge',
    badgeColor: 'orange',
    featured: true,
  },
  {
    id: '4',
    slug: 'ui-ux-design',
    title: 'UI/UX Design Mastery',
    description: 'Design beautiful, user-centered products. Figma, design systems, prototyping, and user research.',
    longDescription: 'Become the designer every team wants. This bootcamp covers the full design process — from user research and wireframing to polished high-fidelity mockups and interactive prototypes. You\'ll build a professional portfolio and learn to present your work like a pro.',
    category: 'Design',
    level: 'Beginner',
    duration: '12 weeks',
    lessons: 80,
    price: 749,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 2890,
    students: 9104,
    instructors: nienaInstructors,
    curriculum: [
      { week: 1, title: 'Design Fundamentals', topics: ['Color theory', 'Typography', 'Layout', 'Visual hierarchy'] },
      { week: 2, title: 'Figma Mastery', topics: ['Components', 'Auto-layout', 'Variables', 'Design systems'] },
      { week: 3, title: 'User Research', topics: ['User interviews', 'Personas', 'Journey mapping', 'Usability testing'] },
    ],
    skills: ['Figma', 'Prototyping', 'Design Systems', 'User Research', 'Wireframing', 'Accessibility'],
    badge: 'Trending',
    badgeColor: 'green',
    featured: false,
  },
  {
    id: '5',
    slug: 'digital-marketing',
    title: 'Digital Marketing Pro',
    description: 'SEO, paid ads, social media, email marketing — become a full-stack marketer driving real growth.',
    longDescription: 'Learn the exact strategies top marketers use to grow brands from 0 to millions. This hands-on bootcamp covers every channel — from organic SEO to paid acquisition — with real campaigns, real budgets, and real results.',
    category: 'Marketing',
    level: 'Beginner',
    duration: '10 weeks',
    lessons: 72,
    price: 599,
    originalPrice: 899,
    rating: 4.7,
    reviews: 1543,
    students: 7230,
    instructors: nienaInstructors,
    curriculum: [
      { week: 1, title: 'SEO & Content', topics: ['Keyword research', 'On-page SEO', 'Content strategy', 'Link building'] },
      { week: 2, title: 'Paid Advertising', topics: ['Google Ads', 'Meta Ads', 'Budget optimization', 'A/B testing'] },
      { week: 3, title: 'Social & Email', topics: ['Social media strategy', 'Email sequences', 'Automation', 'Analytics'] },
    ],
    skills: ['Google Ads', 'SEO', 'Meta Ads', 'Email Marketing', 'Analytics', 'Copywriting', 'A/B Testing'],
    badge: 'Best Value',
    badgeColor: 'green',
    featured: false,
  },
  {
    id: '6',
    slug: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    description: 'Learn offensive and defensive security. Penetration testing, threat analysis, and security engineering.',
    longDescription: 'Join one of the fastest-growing fields in tech. This bootcamp covers both the offensive (ethical hacking, pen testing) and defensive (threat analysis, SOC operations) sides of cybersecurity. Prepare for certifications like CompTIA Security+ and CEH.',
    category: 'Security',
    level: 'Intermediate',
    duration: '18 weeks',
    lessons: 130,
    price: 1099,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 987,
    students: 3420,
    instructors: nienaInstructors,
    curriculum: [
      { week: 1, title: 'Security Fundamentals', topics: ['Networking', 'Linux', 'Cryptography', 'OWASP Top 10'] },
      { week: 2, title: 'Ethical Hacking', topics: ['Reconnaissance', 'Vulnerability scanning', 'Exploitation', 'Metasploit'] },
      { week: 3, title: 'Defensive Security', topics: ['Firewalls', 'IDS/IPS', 'Incident response', 'SIEM tools'] },
    ],
    skills: ['Kali Linux', 'Wireshark', 'Metasploit', 'Python', 'Network Security', 'Penetration Testing'],
    badge: 'High Salary',
    badgeColor: 'orange',
    featured: false,
  },
];
