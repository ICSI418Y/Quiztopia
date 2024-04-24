import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// const generateId = () => {
//     return new ObjectId().toString();
// };

function ViewSet(){
    const [set, setSet] = useState("");
    const [flashcards, setFlashcards] = useState([]);
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');
    
    const { setID } = useParams();

    useEffect(()=>{
        axios.get('http://localhost:9000/getSet', {setID: setID})
        .then((res) => {
            setSet(res.data.set);
            setFlashcards(res.data.flashcards)
        })
        .catch((err) =>{
            alert("Error getting set: " + err);
        })
    }, [])

    const handleAddCard = () => {
        axios.post('http://localhost:9000/addCard', {setID, term, definition})
        .then((res) => {
            if(res.data){
                alert("Great Success");
            }
        })
        .catch((err) => {
            alert("Error adding card: " + err);
        })

        setTerm('');
        setDefinition('');
    };


    return (
        <div className='background'>
            <h1>{set.title}</h1>
            <p>{set.description}</p>
            <h2>Cards</h2>
            <ul className='center'>
                {flashcards.map((card) => (
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
}

export default ViewSet;
