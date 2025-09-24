import { GoogleGenerativeAI } from '@google/generative-ai';

// You'll need to add your Gemini API key to environment variables
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (!API_KEY || API_KEY === 'demo-key' || API_KEY === 'your_actual_gemini_api_key_here') {
      console.warn('Gemini API key not configured. AI features will be limited.');
      console.warn('Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env file');
      console.warn('Get your API key from: https://aistudio.google.com/app/apikey');
      return;
    }

    // Basic API key format validation
    if (!API_KEY.startsWith('AIza') || API_KEY.length < 35) {
      console.error('Invalid Gemini API key format. Key should start with "AIza" and be about 39 characters long.');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      this.isInitialized = true;
      console.log('Gemini AI initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
    }
  }

  // Method to test API key validity
  async testConnection(): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized || !this.model) {
      return {
        success: false,
        message: 'API key not configured or invalid format'
      };
    }

    try {
      const result = await this.model.generateContent('Test');
      await result.response;
      return {
        success: true,
        message: 'API connection successful'
      };
    } catch (error: any) {
      let message = 'Connection failed';
      if (error.message?.includes('API_KEY_INVALID')) {
        message = 'Invalid API key';
      } else if (error.message?.includes('PERMISSION_DENIED')) {
        message = 'API key lacks permissions. Enable Generative Language API.';
      } else if (error.message?.includes('QUOTA_EXCEEDED')) {
        message = 'API quota exceeded';
      }
      return {
        success: false,
        message
      };
    }
  }

  async chatWithAI(message: string, context?: string): Promise<string> {
    if (!this.isInitialized || !this.model) {
      return 'AI service not available. Please check your API key configuration.';
    }

    try {
      const portfolioContext = `
        You are an AI assistant embedded in Guduru Bhavana Reddy's terminal-style portfolio.
        You have knowledge about:
        - Bhavana's projects: Mask Detection System, Hand Sign Recognition System, ModernBlog, ASCII Portfolio Terminal
        - Technical skills: Python, JavaScript, TypeScript, React, TensorFlow, OpenCV, Flask, Supabase, Tailwind CSS
        - Education: B.Tech Computer Science at CMR College of Engineering & Technology
        - You can help with technical questions, portfolio navigation, and coding discussions
        - Respond in a concise, terminal-friendly format (short lines, ASCII-style when appropriate)
        - Current context: ${context || 'general chat'}
      `;

      const prompt = `${portfolioContext}\n\nUser: ${message}\nAI:`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text() || 'Unable to generate response.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      if (error instanceof Error) {
        if (error.message.includes('API_KEY_INVALID')) {
          return 'Invalid API key. Please check your Gemini API key configuration.';
        }
        if (error.message.includes('PERMISSION_DENIED')) {
          return 'API key does not have permission. Please enable the Generative AI API.';
        }
        if (error.message.includes('QUOTA_EXCEEDED')) {
          return 'API quota exceeded. Please check your usage limits.';
        }
      }
      return 'AI service temporarily unavailable. Try again later.';
    }
  }

  async generateCode(description: string, language: string = 'javascript'): Promise<string> {
    if (!this.isInitialized || !this.model) {
      return '// AI service not available. Please check your API key configuration.';
    }

    try {
      const prompt = `Generate clean, functional ${language} code for: ${description}. 
      Include comments and follow best practices. Return only the code without explanations.`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text() || '// Unable to generate code';
    } catch (error) {
      console.error('Code generation error:', error);
      return '// Code generation failed. Please check API configuration.';
    }
  }

  async improveCode(code: string, improvement: string): Promise<string> {
    try {
      const prompt = `Improve this code: ${improvement}
      
      Original code:
      ${code}
      
      Return only the improved code with comments explaining changes:`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text() || code;
    } catch (error) {
      console.error('Code improvement error:', error);
      return code;
    }
  }

  async generateASCIIArt(description: string): Promise<string> {
    try {
      const prompt = `Create simple ASCII art for: ${description}. 
      Use only standard ASCII characters. Keep it under 10 lines and 50 characters wide.
      Return only the ASCII art without explanations.`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text() || 'Unable to generate ASCII art';
    } catch (error) {
      console.error('ASCII art generation error:', error);
      return 'ASCII art generation failed';
    }
  }

  async explainTechnology(tech: string): Promise<string> {
    try {
      const prompt = `Explain ${tech} in 2-3 short sentences suitable for a developer portfolio. 
      Focus on practical benefits and use cases. Keep it concise and terminal-friendly.`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text() || 'No explanation available.';
    } catch (error) {
      console.error('Tech explanation error:', error);
      return 'Explanation service unavailable.';
    }
  }

  async generatePortfolioSuggestions(currentContent: any): Promise<string[]> {
    try {
      const prompt = `Based on this portfolio content, suggest 3 improvements or additions:
      ${JSON.stringify(currentContent, null, 2)}
      
      Return suggestions as a simple bullet-point list.`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text() || '';
      return text.split('\n').filter((line: string) => line.trim().startsWith('•') || line.trim().startsWith('-'));
    } catch (error) {
      console.error('Portfolio suggestions error:', error);
      return ['Unable to generate suggestions'];
    }
  }
}

export default new GeminiService();