import React, { useState } from 'react';
import axios from 'axios';

const CreateCardSet = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashCards, setFlashcards] = useState([]);

    const handleCreateSet = (event) => {
        event.preventDefault();
        setFlashcards()
        axios.post('http://localhost:9000/createSet', { title, description, flashCards })
            .then(() => alert('Set created successfully'))
            .catch((err) => alert('Error creating set'));
    };

    return (
        <form onSubmit={handleCreateSet}>
            <h1>Create Set</h1>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <br />
            <label>
                Description:
                <input
                type="textvalue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <br />
            <button type="submit" onClick={(e) => <Link to={'/ViewCardSet/${set._id'}>{set.title}</Link>}>Create Set</button>
        </form>
    );
};

export default CreateCardSet;
