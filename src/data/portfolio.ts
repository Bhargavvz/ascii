import { PersonalInfo, Project, Skill, Experience, Command } from '@/types/portfolio';

export const personalInfo: PersonalInfo = {
  name: "Alex Thompson",
  title: "Full Stack Developer & DevOps Engineer",
  bio: "Passionate developer with 5+ years of experience building scalable web applications and ML systems. Enthusiast of clean code, automation, and innovative terminal interfaces. Always exploring the intersection of technology and user experience.",
  location: "San Francisco, CA",
  contact: {
    email: "alex.thompson@developer.com",
    github: "https://github.com/alex-dev",
    linkedin: "https://linkedin.com/in/alex-thompson-dev",
    website: "https://alexthompson.dev"
  }
};

export const skills: Skill[] = [
  { name: "JavaScript", level: 95, category: "Programming" },
  { name: "TypeScript", level: 90, category: "Programming" },
  { name: "React", level: 88, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "Node.js", level: 82, category: "Backend" },
  { name: "Python", level: 80, category: "Programming" },
  { name: "PostgreSQL", level: 75, category: "Database" },
  { name: "MongoDB", level: 70, category: "Database" },
  { name: "Docker", level: 68, category: "DevOps" },
  { name: "AWS", level: 65, category: "Cloud" }
];

