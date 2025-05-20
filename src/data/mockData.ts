import { Job } from '../context/JobsContext';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: '$90,000 - $120,000',
    description: 'We are looking for an experienced Frontend Developer to join our team and help us build amazing user experiences. You will be working with our design and backend teams to implement responsive web applications.',
    requirements: [
      'Proficient in JavaScript, HTML, and CSS',
      '3+ years of experience with React.js',
      'Experience with modern frontend tools and workflows',
      'Strong problem-solving skills',
      'Excellent communication and teamwork abilities'
    ],
    postedDate: '2025-03-15T08:00:00Z',
    employerId: '2',
    logoUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    type: 'full-time',
    salary: '$85,000 - $110,000',
    description: 'Join our creative team as a UX/UI Designer and help us create beautiful, intuitive interfaces for our clients. You will work closely with product managers and developers to deliver exceptional user experiences.',
    requirements: [
      'Strong portfolio demonstrating UI/UX skills',
      'Proficiency in design tools like Figma or Adobe XD',
      'Understanding of user-centered design principles',
      'Experience with interactive prototyping',
      'Good communication and presentation skills'
    ],
    postedDate: '2025-03-16T10:30:00Z',
    employerId: '3',
    logoUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'DataSystems Inc.',
    location: 'Remote',
    type: 'full-time',
    salary: '$95,000 - $130,000',
    description: 'We are seeking a talented Backend Developer to design and implement scalable server-side applications. You will be responsible for the data architecture and API development for our growing platform.',
    requirements: [
      'Strong experience with Node.js, Python, or Java',
      'Knowledge of database systems (SQL and NoSQL)',
      'Experience with API design and microservices',
      'Understanding of cloud infrastructure (AWS, Azure, or GCP)',
      'Ability to write clean, maintainable code'
    ],
    postedDate: '2025-03-14T14:45:00Z',
    employerId: '4',
    logoUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'GrowthMarket',
    location: 'Chicago, IL',
    type: 'part-time',
    salary: '$30 - $40 per hour',
    description: 'We are looking for a part-time Marketing Specialist to help grow our brand presence and lead generation efforts. This role will involve creating content, managing social media, and analyzing campaign performance.',
    requirements: [
      'Bachelor\'s degree in Marketing or related field',
      'Experience with social media marketing and content creation',
      'Familiarity with marketing analytics tools',
      'Strong writing and communication skills',
      'Creative thinking and problem-solving abilities'
    ],
    postedDate: '2025-03-10T09:15:00Z',
    employerId: '5',
    logoUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Austin, TX',
    type: 'full-time',
    salary: '$110,000 - $140,000',
    description: 'Join our product team as a Product Manager to help define and execute our product strategy. You will work with cross-functional teams to deliver innovative solutions that meet user needs and business objectives.',
    requirements: [
      '5+ years of experience in product management',
      'Strong understanding of product development lifecycle',
      'Experience with agile methodologies',
      'Excellent analytical and problem-solving skills',
      'Superb communication and leadership abilities'
    ],
    postedDate: '2025-03-12T11:20:00Z',
    employerId: '6',
    logoUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Seattle, WA',
    type: 'remote',
    salary: '$100,000 - $135,000',
    description: 'We are seeking a skilled Data Scientist to join our team and help extract valuable insights from complex datasets. You will be responsible for developing machine learning models and predictive analytics solutions.',
    requirements: [
      'Advanced degree in Computer Science, Statistics, or related field',
      'Strong experience with Python and data science libraries',
      'Knowledge of machine learning algorithms and statistical modeling',
      'Experience with big data technologies',
      'Excellent problem-solving and communication skills'
    ],
    postedDate: '2025-03-08T13:40:00Z',
    employerId: '7',
    logoUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '7',
    title: 'Customer Support Specialist',
    company: 'ServiceFirst',
    location: 'Miami, FL',
    type: 'part-time',
    salary: '$25 - $35 per hour',
    description: 'Join our customer support team to provide exceptional service to our clients. You will handle inquiries, resolve issues, and ensure customer satisfaction through various communication channels.',
    requirements: [
      'Previous experience in customer service',
      'Excellent communication and interpersonal skills',
      'Problem-solving abilities and patience',
      'Familiarity with CRM systems',
      'Ability to work under pressure and prioritize tasks'
    ],
    postedDate: '2025-03-17T09:00:00Z',
    employerId: '8',
    logoUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '8',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'Denver, CO',
    type: 'contract',
    salary: '$60 - $75 per hour',
    description: 'We are looking for a DevOps Engineer to help streamline our development and deployment processes. You will be responsible for implementing CI/CD pipelines and managing cloud infrastructure.',
    requirements: [
      'Experience with CI/CD tools (Jenkins, GitLab CI, etc.)',
      'Knowledge of cloud platforms (AWS, Azure, or GCP)',
      'Familiarity with containerization (Docker, Kubernetes)',
      'Infrastructure as Code experience (Terraform, CloudFormation)',
      'Strong scripting skills (Bash, Python)'
    ],
    postedDate: '2025-03-11T15:30:00Z',
    employerId: '9',
    logoUrl: 'https://via.placeholder.com/150'
  }
];