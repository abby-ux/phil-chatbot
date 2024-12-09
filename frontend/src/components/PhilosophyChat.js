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
    const [usedResponses, setUsedResponses] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const conversationId = sessionData?.conversationId;
    // const availableResponses = philosophicalResponses[perspective].topics[topic].responses;;

    const getValidResponses = useCallback(() => {
        return philosophicalResponses[perspective].topics[topic].responses
            .filter(response => !usedResponses.has(JSON.stringify(response)));
    }, [perspective, topic, usedResponses]);

    const handleBotResponse = useCallback(async (responseText) => {
        try {
            // Show loading message
            setMessages(prev => [...prev, {
                text: "That's definitely a point worth considering. Thinking of a response...",
                isBot: true,
                isLoading: true
            }]);
            
            // Wait 5 seconds
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Remove loading message
            setMessages(prev => prev.filter(msg => !msg.isLoading));
    
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
        const validResponses = getValidResponses();
        const input = userInput.toLowerCase();
        
        let bestMatch = null;
        let maxMatches = 0;

        validResponses.forEach(response => {
            const matches = response.triggers.filter(trigger => 
                input.includes(trigger)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                bestMatch = response;
            }
        });

        if (!bestMatch && validResponses.length > 0) {
            const randomIndex = Math.floor(Math.random() * validResponses.length);
            bestMatch = validResponses[randomIndex];
        }

        // If no valid responses left, reset the used responses
        if (!bestMatch) {
            setUsedResponses(new Set());
            return findBestResponse(userInput);
        }

        // Mark the response as used
        setUsedResponses(prev => new Set([...prev, JSON.stringify(bestMatch)]));
        
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
    
        } catch (error) {
            console.error('Error sending starter question:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!currentMessage.trim() || !conversationId || isLoading) return;
    
        try {
            setIsLoading(true);
    
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
            
            await handleBotResponse(response.message);
            
            if (response.followup) {
                await handleBotResponse(response.followup);
            }
    
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
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
        <div className="chat-container">
            <div className="dropdown-container">
                <select 
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)}
                    className="dropdown"
                    disabled={hasStarted}
                >
                    <option value="autonomous_vehicles">Autonomous Vehicles</option>
                    <option value="algorithmic_bias">Algorithmic Bias</option>
                </select>

                <select 
                    value={perspective} 
                    onChange={(e) => setPerspective(e.target.value)}
                    className="dropdown"
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

            <div className="messages-container">
                {messages.map((message, index) => (
                    <div 
                        key={index}
                        className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
                        style={{ marginBottom: '2rem', fontSize: '1.5rem' }}
                    >
                        {message.text}
                    </div>
                ))}
            </div>

            <div className="input-container">
            <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                className="chat-input"
                style={{
                    minHeight: '300px',
                    padding: '1.5rem',
                    fontSize: '1.5rem',
                    width: '100%'
                }}
                placeholder="Type your message..."
                disabled={isLoading}
            />
                <div className="button-container">
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className={`chat-button send-button ${isLoading ? 'disabled' : ''}`}
                    >
                        Send
                    </button>
                    <button
                        onClick={handleFinishChat}
                        disabled={isLoading}
                        className={`chat-button finish-button ${isLoading ? 'disabled' : ''}`}
                    >
                        Finish Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhilosophyChat;