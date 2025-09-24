# Gemini AI Setup Guide

## Step-by-Step Instructions

### 1. Get Your API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Select "Create API key in new project" or choose an existing project
5. Copy the generated API key (it should start with `AIza` and be about 39 characters long)

### 2. Configure Your Environment
1. Open the `.env` file in your project root
2. Replace `your_actual_gemini_api_key_here` with your actual API key
3. Save the file

Example:
```
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Enable the API (if needed)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Library"
4. Search for "Generative Language API"
5. Click on it and press "Enable"

### 4. Test the Integration
1. Restart your development server: `npm run dev`
2. Open the portfolio
3. Click the "AI" button
4. Try sending a message

## Troubleshooting

### Common Issues:

**"Invalid API key"**
- Double-check your API key is correct
- Make sure there are no extra spaces
- Verify the key starts with "AIza"

**"API key does not have permission"**
- Enable the Generative Language API in Google Cloud Console
- Make sure your project has the API enabled

**"Quota exceeded"**
- You've reached the free tier limits
- Check your usage in Google Cloud Console

**"AI service not available"**
- Check the browser console for detailed error messages
- Verify your API key is properly set in the .env file
- Restart the development server after changing the .env file

### Testing Your API Key

You can test your API key using curl:

```bash
curl \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
  -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY'
```

Replace `YOUR_API_KEY` with your actual API key.

## Support

If you're still having issues:
1. Check the browser console for error messages
2. Verify your API key is active in Google AI Studio
3. Make sure you've restarted the development server after updating .env