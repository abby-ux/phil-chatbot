// src/components/PostChatForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import axios from 'axios';

function PostChatForm() {
  const navigate = useNavigate();
  const { sessionData } = useSession();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Prevent direct access to the form without a valid session
  useEffect(() => {
    if (!sessionData.userId || !sessionData.conversationId) {
      navigate('/');
    }
  }, [sessionData, navigate]);

  // Handle form field changes
  const handleInputChange = (questionId, value) => {
    setFormData(prevData => ({
      ...prevData,
      [questionId]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send form responses to the server
      await axios.post('http://localhost:3001/api/post-chat-responses', {
        userId: sessionData.userId,
        conversationId: sessionData.conversationId,
        responses: formData
      });

      // Redirect to home page after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error submitting post-chat form:', error);
      setError('Failed to submit responses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rating scale component for consistency across questions
  const RatingScale = ({ questionId, label }) => {
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
              onClick={() => handleInputChange(questionId, value)}
              className={`w-full py-2 px-4 rounded ${
                formData[questionId] === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
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

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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