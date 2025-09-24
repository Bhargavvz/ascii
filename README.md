# ASCII Portfolio Terminal 🖥️

An innovative and interactive terminal-style portfolio that showcases projects through ASCII art and a fully functional command-line interface. Built with modern web technologies while maintaining the nostalgic feel of classic terminal interfaces.

![ASCII Portfolio Demo](https://via.placeholder.com/800x400/000000/00FF00?text=ASCII+PORTFOLIO+TERMINAL)

## ✨ Features

### 🎨 ASCII Art & Terminal Interface
- **Real-time ASCII art generation** using FIGlet with multiple font styles
- **Interactive terminal emulator** with 20+ working commands
- **File system simulation** with navigable directories
- **Multiple color themes** (Matrix, Amber, Blue, Classic)
- **Command history** and tab completion
- **Typewriter animations** and smooth transitions

### 🚀 Modern Web Technologies
- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Responsive design** optimized for all devices
- **SEO optimized** with proper metadata

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ascii-portfolio.git

# Navigate to project directory
cd ascii-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Commands in Terminal
```bash
# Navigation
ls              # List directory contents
cd <path>       # Change directory
pwd             # Print working directory
cat <file>      # Display file contents

# Portfolio
projects        # Show all projects
projects <id>   # View specific project details
skills          # Display technical skills
experience      # Show work experience
contact         # Display contact information
whoami          # Show personal information

# Utilities
help            # Show all commands
clear           # Clear terminal screen
theme <name>    # Change color theme (matrix/amber/blue/classic)
ascii <text>    # Generate ASCII art
matrix          # Easter egg - Matrix effect
tree            # Show directory structure
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
