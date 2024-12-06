import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import axios from 'axios';

const PhilosophyChat = () => {
  const navigate = useNavigate();
  const { sessionData, setSessionData } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [perspective, setPerspective] = useState('mill');
  const [topic, setTopic] = useState('autonomous_vehicles');

  useEffect(() => {
    if (!sessionData.userId) {
      navigate('/');
    }
  }, [sessionData, navigate]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
        // First save the user's message
        await axios.post('http://localhost:3001/api/messages', {
            conversationId: sessionData.conversationId,
            is_bot: false,
            message_text: input
        });

        // Update UI with user message
        setMessages(prev => [...prev, { text: input, isUser: true }]);

        // Clear input right after showing user message
        setInput('');

        // Get chatbot response based on perspective and topic
        let botResponse = "This is a sample response. Replace with your actual chatbot logic.";
        
        // Save bot's response
        await axios.post('http://localhost:3001/api/messages', {
            conversationId: sessionData.conversationId,
            is_bot: true,
            message_text: botResponse
        });

        // Update UI with bot response
        setMessages(prev => [...prev, { text: botResponse, isUser: false }]);

    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
    }
};

  const handleFinishChat = async () => {
    try {
      await axios.post('http://localhost:3001/api/conversations/complete', {
        conversationId: sessionData.conversationId
      });
      navigate('/post-chat-form');
    } catch (error) {
      console.error('Error completing chat:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4 space-x-4">
        <select 
          value={perspective}
          onChange={(e) => setPerspective(e.target.value)}
          className="border rounded p-2"
          disabled={messages.length > 0}
        >
          <option value="mill">Mill/Liberalism</option>
          <option value="futurist">Futurism</option>
        </select>
        
        <select 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border rounded p-2"
        >
          <option value="autonomous_vehicles">Autonomous Vehicles</option>
          <option value="algorithmic_bias">Algorithmic Bias</option>
        </select>
      </div>

      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index} className={`flex mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-3 max-w-[80%] ${
              message.isUser ? 'bg-blue-500 text-white' : 'bg-white border'
            }`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg p-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>

      <button
        onClick={handleFinishChat}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Finish Chat
      </button>
    </div>
  );
};

export default PhilosophyChat;  