import { PersonalInfo, Project, Skill, Experience, Command } from '@/types/portfolio';

export const personalInfo: PersonalInfo = {
  name: "Guduru Bhavana Reddy",
  title: "B.Tech Computer Science Student & Full Stack Developer",
  bio: "Passionate Computer Science student with expertise in Machine Learning, Web Development, and Software Engineering. Currently pursuing B.Tech at CMR College of Engineering & Technology with hands-on experience in Python, React, and AI/ML projects.",
  location: "Medchal, Hyderabad, Telangana, India",
  contact: {
    email: "bhavanareddy240205@gmail.com",
    github: "https://github.com/bhavvzs",
    linkedin: "https://linkedin.com/in/bhavana-guduru",
    website: "https://bhavana-portfolio.vercel.app"
  }
};

export const skills: Skill[] = [
  { name: "Python", level: 95, category: "Programming" },
  { name: "JavaScript", level: 88, category: "Programming" },
  { name: "TypeScript", level: 85, category: "Programming" },
  { name: "Java", level: 80, category: "Programming" },
  { name: "C", level: 75, category: "Programming" },
  { name: "React", level: 90, category: "Frontend" },
  { name: "HTML/CSS", level: 92, category: "Frontend" },
  { name: "Tailwind CSS", level: 88, category: "Frontend" },
  { name: "Node.js", level: 82, category: "Backend" },
  { name: "Express.js", level: 80, category: "Backend" },
  { name: "Flask", level: 85, category: "Backend" },
  { name: "Spring Boot", level: 75, category: "Backend" },
  { name: "TensorFlow", level: 90, category: "Machine Learning" },
  { name: "OpenCV", level: 85, category: "Machine Learning" },
  { name: "CNN", level: 88, category: "Machine Learning" },
  { name: "MySQL", level: 80, category: "Database" },
  { name: "PostgreSQL", level: 78, category: "Database" },
  { name: "MongoDB", level: 82, category: "Database" },
  { name: "Supabase", level: 85, category: "Database" },
  { name: "Firebase", level: 80, category: "Database" }
];

