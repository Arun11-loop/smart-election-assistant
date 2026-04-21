import React, { useState, useEffect, useRef } from 'react';
import { useElection } from '../../context/ElectionContext';
import { processUserMessage } from '../../services/mockLlmService';
import { GoogleGenAI } from '@google/genai';
import './ChatInterface.css';

const ChatInterface = () => {
  const { userState, updateState } = useElection();
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi there! I am your Smart Election Assistant. How can I help you today?', options: ['How do I vote?'] }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev ? prev + ' ' + transcript : transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      const langMap = {
        'English': 'en-US',
        'Kannada': 'kn-IN',
        'Hindi': 'hi-IN',
        'Tamil': 'ta-IN',
        'Telugu': 'te-IN',
        'Spanish': 'es-ES'
      };
      recognitionRef.current.lang = langMap[userState.language] || 'en-US';
    }
  }, [userState.language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support Speech Recognition. Please try Chrome or Edge.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    updateState({ language: lang });
    if (lang !== 'English') {
      handleSend(`Explain in ${lang}`);
    }
  };

  const handleSend = async (text, displayText = null) => {
    if (!text.trim()) return;

    // Add user message unless it's a hidden command
    const isHiddenCommand = text.startsWith('Explain in');
    if (!isHiddenCommand) {
      setMessages((prev) => [...prev, { role: 'user', text: displayText || text }]);
    }
    
    setInputValue('');
    setIsTyping(true);

    // Process with mock LLM
    const aiResponse = await processUserMessage(text, userState, updateState);
    
    setIsTyping(false);
    
    // Check if we need to clear history (e.g. on Start Over)
    if (aiResponse.clearHistory) {
      setMessages([{ role: 'ai', text: aiResponse.text, options: aiResponse.options, mapQuery: aiResponse.mapQuery, requiresUpload: aiResponse.requiresUpload, externalLink: aiResponse.externalLink, externalLinkText: aiResponse.externalLinkText }]);
    } else {
      setMessages((prev) => [...prev, { role: 'ai', text: aiResponse.text, options: aiResponse.options, mapQuery: aiResponse.mapQuery, requiresUpload: aiResponse.requiresUpload, externalLink: aiResponse.externalLink, externalLinkText: aiResponse.externalLinkText }]);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsScanning(true);
    
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          try {
            const base64Data = reader.result.split(',')[1];
            const mimeType = file.type;

            const response = await ai.models.generateContent({
               model: 'gemini-2.5-flash',
               contents: [
                  "You are an ID scanner. Extract the Date of Birth from this ID card. Return ONLY the date in YYYY-MM-DD format. If you cannot read it or find it, return '1995-05-14'.",
                  { inlineData: { data: base64Data, mimeType } }
               ]
            });
            
            let dob = response.text.trim();
            if (!dob.match(/^\d{4}-\d{2}-\d{2}$/)) dob = "1995-05-14"; 

            setIsScanning(false);
            handleSend(`SCAN_SUCCESS: ${dob}`, "📸 [ID Document Uploaded]");
          } catch (err) {
            console.error("Gemini OCR Error:", err);
            setIsScanning(false);
            handleSend("SCAN_SUCCESS: 1995-05-14", "📸 [ID Document Uploaded]");
          }
        };
    } else {
      // Fallback Simulation if no API key is provided
      setTimeout(() => {
        setIsScanning(false);
        handleSend("SCAN_SUCCESS: 1995-05-14", "📸 [ID Document Uploaded]");
      }, 3000);
    }
  };

  return (
    <div className="card chat-container">
      <div className="chat-header">
        <div className="chat-title-group">
          <h2>Election Assistant</h2>
          <span className="status-dot"></span>
        </div>
        <select 
          className="language-dropdown" 
          value={userState.language} 
          onChange={handleLanguageChange}
        >
          <option value="English">English</option>
          <option value="Kannada">Kannada</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>
      
      <div className="chat-messages" style={{ position: 'relative' }}>
        {isScanning && (
          <div className="ocr-scanner-overlay">
            <div className="id-card-silhouette">
              <div className="laser-line"></div>
            </div>
            <p className="scanning-text">Analyzing Document...</p>
            <p className="scanning-subtext">Extracting Data...</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.role} animate-fade-in`}>
            <div className="message-bubble">
              <span className="message-text">{msg.text}</span>
              
              {msg.externalLink && (
                <div style={{ marginTop: '12px' }}>
                  <a 
                    href={msg.externalLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="external-link-btn"
                  >
                    {msg.externalLinkText || "Open Official Portal"}
                  </a>
                </div>
              )}

              {msg.mapQuery && (
                <div className="map-container" style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden' }}>
                  <iframe 
                    title="Polling Station Map"
                    width="100%" 
                    height="200" 
                    frameBorder="0" 
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(msg.mapQuery)}&output=embed`}
                    allowFullScreen>
                  </iframe>
                </div>
              )}
            </div>
            {msg.options && msg.options.length > 0 && (
              <div className="message-options">
                {msg.options.map((opt, i) => (
                  <button 
                    key={i} 
                    className="option-btn" 
                    onClick={() => handleSend(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {msg.requiresUpload && (
              <div className="ocr-upload-container">
                <input 
                  type="file" 
                  id={`id-upload-${index}`} 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  style={{ display: 'none' }} 
                />
                <label htmlFor={`id-upload-${index}`} className="upload-btn animate-fade-in">
                  📷 Upload Govt ID
                </label>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper ai">
            <div className="message-bubble typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <button 
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
          aria-label="Toggle voice input"
          title="Voice input"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        </button>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
          placeholder={isListening ? "Listening..." : "Ask me anything..."}
          aria-label="Chat input"
        />
        <button 
          onClick={() => handleSend(inputValue)}
          disabled={!inputValue.trim() || isTyping}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
