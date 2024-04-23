import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

// const generateId = () => {
//     return new ObjectId().toString();
// };

const ViewSet = ({ sets, setSets }) => {
    const { setId } = useParams();
    const set = sets.find((set) => set._id === parseInt(setId));
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');

    const addCardToSet = (setId, term, definition) => {
        const setIndex = sets.findIndex((set) => set._id === setId);
        if (setIndex !== -1) {
            const newCard = { term, definition, profficiency: 0 };
            sets[setIndex].flashcards.push(newCard);
            setSets([...sets]);
        }
    };

    const handleAddCard = () => {
        addCardToSet(setId, term, definition);
        setTerm('');
        setDefinition('');
    };


    return (
        <div className='background'>
            <h1>{set.title}</h1>
            <p>{set.description}</p>
            <h2>Cards</h2>
            <ul className='center'>
                {set.flashcards.map((card) => (
                    <li key={card._id}>
                        <strong>Term:</strong> {card.term}, <strong>Definition:</strong> {card.definition}
                    </li>
                ))}
            </ul>
            <h2>Add Card</h2>
            <label>
                Term:
                <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
            </label>
            <label>
                Definition:
                <input type="text" value={definition} onChange={(e) => setDefinition(e.target.value)} />
            </label>
            <button className='loginButtonSpacing' onClick={handleAddCard}>Add Card</button>
            <br />
            <button className='loginButtonSpacing' onClick={(e) => <Link to ="/ReviewSet"></Link>}>Review Set</button>
        </div>
    );
};

export default ViewSet;
