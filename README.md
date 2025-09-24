# ASCII Portfolio Terminal 🖥️

**The most advanced ASCII art portfolio ever built!** An innovative and interactive terminal-style portfolio that showcases projects through ASCII art, AI-powered features, and a fully functional command-line interface. Built with cutting-edge web technologies while maintaining the nostalgic feel of classic terminal interfaces.

![ASCII Portfolio Demo](https://via.placeholder.com/800x400/000000/00FF00?text=ASCII+PORTFOLIO+TERMINAL)

## 🚀 **MAJOR FEATURES**

### 🤖 **AI-Powered Features**
- **Real-time AI Chat Assistant** powered by Google Gemini API
- **AI Code Generation** with multiple programming languages
- **AI Code Improvement** and explanation features
- **AI ASCII Art Generation** from text descriptions
- **Smart Portfolio Suggestions** based on content analysis

### 💻 **Advanced Development Tools**
- **Real-time Code Editor** with Monaco Editor (VS Code engine)
- **Multi-language Support** (JavaScript, TypeScript, Python, HTML)
- **Live Code Execution** for JavaScript
- **Syntax Highlighting** and error detection
- **AI-assisted Programming** with Ctrl+G shortcuts

### 🎮 **Interactive Gaming Suite**
- **Snake Game** with ASCII graphics
- **ASCII Tetris** with line clearing mechanics
- **Speed Typing Game** with WPM tracking
- **Memory Game** with color sequences
- **High Score Tracking** and achievements

### 🎨 **Advanced ASCII Art Studio**
- **12+ Font Styles** for ASCII generation
- **6 Animation Types** (Typewriter, Fade, Slide, Wave, Glitch, Matrix)
- **AI-Powered Art Creation** from descriptions
- **Export Functions** (Copy to clipboard, Download as TXT)
- **Art History** with quick restore
- **Real-time Preview** with custom animations

### 🔊 **Professional Sound System**
- **10+ Sound Effects** (Keypress, Success, Error, Notifications)
- **Dynamic Audio Generation** using Web Audio API
- **Sound Sequences** (Boot sequence, Matrix rain)
- **Volume Controls** and audio toggle
- **Theme-Based Audio** integration

### 📊 **Real-time Analytics & Data**
- **Live Visitor Tracking** with location data
- **System Performance Monitoring** (CPU, Memory, Network)
- **GitHub Statistics Integration** (Stars, Forks, Commits)
- **Real-time Data Feeds** with WebSocket simulation
- **Interactive Charts** and sparkline visualizations

### 🏆 **Achievement System**
- **25+ Achievements** across 4 categories (Exploration, Interaction, Mastery, Secret)
- **4 Rarity Levels** (Common, Rare, Epic, Legendary)
- **Progress Tracking** with visual progress bars and streaks
- **Score System** with rarity-based points
- **Persistent Storage** with localStorage
- **Achievement Notifications** with animations
- **Advanced Tracking** (Time-based, usage patterns, easter eggs)

### 🎓 **Interactive Tutorial System**
- **4 Comprehensive Tutorials** (Basics, Features, Advanced, Productivity)
- **Step-by-Step Guidance** with progress tracking
- **Interactive Command Execution** from tutorials
- **Difficulty Levels** (Beginner, Intermediate, Advanced)
- **Completion Tracking** and progress persistence

### 🌈 **Enhanced Terminal Features**
- **4 Professional Themes** (Matrix, Amber, Blue, Classic)
- **File System Simulation** with full navigation
- **Command History** with arrow key navigation
- **Tab Completion** for commands
- **Keyboard Shortcuts** (Ctrl+/, Ctrl+L, etc.)
- **Responsive Design** optimized for all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ascii-portfolio.git

# Navigate to project directory
cd ascii-portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your Gemini API key to .env.local
# NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the portfolio.

### 🤖 AI Features Setup

1. **Get Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env.local` file

2. **Enable AI Features**:
   ```bash
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 🎮 Available Commands

#### **Core Navigation**
```bash
help            # Show all available commands
ls              # List directory contents
cd <path>       # Change directory
pwd             # Print working directory
cat <file>      # Display file contents
clear           # Clear terminal screen
```

#### **Portfolio Content**
```bash
projects        # Show all projects
projects <id>   # View specific project details
skills          # Display technical skills with progress bars
experience      # Show work experience timeline
contact         # Display contact information
whoami          # Show personal information
```

#### **🚀 Advanced Features**
```bash
ai/chat         # Open AI-powered assistant
code/editor     # Launch real-time code editor
games/play      # Access interactive games suite
studio          # Open ASCII art creator
sound/audio     # Control sound system
analytics       # View live portfolio analytics
achievements    # Check unlocked achievements
tutorial        # Start interactive tutorials
features        # List all new features
```

#### **🎨 Creative Commands**
```bash
ascii <text>    # Generate ASCII art
matrix          # Trigger Matrix rain effect
theme <name>    # Change visual theme
tree            # Show directory tree structure
```

## 🎨 Customization

### Adding Your Content

1. **Update Personal Information**
   ```typescript
   // src/data/portfolio.ts
   export const personalInfo: PersonalInfo = {
     name: "Your Name",
     title: "Your Title",
     bio: "Your bio...",
     // ...
   };
   ```

2. **Add Your Projects**
   ```typescript
   // src/data/portfolio.ts
   export const projects: Project[] = [
     {
       id: "your-project",
       name: "Project Name",
       description: "Project description...",
       technologies: ["Tech1", "Tech2"],
       // ...
     }
   ];
   ```

## 🔧 Technical Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **ASCII Art**: FIGlet
- **Development**: Turbopack, ESLint

## 📱 Features

- ✅ Fully responsive design
- ✅ Multiple color themes
- ✅ Interactive terminal commands
- ✅ ASCII art generation
- ✅ File system simulation
- ✅ Command history
- ✅ Tab completion
- ✅ Keyboard shortcuts
- ✅ Loading animations
- ✅ SEO optimized

## 📞 Contact

This portfolio template was created to showcase modern web development skills through a unique terminal interface. Feel free to customize it for your own use!

---

<div align="center">
  <p>Made with ❤️ and lots of ASCII art</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
