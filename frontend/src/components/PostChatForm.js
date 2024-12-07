import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import axios from 'axios';

function PostChatForm() {
    // Initialize hooks for navigation and session management
    const navigate = useNavigate();
    const { sessionData } = useSession();

    // State management for form data and UI states
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);
    const [selectedButtons, setSelectedButtons] = useState({});

    // Define required fields for form validation
    const requiredFields = [
        'compelling_arguments',
        'deep_thinking',
        'opinion_change',
        'philosophical_perspective',
        'new_learning',
        'different_sides',
        'well_reasoned'
    ];

    // Prevent direct access to form without valid session
    useEffect(() => {
        if (!sessionData?.userId || !sessionData?.conversationId) {
            navigate('/');
        }
    }, [sessionData, navigate]);

    // Handle changes to form inputs
    const handleInputChange = (questionId, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [questionId]: value
        }));
        // Clear validation errors when user makes changes
        console.log('Form data updated:', formData);
        setValidationError(null);
        // Update the selected button state
        setSelectedButtons((prevButtons) => ({
            ...prevButtons,
            [questionId]: value
        }));
    };

    // Validate form before submission
    const validateForm = () => {
        const missingFields = requiredFields.filter((field) => !formData[field]);
        if (missingFields.length > 0) {
            setValidationError('Please rate all questions before submitting');
            return false;
        }
        return true;
    };

    // Handle form submission
    // In PostChatForm.js

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Log submission attempt
            console.log('Attempting form submission:', {
                userId: sessionData.userId,
                conversationId: sessionData.conversationId,
                responseCount: Object.keys(formData).length,
                timestamp: new Date().toISOString()
            });

            // Add timeout to axios request
            const response = await axios.post(
                'http://localhost:3001/api/post-chat-responses',
                {
                    userId: sessionData.userId,
                    conversationId: sessionData.conversationId,
                    responses: formData
                },
                {
                    timeout: 5000, // 5 second timeout
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Server response:', response.data);

            if (response.data.success) {
                navigate('/');
            } else {
                setError('Unexpected response from server. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            if (error.code === 'ECONNABORTED') {
                setError('Request timed out. Please try again.');
            } else if (!error.response) {
                setError('Could not connect to server. Please check if the server is running on http://localhost:3001');
            } else {
                setError(error.response.data.error || 'An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reusable rating scale component
    const RatingScale = ({ questionId, label }) => {
        const selectedButton = selectedButtons[questionId];
    
        const handleButtonClick = (value) => {
            setSelectedButtons((prevButtons) => ({
                ...prevButtons,
                [questionId]: value, // Update the state for this question
            }));
            handleInputChange(questionId, value); // Update form data
            console.log(`Clicked value for ${questionId}:`, value); // Log the clicked value
        };
    
        return (
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                </label>
                <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => handleButtonClick(value)}
                            className={`w-full py-2 px-4 rounded transition-colors duration-200 ${
                                selectedButton === value
                                    ? 'bg-black text-white' // Selected button styling
                                    : 'bg-gray-200 hover:bg-gray-300' // Default styling
                            }`}
                        >
                            {value}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Strongly Disagree</span>
                    <span>Strongly Agree</span>
                </div>
            </div>
        );
    };
    

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Post-Chat Survey</h2>
            <p className="mb-6 text-gray-600">
                Please help us understand your chat experience by answering the following questions.
            </p>

            {/* Display error messages if any */}
            {(error || validationError) && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error || validationError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Chat Experience Section */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Reflection on Chat Experience</h3>

                    <RatingScale
                        questionId="compelling_arguments"
                        label="The chatbot presented compelling arguments"
                    />

                    <RatingScale
                        questionId="deep_thinking"
                        label="The conversation made me think deeply about my beliefs"
                    />

                    <RatingScale
                        questionId="opinion_change"
                        label="I found myself questioning some of my previous opinions"
                    />

                    <RatingScale
                        questionId="philosophical_perspective"
                        label="The philosophical perspective presented was convincing"
                    />
                </section>

                {/* Learning Experience Section */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Your Learning Experience</h3>

                    <RatingScale
                        questionId="new_learning"
                        label="I learned new things about the ethical implications of technology"
                    />

                    <RatingScale
                        questionId="different_sides"
                        label="The conversation helped me see different sides of the issues"
                    />

                    <RatingScale
                        questionId="well_reasoned"
                        label="I felt the chatbot's responses were well-reasoned"
                    />
                </section>

                {/* Open Feedback Section */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Open Feedback</h3>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            What was the most compelling argument the chatbot made?
                        </label>
                        <textarea
                            className="w-full p-2 border rounded-lg"
                            rows="3"
                            onChange={(e) => handleInputChange('compelling_argument_text', e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            How has this conversation influenced your thinking about technology's role in society?
                        </label>
                        <textarea
                            className="w-full p-2 border rounded-lg"
                            rows="3"
                            onChange={(e) => handleInputChange('influence_text', e.target.value)}
                        />
                    </div>
                </section>

                {/* Submit Button */}
                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PostChatForm;