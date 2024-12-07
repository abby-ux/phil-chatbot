// src/components/PreChatForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import axios from 'axios';

const PreChatForm = () => {
    // Use hooks for navigation and accessing session data
    const navigate = useNavigate();
    // Get both sessionData and setSessionData from our context
    const { sessionData, setSessionData } = useSession();
    // const [formData, setFormData] = useState({});
    
    // Create state to store form responses
    const [formData, setFormData] = useState({
        technology_opinion: '',
        openness_rating: ''
    });

    // Handle changes to form inputs
    const handleInputChange = (questionId, value) => {
        setFormData(prevData => ({
            ...prevData,
            [questionId]: value
        }));
        // Log the updated form data to help with debugging
        console.log('Form data updated:', formData);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Save form responses
            await axios.post('http://localhost:3001/api/pre-chat-responses', {
                userId: sessionData.userId,
                responses: formData
            });

            // Create a new conversation
            const conversationResponse = await axios.post('http://localhost:3001/api/conversations', {
                userId: sessionData.userId,
                philosophical_perspective: 'mill', // Or get this from form
                topic: 'autonomous_vehicles' // Or get this from form
            });

            // Update session with conversation ID
            setSessionData(prev => ({
                ...prev,
                conversationId: conversationResponse.data.conversationId
            }));

            navigate('/chat');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Pre-Chat Survey</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Question 1 - Technology Opinion */}
                <div className="space-y-2">
                    <label className="block text-gray-700 font-semibold">
                        Autonomous vehicles will make roads safer than human drivers
                    </label>
                    <select 
                        value={formData.technology_opinion}
                        onChange={(e) => handleInputChange('technology_opinion', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                        <option value="">Select your answer</option>
                        <option value="1">Strongly Disagree</option>
                        <option value="2">Disagree</option>
                        <option value="3">Neutral</option>
                        <option value="4">Agree</option>
                        <option value="5">Strongly Agree</option>
                    </select>
                </div>

                {/* Question 2 - Openness Rating */}
                <div className="space-y-2">
                    <label className="block text-gray-700 font-semibold">
                        I consider myself open-minded about new ideas
                    </label>
                    <select 
                        value={formData.openness_rating}
                        onChange={(e) => handleInputChange('openness_rating', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                        <option value="">Select your answer</option>
                        <option value="1">Strongly Disagree</option>
                        <option value="2">Disagree</option>
                        <option value="3">Neutral</option>
                        <option value="4">Agree</option>
                        <option value="5">Strongly Agree</option>
                    </select>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Start Chat
                </button>
            </form>
        </div>
    );
};

export default PreChatForm;