export const projects: Project[] = [
  {
    id: "ascii-portfolio",
    name: "ASCII Art Portfolio Terminal",
    description: "An innovative terminal-style portfolio that showcases projects through ASCII art and interactive command-line interface. Features real-time ASCII generation, multiple themes, and a fully functional file system simulator.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "FIGlet", "Framer Motion", "React Hooks"],
    githubUrl: "https://github.com/ascii-dev/ascii-portfolio",
    liveUrl: "https://ascii-portfolio.vercel.app",
    features: [
      "Interactive terminal interface with 20+ commands",
      "Real-time ASCII art generation using FIGlet",
      "File system navigation simulation",
      "Multiple color themes (Matrix, Amber, Blue, Classic)",
      "Responsive design optimized for all devices",
      "Command history and tab completion",
      "Matrix effect easter egg",
      "Typewriter animations and smooth transitions",
      "SEO optimized with proper metadata"
    ],
    architecture: `
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   ASCII Utils   │    │   Data Layer    │
│   (Next.js 15)  │◄──►│   (FIGlet API)  │◄──►│   (TypeScript)  │
│   - Terminal UI │    │   - Art Gen     │    │   - Portfolio   │
│   - Animations  │    │   - Themes      │    │   - File System │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │   Utilities     │    │   State Mgmt    │
│   - Terminal    │    │   - Commands    │    │   - React State │
│   - ASCII Art   │    │   - File Ops    │    │   - Local Cache │
│   - Loading     │    │   - Animations  │    │   - Theme Store │
└─────────────────┘    └─────────────────┘    └─────────────────┘
    `
  },
  {
    id: "fullstack-ecommerce",
    name: "Enterprise E-Commerce Platform",
    description: "Scalable full-stack e-commerce solution with microservices architecture, real-time inventory management, and advanced analytics. Handles 100k+ daily transactions with 99.9% uptime.",
    technologies: ["Node.js", "Express", "React", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "Stripe API"],
    githubUrl: "https://github.com/ascii-dev/fullstack-ecommerce",
    liveUrl: "https://ecommerce-demo.example.com",
    features: [
      "JWT-based authentication with refresh tokens",
      "Advanced product catalog with search & filters",
      "Real-time order tracking and notifications",
      "Multi-vendor marketplace support",
      "Stripe payment integration with webhook handling",
      "Admin dashboard with analytics & reports",
      "Automated inventory management",
      "RESTful API with comprehensive documentation",
      "CI/CD pipeline with automated testing",
      "Redis caching for improved performance"
    ],
    architecture: `
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│   Auth   │   │ Products │   │  Orders  │   │ Payment  │
│ Service  │   │ Service  │   │ Service  │   │ Service  │
│  :3001   │   │  :3002   │   │  :3003   │   │  :3004   │
└────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘
     │              │              │              │
     └──────────────┼──────────────┼──────────────┘
                    │              │
            ┌───────▼──────────────▼───────┐
            │     API Gateway (Nginx)     │
            │         Load Balancer       │
            └─────────────┬───────────────┘
                          │
            ┌─────────────▼───────────────┐
            │     React Frontend          │
            │   (Next.js with SSR)        │
            └─────────────────────────────┘
    `
  },
  {
    id: "ai-image-classifier",
    name: "AI-Powered Image Classification System",
    description: "Deep learning model for real-time image classification with 96.5% accuracy. Features custom CNN architecture, data augmentation pipeline, and scalable inference API with model versioning.",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "FastAPI", "Docker", "MLflow", "AWS S3", "PostgreSQL"],
    githubUrl: "https://github.com/ascii-dev/ai-image-classifier",
    liveUrl: "https://ml-classifier-api.example.com",
    features: [
      "Custom CNN architecture with attention mechanisms",
      "Real-time image preprocessing pipeline",
      "Batch processing for bulk classification",
      "Model versioning and A/B testing framework",
      "RESTful API with FastAPI and automatic docs",
      "Performance monitoring and drift detection",
      "Data augmentation with custom transforms",
      "Confidence scoring and uncertainty estimation",
      "Docker containerization for easy deployment",
      "Integration with cloud storage and databases"
    ],
    architecture: `
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Image     │──►│ Preprocessing│──►│   Model     │
│   Upload    │   │   Pipeline   │   │ Inference   │
│   (FastAPI) │   │  (OpenCV)    │   │(TensorFlow) │
└─────────────┘   └─────────────┘   └─────────────┘
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Validation │   │ Data Aug &  │   │ Post Proc & │
│  & Storage  │   │ Transforms  │   │ Confidence  │
│   (AWS S3)  │   │  Pipeline   │   │   Scoring   │
└─────────────┘   └─────────────┘   └─────────────┘
       │                                   │
       ▼                                   ▼
┌─────────────────────────────────────────────────┐
│           Results Database (PostgreSQL)        │
│        MLflow Model Registry & Tracking        │
└─────────────────────────────────────────────────┘
    `
  },
  {
    id: "devops-automation",
    name: "DevOps Automation Suite",
    description: "Comprehensive DevOps automation platform with CI/CD pipelines, infrastructure as code, monitoring, and automated deployment strategies. Reduces deployment time by 80% and improves reliability.",
    technologies: ["Terraform", "Ansible", "Jenkins", "Docker", "Kubernetes", "Prometheus", "Grafana", "AWS", "Python", "Bash"],
    githubUrl: "https://github.com/ascii-dev/devops-automation",
    features: [
      "Infrastructure as Code with Terraform",
      "Automated CI/CD pipelines with Jenkins",
      "Blue-green deployment strategies",
      "Container orchestration with Kubernetes",
      "Application and infrastructure monitoring",
      "Automated backup and disaster recovery",
      "Security scanning and compliance checks",
      "Cost optimization and resource management",
      "Multi-environment management (dev/staging/prod)",
      "Slack integration for notifications"
    ],
    architecture: `
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Developer  │──►│  Git Repo   │──►│  Jenkins    │
│    Push     │   │  (GitHub)   │   │  Pipeline   │
└─────────────┘   └─────────────┘   └─────────────┘
                                           │
                                           ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Terraform  │◄──│   Build &   │──►│   Docker    │
│   Deploy    │   │    Test     │   │   Registry  │
└─────────────┘   └─────────────┘   └─────────────┘
       │                                   │
       ▼                                   ▼
┌─────────────┐                    ┌─────────────┐
│ Kubernetes  │                    │ Monitoring  │
│  Cluster    │◄───────────────────│ (Prometheus │
│ (AWS EKS)   │                    │ + Grafana)  │
└─────────────┘                    └─────────────┘
    `
  }
];

export const experience: Experience[] = [
  {
    company: "Tech Innovations Inc.",
    position: "Senior Full Stack Developer",
    duration: "2022 - Present",
    description: [
      "Led development of microservices architecture serving 100k+ daily users",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored junior developers and conducted code reviews",
      "Architected scalable solutions using cloud-native technologies"
    ],
    technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"]
  },
  {
    company: "StartupXYZ",
    position: "Frontend Developer",
    duration: "2020 - 2022",
    description: [
      "Built responsive web applications using modern JavaScript frameworks",
      "Optimized application performance achieving 95+ Lighthouse scores",
      "Collaborated with design team to implement pixel-perfect UIs",
      "Integrated third-party APIs and payment processing systems"
    ],
    technologies: ["Vue.js", "TypeScript", "Tailwind CSS", "Firebase"]
  },
  {
    company: "Digital Agency Co.",
    position: "Junior Developer",
    duration: "2019 - 2020",
    description: [
      "Developed client websites using HTML, CSS, and JavaScript",
      "Maintained WordPress sites and custom plugins",
      "Participated in agile development processes",
      "Learned modern development practices and version control"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "WordPress", "Git"]
  }
];

