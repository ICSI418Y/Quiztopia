import React, { useState } from 'react';

const PracticeTestSet = ({ flashcards }) => {
    const [score, setScore] = useState(0);

    const handleAnswer = (term, correctDefinition) => {
        const userDefinition = prompt(`Term: ${term}\nEnter Description:`);
        if (userDefinition && userDefinition.trim().toLowerCase() === correctDefinition.toLowerCase()) {
            setScore(score + 1);
        }
    };

    return (
        <div>
            <h1>Practice Test</h1>
            {flashcards.map((flashcard, index) => (
                <div key={index}>
                    <p><strong>Term:</strong> {flashcard.term}</p>
                    <button onClick={() => handleAnswer(flashcard.term, flashcard.definition)}>Submit Answer</button>
                </div>
            ))}
            <h2>Score: {score}/{flashcards.length}</h2>
        </div>
    );
};

export default PracticeTestSet;
