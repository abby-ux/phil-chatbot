// src/components/PhilosophyChat.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import axios from 'axios';

const PhilosophyChat = () => {
    // Get navigation and session context
    const navigate = useNavigate();
    const { sessionData } = useSession();
    
    // Initialize state variables
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [topic, setTopic] = useState('autonomous_vehicles');
    const [perspective, setPerspective] = useState('mill');

    // Get conversationId from session data
    const conversationId = sessionData?.conversationId;

    // Ensure we have a valid conversationId
    useEffect(() => {
        if (!conversationId) {
            console.error('No conversation ID found in session');
            navigate('/pre-chat-form');
        }
    }, [conversationId, navigate]);

    // Handle sending a new message
    const handleSendMessage = async () => {
        if (!currentMessage.trim() || !conversationId) return;

        try {
            // Save the user's message
            await axios.post('http://localhost:3001/api/messages', {
                conversationId: conversationId,
                is_bot: false,
                message_text: currentMessage
            });

            // Add message to local state
            setMessages(prev => [...prev, {
                text: currentMessage,
                isBot: false
            }]);

            // Clear input field
            setCurrentMessage('');

            // Here you would typically also handle the chatbot's response
            // For now, we'll just add a placeholder response
            const botResponse = "This is a placeholder response from the chatbot.";
            
            // Save the bot's response
            await axios.post('http://localhost:3001/api/messages', {
                conversationId: conversationId,
                is_bot: true,
                message_text: botResponse
            });

            // Add bot response to local state
            setMessages(prev => [...prev, {
                text: botResponse,
                isBot: true
            }]);

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Handle finishing the chat
    const handleFinishChat = async () => {
        try {
            if (!conversationId) {
                console.error('No conversation ID available');
                return;
            }

            await axios.post(`http://localhost:3001/api/conversations/${conversationId}/complete`);
            navigate('/post-chat-form');
        } catch (error) {
            console.error('Error completing chat:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex gap-4 mb-6">
                <select 
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)}
                    className="p-2 border rounded"
                    disabled
                >
                    <option value="autonomous_vehicles">Autonomous Vehicles</option>
                    <option value="algorithmic_bias">Algorithmic Bias</option>
                </select>

                <select 
                    value={perspective} 
                    onChange={(e) => setPerspective(e.target.value)}
                    className="p-2 border rounded"
                    disabled
                >
                    <option value="mill">Mill/Liberalism</option>
                    <option value="luddism">Luddism</option>
                    <option value="futurism">Futurism</option>
                </select>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg min-h-[400px] mb-4">
                {messages.map((message, index) => (
                    <div 
                        key={index}
                        className={`mb-4 ${message.isBot ? 'text-blue-600' : 'text-gray-800'}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 p-2 border rounded"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
                <button
                    onClick={handleFinishChat}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Finish Chat
                </button>
            </div>
        </div>
    );
};

export default PhilosophyChat;