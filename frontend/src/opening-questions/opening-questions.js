import React from 'react';

const StarterQuestions = ({ onQuestionSelect, topic }) => {
    const questions = {
        autonomous_vehicles: [
            "What ethical principles should guide autonomous vehicle decision-making?",
            "Should autonomous vehicles prioritize passenger safety over pedestrian safety?",
            "How should responsibility and blame be assigned in autonomous vehicle accidents?",
            "What level of safety should be required before deploying autonomous vehicles?",
            "How should autonomous vehicles handle unavoidable accident scenarios?"
        ],
        algorithmic_bias: [
            "How can we ensure fairness in algorithmic decision-making systems?",
            "Should algorithms be used to make important decisions about people's lives?",
            "What responsibility do developers have in preventing algorithmic bias?",
            "How should we balance efficiency with fairness in algorithmic systems?",
            "Should algorithmic decision-making systems be transparent to those affected?"
        ]
    };

    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Select a Starting Question:</h3>
            <div className="space-y-2">
                {questions[topic].map((question, index) => (
                    <button
                        key={index}
                        onClick={() => onQuestionSelect(question)}
                        className="w-full p-3 text-left rounded border hover:bg-gray-50 transition-colors duration-200"
                    >
                        {question}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StarterQuestions;