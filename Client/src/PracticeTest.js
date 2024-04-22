import React, { useState } from 'react';

const PracticeTestSet = ({ flashcards }) => {
    const [score, setScore] = useState(0);

    const handleAnswer = (term, correctDefinition) => {
        const userDefinition = prompt(`Term: ${term}\nEnter Description:`);
        if (userDefinition && userDefinition.trim().toLowerCase() === correctDefinition.toLowerCase()) {
            setScore(score + 1);
            alert('Correct!');
        } else {
            alert(`Incorrect. The correct description is: ${correctDefinition}`);
        }
    };

    return (
        <div>
            <h1>Practice Test with Answer</h1>
            {flashcards.map((flashcard, index) => (
                <div key={index}>
                    <p><strong>Term:</strong> {flashcard.term}</p>
                    <button onClick={() => handleAnswer(flashcard.term, flashcard.definition)}>Submit Answer</button>
                    <p><strong>Definition:</strong> {flashcard.definition}</p>
                </div>
            ))}
            <h2>Score: {score}/{flashcards.length}</h2>
        </div>
    );
};

export default PracticeTestSet;