export const projects: Project[] = [
  {
    id: "mask-detection",
    name: "Mask Detection System",
    description: "Engineered an end-to-end mask detection system achieving 97% accuracy by leveraging transfer learning on MobileNetV2 architecture. Trained on over 8,000 face images, applying data augmentation to improve accuracy by 15%.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "REST API", "Machine Learning"],
    githubUrl: "https://github.com/bhavvzs/MaskDetection",
    features: [
      "97% accuracy using MobileNetV2 transfer learning",
      "Trained on 8,000+ face images with data augmentation",
      "Real-time mask detection from camera feed",
      "RESTful API endpoints with Flask",
      "Handles 50+ requests per minute",
      "Average response time of 120ms",
      "Data augmentation improving accuracy by 15%",
      "Optimized for deployment and scalability"
    ],
    architecture: `
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Camera    │──►│ Face Detection│──►│ Mask Predict│
│   Input     │   │   (OpenCV)   │   │ (MobileNet) │
└─────────────┘   └─────────────┘   └─────────────┘
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Preprocessing│   │ Data Augment│   │ Results API │
│  & Scaling  │   │ & Training  │   │   (Flask)   │
└─────────────┘   └─────────────┘   └─────────────┘
    `
  },
  {
    id: "hand-sign-recognition",
    name: "Hand Sign Recognition System",
    description: "Developed a real-time hand sign recognition system achieving 94% accuracy using TensorFlow and CNN architecture. Processed and augmented over 10,000 hand gesture images to train a robust model capable of recognizing 25+ distinct sign language gestures.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "HTML/CSS", "CNN"],
    githubUrl: "https://github.com/bhavvzs/HandSignDetection",
    features: [
      "94% accuracy using CNN architecture",
      "Recognizes 25+ distinct sign language gestures",
      "Real-time processing at 30+ FPS",
      "Trained on 10,000+ hand gesture images",
      "Optimized inference time reduced by 40%",
      "Responsive Flask web application",
      "Model optimization with quantization and pruning",
      "Accessible to 100+ daily users"
    ],
    architecture: `
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Video Feed │──►│ Hand Detect  │──►│ Gesture     │
│  (Camera)   │   │  (OpenCV)   │   │ Recognition │
└─────────────┘   └─────────────┘   └─────────────┘
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Frame Proc  │   │ CNN Model   │   │ Web Interface│
│ & Feature   │   │ Training    │   │   (Flask)   │
│ Extraction  │   │ Pipeline    │   │             │
└─────────────┘   └─────────────┘   └─────────────┘
    `
  },
  {
    id: "modern-blog",
    name: "ModernBlog",
    description: "Built a full-stack blogging platform with 98% test coverage and optimized page load speed by 60%. Implemented a secure authentication system supporting three OAuth providers, leading to a 40% increase in user sign-ups.",
    technologies: ["React", "Supabase", "TypeScript", "Tailwind CSS", "OAuth"],
    githubUrl: "https://github.com/bhavvzs/ModernBlog",
    features: [
      "98% test coverage with comprehensive testing",
      "Page load speed optimized by 60%",
      "Secure authentication with 3 OAuth providers",
      "40% increase in user sign-ups",
      "Mobile-responsive design with Tailwind CSS",
      "35% boost in mobile engagement",
      "25% reduction in bounce rates",
      "Real-time blog editing and publishing",
      "SEO optimized content management"
    ],
    architecture: `
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   React     │──►│  Supabase   │──►│   OAuth     │
│  Frontend   │   │  Backend    │   │ Providers   │
└─────────────┘   └─────────────┘   └─────────────┘
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Tailwind UI │   │ Real-time   │   │ Content     │
│ Components  │   │ Database    │   │ Management  │
└─────────────┘   └─────────────┘   └─────────────┘
    `
  },
  {
    id: "ascii-portfolio",
    name: "ASCII Portfolio Terminal",
    description: "Current interactive ASCII terminal portfolio showcasing projects through command-line interface with AI integration, games, and real-time features.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Gemini AI", "Monaco Editor", "Framer Motion"],
    githubUrl: "https://github.com/bhavvzs/ascii-portfolio",
    features: [
      "Interactive terminal with 20+ commands",
      "AI-powered chat assistant",
      "Real-time code editor with Monaco",
      "Interactive games (Snake, Tetris, Memory)",
      "Advanced ASCII art generation",
      "Sound integration and effects",
      "Achievement system",
      "Mobile responsive design",
      "Multiple terminal themes"
    ],
    architecture: `
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Terminal  │──►│   AI Chat   │──►│ Code Editor │
│ Interface   │   │  (Gemini)   │   │  (Monaco)   │
└─────────────┘   └─────────────┘   └─────────────┘
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Games &   │   │ ASCII Art & │   │ Sound &     │
│ Achievements│   │ Animations  │   │ Effects     │
└─────────────┘   └─────────────┘   └─────────────┘
    `
  }
];

export const experience: Experience[] = [
  {
    company: "Internshala",
    position: "Internshala Student Partner",
    duration: "Jan 2025 - Mar 2025",
    description: [
      "Promoted Internshala's internship and training programs among college students, helping them explore career opportunities and upskill through various courses",
      "Organized and led interactive sessions, webinars, and workshops in collaboration with faculty members to introduce students to Internshala's platform and internship opportunities",
      "Provided mentorship and guidance to students regarding resume building, internship applications, and skill enhancement",
      "Successfully engaged with 200+ students through various outreach activities and programs"
    ],
    technologies: ["Communication", "Leadership", "Event Management", "Mentoring"]
  },
  {
    company: "CMR College of Engineering & Technology",
    position: "HackFest 2025 Volunteer",
    duration: "Mar 2025",
    description: [
      "Provided technical mentorship to 50+ participants across 15 teams during the 36-hour hackathon event",
      "Assisted teams with problem-solving and debugging while coordinating event logistics, including participant registration, workshop setup, and judging processes",
      "Collaborated with a team of 10 volunteers to ensure smooth operations and a positive participant experience",
      "Facilitated knowledge sharing sessions and helped teams overcome technical challenges"
    ],
    technologies: ["Technical Mentoring", "Event Coordination", "Team Leadership", "Problem Solving"]
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