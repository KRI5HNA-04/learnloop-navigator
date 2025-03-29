
export interface Technology {
  id: string;
  title: string;
  description: string;
  students: number;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  icon: 'ml' | 'react' | 'java' | 'python' | 'js' | 'cloud' | 'mobile' | 'blockchain' | 'ai' | 'devops';
}

export const technologies: Technology[] = [
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    description: "Learn the core concepts of machine learning and AI algorithms.",
    students: 15000,
    lessons: 24,
    difficulty: "Intermediate",
    color: "bg-purple-100",
    icon: "ml"
  },
  {
    id: "react-development",
    title: "React Development",
    description: "Master modern React with hooks, context API and more.",
    students: 25000,
    lessons: 32,
    difficulty: "Beginner",
    color: "bg-blue-100",
    icon: "react"
  },
  {
    id: "java-programming",
    title: "Java Programming",
    description: "Build robust applications with Java programming language.",
    students: 20000,
    lessons: 28,
    difficulty: "Advanced",
    color: "bg-green-100",
    icon: "java"
  },
  {
    id: "python",
    title: "Python Programming",
    description: "Learn Python from basics to advanced concepts and applications.",
    students: 30000,
    lessons: 36,
    difficulty: "Beginner",
    color: "bg-yellow-100",
    icon: "python"
  },
  {
    id: "javascript",
    title: "JavaScript Essentials",
    description: "Master the language of the web with modern JavaScript.",
    students: 28000,
    lessons: 30,
    difficulty: "Beginner",
    color: "bg-amber-100",
    icon: "js"
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Computing",
    description: "Deploy and scale applications on Amazon Web Services.",
    students: 12000,
    lessons: 28,
    difficulty: "Intermediate",
    color: "bg-orange-100",
    icon: "cloud"
  },
  {
    id: "flutter-mobile",
    title: "Flutter Mobile Development",
    description: "Build cross-platform mobile apps with Flutter framework.",
    students: 18000,
    lessons: 34,
    difficulty: "Intermediate",
    color: "bg-blue-100",
    icon: "mobile"
  },
  {
    id: "blockchain",
    title: "Blockchain Technology",
    description: "Understand the fundamentals of blockchain and cryptocurrencies.",
    students: 8000,
    lessons: 22,
    difficulty: "Advanced",
    color: "bg-indigo-100",
    icon: "blockchain"
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "Dive into AI concepts, neural networks and deep learning.",
    students: 14000,
    lessons: 30,
    difficulty: "Advanced",
    color: "bg-purple-100",
    icon: "ai"
  },
  {
    id: "devops",
    title: "DevOps Engineering",
    description: "Learn CI/CD, containerization and infrastructure as code.",
    students: 10000,
    lessons: 26,
    difficulty: "Intermediate",
    color: "bg-slate-100",
    icon: "devops"
  }
];
