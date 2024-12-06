// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import axios from 'axios';

const HomePage = () => {
    const navigate = useNavigate();
    const { setSessionData } = useSession();

    const startChat = async () => {
        try {
            // Make sure your backend server is running on port 3001
            const response = await axios.post('http://localhost:3001/api/sessions');
            
            // Let's add some console.logs to help debug
            console.log('Server response:', response.data);
            
            // Save the session data
            setSessionData(response.data);
            
            // Navigate to the pre-chat form
            navigate('/pre-chat-form');
        } catch (error) {
            console.error('Error creating session:', error);
            // Add user feedback for errors
            alert('Failed to start chat session. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold mb-8">Welcome to Philosophy Chat</h1>
            <button 
                onClick={startChat}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Start Chat
            </button>
        </div>
    );
};

export default HomePage;