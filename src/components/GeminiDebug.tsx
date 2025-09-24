'use client';

import React, { useState, useEffect } from 'react';
import GeminiService from '@/services/gemini';

interface GeminiDebugProps {
  isVisible: boolean;
  onToggle: () => void;
  theme: string;
}

const GeminiDebug: React.FC<GeminiDebugProps> = ({ isVisible, onToggle, theme }) => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<string>('');

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_actual_gemini_api_key_here') {
      setApiKeyStatus('❌ API key not configured');
    } else if (!apiKey.startsWith('AIza')) {
      setApiKeyStatus('⚠️ API key format may be incorrect');
    } else {
      setApiKeyStatus('✅ API key format looks good');
    }
  }, []);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing connection...');
    
    try {
      // Test basic connection
      const result = await (GeminiService as any).testConnection();
      setTestResult(`Connection: ${result.success ? '✅' : '❌'} ${result.message}`);
      
      if (result.success) {
        // Test actual chat functionality
        const chatResult = await GeminiService.chatWithAI('Hello, can you respond with just "API working"?');
        setTestResult(prev => prev + `\nChat test: ${chatResult}`);
      }
    } catch (error) {
      setTestResult(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 w-96 z-50 bg-black text-green-400 border border-green-500 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Gemini API Debug</h3>
        <button onClick={onToggle} className="text-xl hover:opacity-75">×</button>
      </div>
      
      <div className="space-y-4 text-sm">
        <div>
          <strong>API Key Status:</strong><br />
          {apiKeyStatus}
        </div>
        
        <div>
          <strong>Environment Check:</strong><br />
          Key starts with: {process.env.NEXT_PUBLIC_GEMINI_API_KEY?.substring(0, 5) || 'Not set'}...<br />
          Key length: {process.env.NEXT_PUBLIC_GEMINI_API_KEY?.length || 0} characters
        </div>
        
        <button
          onClick={testConnection}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Test Connection'}
        </button>
        
        {testResult && (
          <div className="mt-4 p-3 bg-gray-900 rounded text-xs whitespace-pre-wrap">
            <strong>Test Result:</strong><br />
            {testResult}
          </div>
        )}
        
        <div className="text-xs opacity-75">
          <strong>Setup Instructions:</strong><br />
          1. Get API key from Google AI Studio<br />
          2. Update .env file<br />
          3. Restart development server<br />
          4. Test connection here
        </div>
      </div>
    </div>
  );
};

export default GeminiDebug;