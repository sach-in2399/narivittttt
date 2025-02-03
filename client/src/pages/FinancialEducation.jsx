
import React, { useState, useRef, useEffect } from 'react';
import './FinancialEducation.css';

const FinancialEducation = () => {
  const [language, setLanguage] = useState('en');
  const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const recognitionRef = useRef(null);
  const responseRef = useRef(null); // Ref for the AI response section

  const GEMINI_API_KEY = 'AIzaSyA7wzVMQLb7Y2kbuiZrGdmNRv4j_YwNpGQ'; // Replace with your Gemini API key
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) {
      alert('Please enter a question.');
      return;
    }

    setIsLoading(true); // Start loading
    setMessage(''); // Clear previous message

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Explain in ${language}: ${userInput}`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from Gemini API');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      setMessage(aiResponse);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to get a response from the AI. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      setIsListening(false);
      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      recognition.stop();
    };

    recognitionRef.current = recognition;
  };

  // Scroll to the AI response section when the message is updated
  useEffect(() => {
    if (message) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]);

  return (
    <div className="financial-education-page">
      <div className="content">
        <h1>AI-Powered Financial Education</h1>
        <p>Learn financial concepts in your local language with AI chatbots and voice assistants.</p>

        <div className="language-selector">
          <label htmlFor="language">Select Language: </label>
          <select id="language" value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>
        </div>

        <div className="chatbot-section">
          <textarea
            placeholder="Ask a question about financial education..."
            rows="4"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          <button onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Send'}
          </button>
          <button onClick={handleVoiceCommand} disabled={isListening || isLoading}>
            {isListening ? 'Listening...' : 'Voice Command'}
          </button>
          {isLoading && <div className="loading-spinner"></div>}
          {message && (
            <div className="ai-response" ref={responseRef}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialEducation; 