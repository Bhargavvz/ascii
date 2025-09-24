'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import GeminiService from '@/services/gemini';
import { getThemeColors, getButtonClass } from '@/utils/theme';

interface CodeEditorProps {
  isVisible: boolean;
  onToggle: () => void;
  theme: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ isVisible, onToggle, theme }) => {
  const [code, setCode] = useState(`// Welcome to the AI-powered Code Editor!
// Try these commands:
// - Ctrl+G: Generate code with AI
// - Ctrl+I: Improve existing code
// - Ctrl+E: Explain code
// - Ctrl+R: Run code (if JavaScript)

function greetPortfolioVisitor(name) {
  console.log(\`Welcome to Bhavana's portfolio, \${name}!\`);
  console.log('Explore the terminal to learn more!');
}

greetPortfolioVisitor('Developer');`);
  
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editorError, setEditorError] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<any>(null);

  const themeColors = getThemeColors(theme);
  const monacoTheme = theme === 'matrix' ? 'vs-dark' : theme === 'amber' ? 'vs-dark' : 'vs-dark';

  const handleEditorDidMount = (editor: any) => {
    try {
      editorRef.current = editor;
      setEditorReady(true);
      setEditorError(false);
      
      // Add custom keyboard shortcuts
      editor.addCommand(editor.KeyMod.CtrlCmd | editor.KeyCode.KeyG, () => {
        generateCodeWithAI();
      });
      
      editor.addCommand(editor.KeyMod.CtrlCmd | editor.KeyCode.KeyI, () => {
        improveCodeWithAI();
      });
      
      editor.addCommand(editor.KeyMod.CtrlCmd | editor.KeyCode.KeyE, () => {
        explainCode();
      });
      
      editor.addCommand(editor.KeyMod.CtrlCmd | editor.KeyCode.KeyR, () => {
        runCode();
      });
      
      setOutput('Code editor loaded successfully! Try Ctrl+G to generate code.');
    } catch (error) {
      console.error('Editor setup failed:', error);
      setEditorError(true);
      setOutput('Editor setup failed. Using fallback text editor.');
    }
  };

  const generateCodeWithAI = async () => {
    const prompt = window.prompt('What code would you like me to generate?');
    if (!prompt) return;

    setIsLoading(true);
    setOutput('Generating code...');
    
    try {
      const generatedCode = await GeminiService.generateCode(prompt, language);
      if (generatedCode && !generatedCode.includes('service not available')) {
        setCode(generatedCode);
        setOutput(`Code generated successfully for: "${prompt}"`);
      } else {
        setOutput('AI service is not available. Please check your API configuration.');
      }
    } catch (error) {
      console.error('Code generation error:', error);
      setOutput(`Failed to generate code: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const improveCodeWithAI = async () => {
    const improvement = window.prompt('How would you like to improve the code?');
    if (!improvement) return;

    setIsLoading(true);
    try {
      const improvedCode = await GeminiService.improveCode(code, improvement);
      setCode(improvedCode);
      setOutput('Code improved successfully!');
    } catch (error) {
      setOutput('Failed to improve code');
    } finally {
      setIsLoading(false);
    }
  };

  const explainCode = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    try {
      const explanation = await GeminiService.chatWithAI(
        `Explain this ${language} code: ${code}`,
        'code explanation'
      );
      setOutput(explanation);
    } catch (error) {
      setOutput('Failed to explain code');
    } finally {
      setIsLoading(false);
    }
  };

  const testAPI = async () => {
    setIsLoading(true);
    setOutput('Testing AI API connection...');
    
    try {
      const result = await GeminiService.testConnection();
      if (result.success) {
        setOutput('✅ AI API is working! You can now use AI features.');
      } else {
        setOutput(`❌ AI API test failed: ${result.message}\n\nPlease check your API key configuration in the environment variables.`);
      }
    } catch (error) {
      setOutput(`❌ API test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const runCode = () => {
    if (language !== 'javascript') {
      setOutput('Code execution only supported for JavaScript');
      return;
    }

    try {
      // Create a safe execution environment
      const originalLog = console.log;
      let capturedOutput = '';
      
      console.log = (...args) => {
        capturedOutput += args.join(' ') + '\n';
      };

      // Execute the code
      eval(code);
      
      // Restore console.log
      console.log = originalLog;
      
      setOutput(capturedOutput || 'Code executed successfully (no output)');
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const codeTemplates = {
    javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
    
    python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
    
    typescript: `// TypeScript Example
interface User {
  name: string;
  age: number;
}

function greetUser(user: User): string {
  return \`Hello \${user.name}, age \${user.age}!\`;
}

const user: User = { name: 'Alex', age: 28 };
console.log(greetUser(user));`,
    
    html: `<!-- HTML Example -->
<!DOCTYPE html>
<html>
<head>
    <title>Portfolio Demo</title>
</head>
<body>
    <h1>Welcome to Bhavana's Portfolio</h1>
    <p>Interactive terminal experience!</p>
</body>
</html>`
  };

  const loadTemplate = (lang: string) => {
    setLanguage(lang);
    setCode(codeTemplates[lang as keyof typeof codeTemplates] || '// Start coding...');
    setOutput('');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-2 sm:inset-4 z-50 flex flex-col"
    >
      <div className={`border-2 ${themeColors.border} ${themeColors.bg} rounded-lg overflow-hidden shadow-2xl h-full flex flex-col`}>
        {/* Header */}
        <div className={`px-3 sm:px-4 py-2 border-b ${themeColors.border} flex flex-col sm:flex-row items-start sm:items-center justify-between ${themeColors.text} gap-2 sm:gap-4`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="font-bold">AI Code Editor</span>
            <select
              value={language}
              onChange={(e) => loadTemplate(e.target.value)}
              className={`${themeColors.bg} ${themeColors.text} border ${themeColors.border} rounded px-2 py-1 text-sm`}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
            </select>
            {isLoading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={generateCodeWithAI}
              disabled={isLoading}
              className={`${getButtonClass(theme, 'primary')} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Generate code with AI (Ctrl+G)"
            >
              {isLoading ? 'Generating...' : 'Generate (Ctrl+G)'}
            </button>
            <button
              onClick={improveCodeWithAI}
              disabled={isLoading}
              className={`${getButtonClass(theme, 'primary')} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Improve existing code (Ctrl+I)"
            >
              Improve (Ctrl+I)
            </button>
            <button
              onClick={explainCode}
              disabled={isLoading || !code.trim()}
              className={`${getButtonClass(theme, 'secondary')} ${(isLoading || !code.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Explain current code (Ctrl+E)"
            >
              Explain (Ctrl+E)
            </button>
            <button
              onClick={testAPI}
              disabled={isLoading}
              className={`${getButtonClass(theme, 'secondary')} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Test AI API connection"
            >
              Test AI
            </button>
            <button
              onClick={runCode}
              disabled={language !== 'javascript' || !code.trim()}
              className={`${getButtonClass(theme, 'secondary')} ${(language !== 'javascript' || !code.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={language !== 'javascript' ? 'Only JavaScript can be executed' : 'Run JavaScript code (Ctrl+R)'}
            >
              Run (Ctrl+R)
            </button>
            <button
              onClick={onToggle}
              className={getButtonClass(theme, 'close')}
              title="Close code editor"
            >
              ×
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex">
          <div className="flex-1">
            {!editorError ? (
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                theme={monacoTheme}
                loading={
                  <div className={`p-4 text-center ${themeColors.text}`}>
                    <div className="mb-2">Loading Monaco Editor...</div>
                    <div className="text-xs opacity-75">If this takes too long, we'll switch to fallback editor</div>
                  </div>
                }
                onValidate={(markers) => {
                  if (markers.some(marker => marker.severity === 8)) {
                    console.warn('Monaco Editor validation issues:', markers);
                  }
                }}
                beforeMount={() => {
                  // Set a timeout to switch to fallback if Monaco takes too long
                  setTimeout(() => {
                    if (!editorReady) {
                      setEditorError(true);
                      setOutput('Monaco Editor took too long to load. Using fallback editor.');
                    }
                  }, 10000); // 10 second timeout
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  automaticLayout: true,
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  quickSuggestions: true,
                  suggestOnTriggerCharacters: true,
                  contextmenu: true,
                  scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible'
                  }
                }}
              />
            ) : (
              <div className="h-full flex flex-col">
                <div className={`p-2 text-xs ${themeColors.text} opacity-75 border-b ${themeColors.border}`}>
                  Using fallback text editor (Monaco Editor unavailable)
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`flex-1 p-4 font-mono text-sm ${themeColors.bg} ${themeColors.text} resize-none border-none outline-none`}
                  placeholder="// Fallback text editor - AI features still available"
                  spellCheck={false}
                />
              </div>
            )}
          </div>
          
          {/* Output Panel */}
          <div className={`w-full lg:w-80 border-t lg:border-t-0 lg:border-l ${themeColors.border} ${themeColors.text} flex flex-col min-h-0`}>
            <div className={`px-3 py-2 border-b ${themeColors.border} text-sm font-bold`}>
              Output
            </div>
            <div className="flex-1 p-3 overflow-auto">
              <pre className="text-xs whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        </div>

        {/* Shortcuts Help */}
        <div className={`px-4 py-2 border-t ${themeColors.border} text-xs ${themeColors.text} opacity-75`}>
          Shortcuts: Ctrl+G (Generate) | Ctrl+I (Improve) | Ctrl+E (Explain) | Ctrl+R (Run JS)
        </div>
      </div>
    </motion.div>
  );
};

export default CodeEditor;