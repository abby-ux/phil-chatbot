import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import axios from 'axios';
import { philosophicalResponses } from '../responses';
import StarterQuestions from '../opening-questions/opening-questions';

const PhilosophyChat = () => {
    const navigate = useNavigate();
    const { sessionData } = useSession();
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [topic, setTopic] = useState('autonomous_vehicles');
    const [perspective, setPerspective] = useState('mill');
    const [hasStarted, setHasStarted] = useState(false);
    const conversationId = sessionData?.conversationId;

    const handleBotResponse = useCallback(async (responseText) => {
        try {
            await axios.post('http://localhost:3001/api/messages', {
                conversationId,
                is_bot: true,
                message_text: responseText
            });

            setMessages(prev => [...prev, {
                text: responseText,
                isBot: true
            }]);
        } catch (error) {
            console.error('Error sending bot response:', error);
        }
    }, [conversationId]);

    useEffect(() => {
        if (!conversationId) {
            navigate('/pre-chat-form');
            return;
        }
    }, [conversationId, navigate]);

    const findBestResponse = (userInput) => {
        const responses = philosophicalResponses[perspective].topics[topic].responses;
        const input = userInput.toLowerCase();
        
        let bestMatch = null;
        let maxMatches = 0;

        responses.forEach(response => {
            const matches = response.triggers.filter(trigger => input.includes(trigger)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                bestMatch = response;
            }
        });

        if (!bestMatch) {
            const randomIndex = Math.floor(Math.random() * responses.length);
            bestMatch = responses[randomIndex];
        }

        return bestMatch;
    };

    const handleStarterQuestionSelect = async (question) => {
        if (hasStarted) return;
        
        try {
            await axios.post('http://localhost:3001/api/messages', {
                conversationId,
                is_bot: false,
                message_text: question
            });

            setMessages([{
                text: question,
                isBot: false
            }]);

            setHasStarted(true);

            const response = findBestResponse(question);
            
            setTimeout(() => {
                handleBotResponse(response.message);
                
                if (response.followup) {
                    setTimeout(() => {
                        handleBotResponse(response.followup);
                    }, 1000);
                }
            }, 500);

        } catch (error) {
            console.error('Error sending starter question:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!currentMessage.trim() || !conversationId) return;

        try {
            await axios.post('http://localhost:3001/api/messages', {
                conversationId,
                is_bot: false,
                message_text: currentMessage
            });

            setMessages(prev => [...prev, {
                text: currentMessage,
                isBot: false
            }]);

            setCurrentMessage('');

            const response = findBestResponse(currentMessage);
            
            setTimeout(() => {
                handleBotResponse(response.message);
                
                if (response.followup) {
                    setTimeout(() => {
                        handleBotResponse(response.followup);
                    }, 1000);
                }
            }, 500);

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

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
                    disabled={hasStarted}
                >
                    <option value="autonomous_vehicles">Autonomous Vehicles</option>
                    <option value="algorithmic_bias">Algorithmic Bias</option>
                </select>

                <select 
                    value={perspective} 
                    onChange={(e) => setPerspective(e.target.value)}
                    className="p-2 border rounded"
                    disabled={hasStarted}
                >
                    <option value="mill">Mill/Liberalism</option>
                    <option value="luddism">Luddism</option>
                    <option value="futurism">Futurism</option>
                </select>
            </div>

            {!hasStarted && (
                <StarterQuestions 
                    onQuestionSelect={handleStarterQuestionSelect}
                    topic={topic}
                />
            )}

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