export const commands: Command[] = [
  {
    name: "help",
    description: "Show available commands",
    usage: "help [command]",
    aliases: ["h", "?"]
  },
  {
    name: "ls",
    description: "List directory contents",
    usage: "ls [path]",
    aliases: ["list", "dir"]
  },
  {
    name: "cd",
    description: "Change directory",
    usage: "cd <path>",
    aliases: ["chdir"]
  },
  {
    name: "cat",
    description: "Display file contents",
    usage: "cat <filename>",
    aliases: ["view", "show"]
  },
  {
    name: "pwd",
    description: "Print working directory",
    usage: "pwd",
    aliases: ["path"]
  },
  {
    name: "whoami",
    description: "Display user information",
    usage: "whoami",
    aliases: ["user", "info"]
  },
  {
    name: "skills",
    description: "Show technical skills",
    usage: "skills [category]",
    aliases: ["tech", "stack"]
  },
  {
    name: "projects",
    description: "List all projects",
    usage: "projects [project-id]",
    aliases: ["work", "portfolio"]
  },
  {
    name: "experience",
    description: "Show work experience",
    usage: "experience",
    aliases: ["work", "career", "jobs"]
  },
  {
    name: "contact",
    description: "Display contact information",
    usage: "contact",
    aliases: ["reach", "connect"]
  },
  {
    name: "clear",
    description: "Clear terminal screen",
    usage: "clear",
    aliases: ["cls", "clean"]
  },
  {
    name: "theme",
    description: "Change terminal theme",
    usage: "theme <theme-name>",
    aliases: ["color", "style"]
  },
  {
    name: "matrix",
    description: "Show matrix effect (Easter egg)",
    usage: "matrix",
    aliases: ["hack", "neo"]
  },
  {
    name: "ascii",
    description: "Generate ASCII art",
    usage: "ascii <text> [font]",
    aliases: ["art", "figlet"]
  }
];

export const fileSystem = {
  "/": {
    "home": {
      "portfolio": {
        "README.md": "Welcome to my ASCII Portfolio! Use 'help' to see available commands.",
        "about.txt": `${personalInfo.bio}\n\nLocation: ${personalInfo.location}\nTitle: ${personalInfo.title}`,
        "projects": {
          "ascii-portfolio": {
            "README.md": projects[0].description,
            "tech-stack.txt": projects[0].technologies.join(", "),
            "features.txt": projects[0].features.join("\n"),
            "architecture.txt": projects[0].architecture
          },
          "ecommerce-api": {
            "README.md": projects[1].description,
            "tech-stack.txt": projects[1].technologies.join(", "),
            "features.txt": projects[1].features.join("\n"),
            "architecture.txt": projects[1].architecture
          },
          "ml-classifier": {
            "README.md": projects[2].description,
            "tech-stack.txt": projects[2].technologies.join(", "),
            "features.txt": projects[2].features.join("\n"),
            "architecture.txt": projects[2].architecture
          }
        },
        "skills": {
          "programming.txt": skills.filter(s => s.category === "Programming").map(s => `${s.name}: ${s.level}%`).join("\n"),
          "frontend.txt": skills.filter(s => s.category === "Frontend").map(s => `${s.name}: ${s.level}%`).join("\n"),
          "backend.txt": skills.filter(s => s.category === "Backend").map(s => `${s.name}: ${s.level}%`).join("\n"),
          "database.txt": skills.filter(s => s.category === "Database").map(s => `${s.name}: ${s.level}%`).join("\n"),
          "devops.txt": skills.filter(s => s.category === "DevOps").map(s => `${s.name}: ${s.level}%`).join("\n"),
          "cloud.txt": skills.filter(s => s.category === "Cloud").map(s => `${s.name}: ${s.level}%`).join("\n")
        },
        "contact.txt": `Email: ${personalInfo.contact.email}\nGitHub: ${personalInfo.contact.github}\nLinkedIn: ${personalInfo.contact.linkedin}\nWebsite: ${personalInfo.contact.website || 'N/A'}`,
        "resume.txt": `
${personalInfo.name}
${personalInfo.title}
${personalInfo.location}

CONTACT:
${personalInfo.contact.email}
${personalInfo.contact.github}
${personalInfo.contact.linkedin}

EXPERIENCE:
${experience.map(exp => `
${exp.position} at ${exp.company} (${exp.duration})
${exp.description.map(desc => `• ${desc}`).join('\n')}
Technologies: ${exp.technologies.join(', ')}
`).join('\n')}

SKILLS:
${skills.map(skill => `${skill.name}: ${skill.level}% (${skill.category})`).join('\n')}
        `
      }
    }
  }
};